const amqp = require("amqplib");
const { backOff } = require("./lib/backoff");
const {getNotificacionesPendientes, updateNotificationStatus} = require("./controller/getNotificaciones.js");
const { rabbitSettings, exchangeName, routingKeys } = require("./config/bd");
const exchangeType = "direct"; // Exchange de tipo Direct


async function configurarExchangeYColas(canal) {
    await canal.assertExchange(exchangeName, exchangeType);
    for (const key of Object.values(routingKeys)) {
        await canal.assertQueue(key);
        await canal.bindQueue(key, exchangeName, key);
    }

}
async function connect() {
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log("¡Conexión exitosa!");

        const canal = await conn.createChannel();
        await configurarExchangeYColas(canal);

        // Obtener notificaciones pendientes
        const notificaciones = await getNotificacionesPendientes();
        if (!notificaciones.length) {
            console.log("No hay notificaciones pendientes.");
            conn.close();
            return;
        }

        // Enviar mensajes
        for (const notificacion of notificaciones) {
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
                    receptorOperadorId: notificacion.receptorOperadorId,
                    receptorName: notificacion.receptorName,
                    mail: notificacion.mail,
                };

                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() - 3);
                console.log("[PRODUCER] Hora actual:", currentTime);

                const scheduledTime = new Date(notificacion.scheduledAt);
                const scheduledTimeArgentina = new Date(
                    scheduledTime.toLocaleString('en-US', {
                        timeZone: 'America/Argentina/Buenos_Aires',
                        hour12: false,
                    })
                );
                console.log("[PRODUCER] Hora programada:", scheduledTimeArgentina);

                const delay = scheduledTimeArgentina - currentTime;

                if (delay > 0) {
                    // Si la notificación está programada para el futuro, programamos su envío
                    console.log(`[PRODUCER] Mensaje programado para ${notificacion.scheduledAt}`);
                    setTimeout(async () => {
                        try {
                            await canal.publish(
                                exchangeName,
                                routingKey,
                                Buffer.from(JSON.stringify(msg)),
                                { persistent: true }
                            );
                            console.log(`[PRODUCER] Mensaje enviado a ${routingKey}:`, msg);

                            // Actualizamos el estado a "Enviado"
                            await updateNotificationStatus(notificacion.id, 'Enviado');
                        } catch (error) {
                            console.error(
                                `[PRODUCER] Error al enviar mensaje programado ${notificacion.id}:`,
                                error
                            );
                        }
                    }, delay);
                } else {
                    // Si la notificación está lista para ser enviada, la enviamos inmediatamente
                    try {
                        await canal.publish(
                            exchangeName,
                            routingKey,
                            Buffer.from(JSON.stringify(msg)),
                            { persistent: true }
                        );
                        console.log(`[PRODUCER] Mensaje enviado a ${routingKey}:`, msg);

                        // Actualizamos el estado a "Enviado"
                        await updateNotificationStatus(notificacion.id, 'Enviado');
                    } catch (error) {
                        console.error(
                            `[PRODUCER] Error al enviar mensaje inmediato ${notificacion.id}:`,
                            error
                        );
                    }
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



module.exports = { startProducer: startProducerWithBackOff };