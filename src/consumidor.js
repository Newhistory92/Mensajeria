const amqp = require("amqplib");
const { rabbitSettings, exchangeName } = require("./config/bd");
const { updateNotificationStatus } = require("./controller/getNotificaciones.js");
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
                    
                    // Actualizar estado a Recibido
                    await updateNotificationStatus(content.id, 'Recibido');
                    console.log(`[CONSUMER] Estado actualizado a 'Recibido' para notificación ${content.id}`);

                    // Procesar mensaje según el tipo de cola
                    // console.log('[CONSUMER] Preparando envío de email:', {
                    //     mail: content.mail,
                    //     titulo: content.titulo,
                    //     receptorName: content.receptorName,
                    //     contenido: content.contenido
                    // });
        
                    if (queueName === "afiliado" || queueName === "prestador" || queueName === "operador") {
                        await sendEmail(
                            content.mail,           
                            content.titulo,         
                            content.receptorName,   
                            content.contenido     
                        );
                        console.log(`[${queueName.toUpperCase()}] Email enviado exitosamente a ${content.mail}`);
                    }

                    canal.ack(message);
                    console.log(`[CONSUMER] Mensaje procesado y eliminado de la cola: ${queueName}`);
                } catch (error) {
                    console.error(`[CONSUMER] Error al procesar mensaje en ${queueName}:`, error);
                    canal.nack(message, false, false);
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