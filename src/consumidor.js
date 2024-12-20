const amqp = require("amqplib");
const { rabbitSettings, exchangeName } = require("../config/bd");

const queueBindings = {
    afiliado: "afiliado",
    prestador: "prestador",
    operador: "operador"
};


// Función para consumir mensajes de una cola específica
async function consumeQueue(queueName, routingKey, processMessage) {
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
                const content = JSON.parse(message.content.toString());
                console.log(`[CONSUMER] Mensaje recibido en ${queueName}:`, content);

                // Procesar mensaje con función personalizada
                await processMessage(content);

                // Confirmar recepción del mensaje
                canal.ack(message);
                console.log(`[CONSUMER] Mensaje procesado y eliminado de la cola: ${queueName}`);
            }
        });
    } catch (error) {
        console.error(`[CONSUMER] Error al consumir mensajes de la cola ${queueName}:`, error);
    }
}

// Función para procesar mensajes de "afiliado"
async function processAfiliadoMessage(message) {
    console.log("Procesando mensaje de Afiliado:", message);
    await marcarComoLeido(message.id);
}

// Función para procesar mensajes de "prestador"
async function processPrestadorMessage(message) {
    console.log("Procesando mensaje de Prestador:", message);
    await marcarComoLeido(message.id);
}

// Función para procesar mensajes de "operador"
async function processOperadorMessage(message) {
    console.log("Procesando mensaje de Operador:", message);
    await marcarComoLeido(message.id);
}

// Función para consumir colas y asociar los mensajes a su respectivo procesamiento
async function startConsuming() {
    // Ejecutar consumidores para las tres colas
    consumeQueue("afiliado", queueBindings.afiliado, processAfiliadoMessage);
    consumeQueue("prestador", queueBindings.prestador, processPrestadorMessage);
    consumeQueue("operador", queueBindings.operador, processOperadorMessage);
}

// Iniciar la función de consumo
startConsuming();