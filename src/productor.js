const amqp = require("amqplib");
const { backOff } = require("./lib/backoff");
const {getNotificacionesPendientes, updateNotificationStatus} = require("./controller/getNotificaciones.js");
const { rabbitSettings, exchangeName, routingKeys } = require("./config/bd");
 
class MessageProducer {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.isConnected = false;
        this.pendingMessages = new Set();
    }

    async configurarExchangeYColas(canal) {
        await canal.assertExchange(exchangeName, "direct");
        for (const key of Object.values(routingKeys)) {
            await canal.assertQueue(key);
            await canal.bindQueue(key, exchangeName, key);
        }
    }

    async connect() {
        try {
            if (!this.connection) {
                this.connection = await amqp.connect(rabbitSettings);
                console.log("¡Conexión exitosa!");

                this.connection.on("error", (err) => {
                    console.error("[PRODUCER] Conexión error:", err);
                    this.isConnected = false;
                });

                this.connection.on("close", () => {
                    console.log("[PRODUCER] Conexión cerrada");
                    this.isConnected = false;
                    // Intentar reconectar después de un delay
                    setTimeout(() => this.reconnect(), 5000);
                });
            }

            if (!this.channel) {
                this.channel = await this.connection.createChannel();
                await this.configurarExchangeYColas(this.channel);
                this.isConnected = true;

                // Reenviar mensajes pendientes después de reconectar
                if (this.pendingMessages.size > 0) {
                    console.log("[PRODUCER] Reenviando mensajes pendientes...");
                    await this.resendPendingMessages();
                }
            }
        } catch (error) {
            console.error("[PRODUCER] Error de conexión:", error);
            this.isConnected = false;
            throw error;
        }
    }

    async reconnect() {
        try {
            this.connection = null;
            this.channel = null;
            await this.connect();
        } catch (error) {
            console.error("[PRODUCER] Error en reconexión:", error);
        }
    }

    async sendMessage(routingKey, msg) {
        try {
            if (!this.isConnected) {
                await this.connect();
            }

            await this.channel.publish(
                exchangeName,
                routingKey,
                Buffer.from(JSON.stringify(msg)),
                { persistent: true }
            );

            console.log(`[PRODUCER] Mensaje enviado a ${routingKey}:`, msg);
            await updateNotificationStatus(msg.id, 'Enviado');
            this.pendingMessages.delete(JSON.stringify(msg));
        } catch (error) {
            console.error(`[PRODUCER] Error al enviar mensaje:`, error);
            this.pendingMessages.add(JSON.stringify(msg));
            throw error;
        }
    }

    async resendPendingMessages() {
        for (const msgStr of this.pendingMessages) {
            const msg = JSON.parse(msgStr);
            const routingKey = msg.receptorId
                ? routingKeys.afiliado
                : msg.receptorPrestadorId
                ? routingKeys.prestador
                : routingKeys.operador;

            try {
                await this.sendMessage(routingKey, msg);
                console.log(`[PRODUCER] Mensaje pendiente reenviado:`, msg);
            } catch (error) {
                console.error(`[PRODUCER] Error al reenviar mensaje pendiente:`, error);
            }
        }
    }

    async processNotifications() {
        try {
            const notificaciones = await getNotificacionesPendientes();
            if (!notificaciones.length) {
                console.log("No hay notificaciones pendientes.");
                return;
            }

            for (const notificacion of notificaciones) {
                const routingKey = notificacion.receptorId
                    ? routingKeys.afiliado
                    : notificacion.receptorPrestadorId
                    ? routingKeys.prestador
                    : routingKeys.operador;

                if (!routingKey) {
                    console.error("Mensaje con receptor no reconocido:", notificacion);
                    continue;
                }

                const msg = {
                    id: notificacion.id,
                    titulo: notificacion.titulo,
                    contenido: notificacion.contenido,
                    receptorId: notificacion.receptorId,
                    receptorPrestadorId: notificacion.receptorPrestadorId,
                    receptorOperadorId: notificacion.receptorOperadorId,
                    receptorName: notificacion.receptorName,
                    mail: notificacion.mail,
                };

                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() - 3);
                const scheduledTime = notificacion.scheduledAt ? new Date(notificacion.scheduledAt) : null;
                
                if (scheduledTime) {
                    const delay = scheduledTime - currentTime;
                    if (delay > 0) {
                        setTimeout(() => this.sendMessage(routingKey, msg), delay);
                        console.log(`[PRODUCER] Mensaje programado para ${scheduledTime}`);
                    } else {
                        await this.sendMessage(routingKey, msg);
                    }
                } else {
                    await this.sendMessage(routingKey, msg);
                }
            }
        } catch (error) {
            console.error("[PRODUCER] Error procesando notificaciones:", error);
            throw error;
        }
    }
}

const producer = new MessageProducer();

// Implementación de BackOff con la nueva clase
const startProducerWithBackOff = backOff(
    1,
    64,
    async () => {
        await producer.connect();
        await producer.processNotifications();
    },
    () => console.log("[BACKOFF] Conexión establecida y mensajes enviados."),
    (error) => console.error("[BACKOFF] Error al conectar:", error),
    (finalError) => {
        console.error("[BACKOFF] Fallo crítico:", finalError);
        process.exit(1);
    }
);

// Revisar notificaciones periódicamente
setInterval(async () => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 3);
    console.log("[PRODUCER] Revisando notificaciones... ", currentTime);
    await producer.processNotifications();
}, 60000);

module.exports = { startProducer: startProducerWithBackOff };