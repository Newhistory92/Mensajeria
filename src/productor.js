const amqp = require("amqplib");
const { backOff } = require("../lib/backoff");
const { rabbitSettings, exchangeName, routingKeys } = require("../config/bd");
const exchangeType = "direct"; // Exchange de tipo Direct

async function connect() {
    try {
        // Conexión a RabbitMQ
        const conn = await amqp.connect(rabbitSettings);
        console.log("¡Conexión exitosa!");

        // Crear un canal
        const canal = await conn.createChannel();
        console.log("¡Canal Creado!");

        // Declarar el Exchange de tipo "direct"
        await canal.assertExchange(exchangeName, exchangeType);
        console.log("¡Exchange Creado!");

        // Declarar las colas y vincularlas al Exchange con las claves de enrutamiento
        for (const key of Object.values(routingKeys)) {
            await canal.assertQueue(key);
            await canal.bindQueue(key, exchangeName, key);
            console.log(`Cola declarada y vinculada: ${key}`);
        }

        // Enviar mensajes al Exchange con la clave de enrutamiento correspondiente
        for (const msg of Mensajes) {
            let routingKey;
            if (msg.receptorId) {
                routingKey = routingKeys.afiliado;
            } else if (msg.receptorPrestadorId) {
                routingKey = routingKeys.prestador;
            } else {
                routingKey = routingKeys.operador;
            }

            if (routingKey) {
                await canal.publish(
                    exchangeName,
                    routingKey,
                    Buffer.from(JSON.stringify(msg)),
                    { persistent: true }
                );
                console.log(`Mensaje enviado a ${routingKey}:`, msg);
            } else {
                console.error("Mensaje con receptor no reconocido:", msg);
            }
        }

        // Cerrar la conexión después de enviar los mensajes
        setTimeout(() => {
            conn.close();
            console.log("Conexión cerrada.");
        }, 500);
    } catch (error) {
        console.error("Error durante la conexión o envío de mensajes:", error);
        throw error;
    }
}

// Función para publicar notificaciones
async function publicarNotificaciones(notificaciones) {
    const conn = await amqp.connect(rabbitSettings);
    const canal = await conn.createChannel();

    // Declarar Exchange y Colas
    await canal.assertExchange(exchangeName, "direct");
    for (const queue of Object.values(routingKeys)) {
        await canal.assertQueue(queue);
        await canal.bindQueue(queue, exchangeName, queue);
    }

    // Publicar cada notificación en la cola correspondiente
    for (const notificacion of notificaciones) {
        const queue =
            notificacion.receptorId ? routingKeys.afiliado :
            notificacion.receptorPrestadorId ? routingKeys.prestador :
            routingKeys.operador;

        const msg = {
            id: notificacion.id,
            titulo: notificacion.titulo,
            contenido: notificacion.contenido,
            receptorId: notificacion.receptorId,
            receptorPrestadorId: notificacion.receptorPrestadorId
        };

        await canal.publish(exchangeName, queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
        console.log(`Notificación publicada en la cola ${queue}:`, msg);
    }

    // Cerrar conexión
    setTimeout(() => conn.close(), 500);
}

// Implementación de BackOff para reconexión automática
const startProducerWithBackOff = backOff(
    1, // Tiempo inicial en segundos
    64, // Tiempo máximo en segundos
    connect, // Función principal
    () => console.log("[BACKOFF] Mensajes enviados exitosamente."),
    (error) => console.error("[BACKOFF] Error al conectar:", error),
    (finalError) => {
        console.error("[BACKOFF] Fallo crítico al conectar, no se puede continuar:", finalError);
        process.exit(1); // Salida en caso de error crítico
    }
);

// Iniciar el productor con BackOff
startProducerWithBackOff();















// const amqp = require("amqplib");
// const { backOff } = require("../lib/backoff");
// const { rabbitSettings,exchangeName,routingKeys   } = require("../config/bd");
// const exchangeType = "direct"; // Exchange de tipo Direct



// async function connect() {
//        // Conexión a RabbitMQ
//        const conn = await amqp.connect(rabbitSettings);
//        console.log("¡Conexión exitosa!");
   
//        // Crear un canal
//        const canal = await conn.createChannel();
//        console.log("¡Canal Creado!");
   
//        // Declarar el Exchange de tipo "direct"
//        await canal.assertExchange(exchangeName, exchangeType);
//        console.log("¡Exchange Creado!");
   
//        // Declarar las colas y vincularlas al Exchange con las claves de enrutamiento
//        await canal.assertQueue(routingKeys.afiliado);
//        await canal.bindQueue(routingKeys.afiliado, exchangeName, routingKeys.afiliado);
   
//        await canal.assertQueue(routingKeys.prestador);
//        await canal.bindQueue(routingKeys.prestador, exchangeName, routingKeys.prestador);
   
//        await canal.assertQueue(routingKeys.operador);
//        await canal.bindQueue(routingKeys.operador, exchangeName, routingKeys.operador);
   
//        // Enviar mensajes al Exchange con la clave de enrutamiento correspondiente
//        for (const msg of Mensajes) {
//            if (msg.servicio.includes("Afiliado")) {
//                await canal.publish(exchangeName, routingKeys.afiliado, Buffer.from(JSON.stringify(msg)), { persistent: true });
//                console.log("Mensaje enviado a Afiliado:", msg);
//            } else if (msg.servicio.includes("Prestador")) {
//                await canal.publish(exchangeName, routingKeys.prestador, Buffer.from(JSON.stringify(msg)), { persistent: true });
//                console.log("Mensaje enviado a Prestador:", msg);
//            } else if (msg.servicio.includes("Operador")) {
//                await canal.publish(exchangeName, routingKeys.operador, Buffer.from(JSON.stringify(msg)), { persistent: true });
//                console.log("Mensaje enviado a Operador:", msg);
//            }
//        }
   
//        // Cerrar la conexión después de enviar los mensajes
//        setTimeout(() => {
//            conn.close();
//            console.log("Conexión cerrada.");
//        }, 500);
//    }
   
//    // Implementación de BackOff para reconexión automática
//    const startProducerWithBackOff = backOff(
//        1, // Tiempo inicial en segundos
//        64, // Tiempo máximo en segundos
//        connect, // Función principal
//        () => console.log("[BACKOFF] Mensajes enviados exitosamente."),
//        (error) => console.error("[BACKOFF] Error al conectar:", error),
//        (finalError) => {
//            console.error("[BACKOFF] Fallo crítico al conectar, no se puede continuar:", finalError);
//            process.exit(1); // Salida en caso de error crítico
//        }
//    );
   
//    // Iniciar el productor con BackOff
//    startProducerWithBackOff();

