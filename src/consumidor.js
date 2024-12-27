const amqp = require("amqplib");
const { rabbitSettings, exchangeName } = require("../config/bd");
const { updateNotificationStatus } = require("../controller/getNotificaciones");
const { sendEmail } = require("./services/emailService");
const queueBindings = {
    afiliado: "afiliado",
    prestador: "prestador",
    operador: "operador"
};


// Función para consumir mensajes de una cola específica
async function consumeQueue(queueName, routingKey) {
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log(`[CONSUMER] Conectado a RabbitMQ para la cola: ${queueName}`);

        const canal = await conn.createChannel();
        console.log(`[CONSUMER] Canal creado para la cola: ${queueName}`);

        // Asegurar la cola y vincularla al Exchange
        await canal.assertExchange(exchangeName, "direct");
        await canal.assertQueue(queueName, { durable: true });
        await canal.bindQueue(queueName, exchangeName, routingKey);

        console.log(`[CONSUMER] Esperando mensajes en la cola: ${queueName}`);

        // Consumir mensajes
        canal.consume(queueName, async (message) => {
            if (message) {
                try {
                    const content = JSON.parse(message.content.toString());
                    console.log(`[CONSUMER] Mensaje recibido en ${queueName}:`, content);
                    await updateNotificationStatus(content.id, 'Recibido');
                    console.log(`[CONSUMER] Estado actualizado a 'Recibido' para notificación ${content.id}`);
                    // Procesar mensaje directamente aquí
                    let emailDestino;
                    if (queueName === "afiliado") {
                        emailDestino = `afiliado${content.receptorId}@example.com`;
                        console.log("[AFILIADO] Procesando mensaje:", content);
                        // Lógica específica para afiliados
                    } else if (queueName === "prestador") {
                        emailDestino = `prestador${content.receptorPrestadorId}@example.com`;
                        console.log("[PRESTADOR] Procesando mensaje:", content);
                        // Lógica específica para prestadores
                    } else if (queueName === "operador") {
                        emailDestino = 'operador@example.com';
                        console.log("[OPERADOR] Procesando mensaje:", content);
                        // Lógica específica para operadores
                    }
                    await sendEmail(
                        emailDestino,
                        content.titulo,
                        content.contenido
                    );
                    // Confirmar recepción del mensaje
                    canal.ack(message);
                    console.log(`[CONSUMER] Mensaje procesado y eliminado de la cola: ${queueName}`);
                } catch (error) {
                    console.error(`[CONSUMER] Error al procesar mensaje en ${queueName}:`, error);
                    canal.nack(message, false, false); // Rechazar mensaje sin reenviarlo
                }
            }
        });
    } catch (error) {
        console.error(`[CONSUMER] Error al consumir mensajes de la cola ${queueName}:`, error);
    }
}

// Función para consumir colas
async function startConsuming() {
    consumeQueue("afiliado", queueBindings.afiliado);
    consumeQueue("prestador", queueBindings.prestador);
    consumeQueue("operador", queueBindings.operador);
}

module.exports = { startConsumer: startConsuming };