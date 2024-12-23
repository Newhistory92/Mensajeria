const sql = require("mssql");
require("dotenv").config();

// Configuración de la base de datos
const dbConfig = {
    user: "prueba23",
    password:"Q1Tp2aXiMjN1*23",
    server: "10.25.1.103",
    database: "paginaobrasocial",
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };
  console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_SERVER);

  async function testConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Conexión exitosa a la base de datos");
        await pool.close();
    } catch (err) {
        console.error("Error en la conexión:", err);
    }
}

testConnection();
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