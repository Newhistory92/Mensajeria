const sql = require("mssql");


// Configuración de la base de datos
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };

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