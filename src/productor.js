const amqp = require("amqplib");
const { backOff } = require("../lib/backoff");
const {getNotificacionesPendientes} = require("../controller/getNotificaciones");
const { rabbitSettings, exchangeName, routingKeys } = require("../config/bd");
const exchangeType = "direct"; // Exchange de tipo Direct

const sentNotifications = new Set();

async function configurarExchangeYColas(canal) {
    await canal.assertExchange(exchangeName, exchangeType);
    for (const key of Object.values(routingKeys)) {
        await canal.assertQueue(key);
        await canal.bindQueue(key, exchangeName, key);
    }
    console.log("Exchange y colas configurados.");
}
async function connect() {
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log("¡Conexión exitosa!");

        const canal = await conn.createChannel();
        await configurarExchangeYColas(canal);

        // Obtener notificaciones pendientes
        const notificaciones = await getNotificacionesPendientes();
        console.log(notificaciones)
        if (!notificaciones.length) {
            console.log("No hay notificaciones pendientes.");
            conn.close();
            return;
        }

        // Enviar mensajes
        for (const notificacion of notificaciones) {
            if (sentNotifications.has(notificacion.id)) {
                console.log(`[PRODUCER] La notificación ${notificacion.id} ya ha sido enviada.`);
                continue; // Si la notificación ya fue enviada, no la procesamos nuevamente
            }

            const routingKey = notificacion.receptorId
                ? routingKeys.afiliado
                : notificacion.receptorPrestadorId
                ? routingKeys.prestador
                : routingKeys.operador;

            if (routingKey) {
                const msg = {
                    id: notificacion.id,
                    titulo: notificacion.titulo,
                    contenido: notificacion.contenido,
                    receptorId: notificacion.receptorId,
                    receptorPrestadorId: notificacion.receptorPrestadorId,
                };

                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() - 3);
                console.log("[PRODUCER] Hora actual:", currentTime);
                
                const scheduledTime = new Date(notificacion.scheduledAt);
                console.log("[PRODUCER] Hora programada:", scheduledTime);
                const delay = scheduledTime - currentTime;

                if (delay > 0) {
                    // Si la notificación está programada para el futuro, programamos su envío
                    console.log(`[PRODUCER] Mensaje programado para ${notificacion.scheduledAt}`);
                    setTimeout(() => {
                        canal.publish(
                            exchangeName,
                            routingKey,
                            Buffer.from(JSON.stringify(msg)),
                            { persistent: true }
                        );
                        console.log(`[PRODUCER] Mensaje enviado a ${routingKey}:`, msg);

                        // Marcamos la notificación como enviada
                        sentNotifications.add(notificacion.id);
                    }, delay);
                } else {
                    // Si la notificación está lista para ser enviada, la enviamos inmediatamente
                    canal.publish(
                        exchangeName,
                        routingKey,
                        Buffer.from(JSON.stringify(msg)),
                        { persistent: true }
                    );
                    console.log(`[PRODUCER] Mensaje enviado a ${routingKey}:`, msg);

                    // Marcamos la notificación como enviada
                    sentNotifications.add(notificacion.id);
                }
            } else {
                console.error("Mensaje con receptor no reconocido:", notificacion);
            }
        }
    } catch (error) {
        console.error("Error durante la conexión o envío de mensajes:", error);
        throw error;
    }
}
setInterval(async () => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 3);
    console.log("[PRODUCER] Revisando notificaciones... ", currentTime);
    await connect();
}, 60000);

// Implementación de BackOff
const startProducerWithBackOff = backOff(
    1, // Tiempo inicial en segundos
    64, // Tiempo máximo en segundos
    connect,
    () => console.log("[BACKOFF] Conexión establecida y mensajes enviados."),
    (error) => console.error("[BACKOFF] Error al conectar:", error),
    (finalError) => {
        console.error("[BACKOFF] Fallo crítico:", finalError);
        process.exit(1); // Salida en caso de fallo crítico
    }
);

// Iniciar el productor con BackOff
startProducerWithBackOff();

