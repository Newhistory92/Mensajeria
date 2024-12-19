const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672, 
    username: 'emiliano',
    password: 'river123',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

const queue = "Afiliado";



const Mensajes =[
    {"name":"emiliano", "servicio":"Programador"},
    {"name":"emiliano", "servicio":"Programador"},
    {"name":"emiliano", "servicio":"Programador"}
]
async function connect() {
    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log("¡Conexión exitosa!");

        const canal = await conn.createChannel();
        console.log("¡Canal Creado!");

        const res = await canal.assertQueue(queue)
        console.log("¡Cola Creado!");

        for (const msg of Mensajes) {
            await canal.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            console.log("Mensaje enviado a la cola:", queue, msg);
        }


    } catch (error) {
        console.error("Error al conectar con RabbitMQ:", error);
    }
}

// Llamar la función de conexión correctamente
connect();
