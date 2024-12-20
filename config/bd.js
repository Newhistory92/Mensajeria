const sql = require("mssql");
const amqp = require("amqplib");

// Configuración de la base de datos
const dbConfig = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'tu_servidor',
    database: 'tu_base_de_datos',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

// Configuración de RabbitMQ
const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672, 
    username: 'emiliano',
    password: 'river123',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

const exchangeName = "NotificacionesExchange";
const routingKeys = {
    afiliado: "afiliado",
    prestador: "prestador",
    operador: "operador" // Preparada para futuros casos
};


module.exports = {  dbConfig,rabbitSettings ,exchangeName,routingKeys };