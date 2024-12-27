require('dotenv').config();
const createServer = require('./server');
const { startProducer } = require('./productor');
const { startConsumer } = require('./consumidor');

const PORT = process.env.PORT || 3005;

async function startService() {
    try {
        // Iniciar servidor HTTP
        const app = createServer();
        app.listen(PORT, () => {
            console.log(`[SERVER] Servidor iniciado en puerto ${PORT}`);
        });

        // Iniciar productor de RabbitMQ
        await startProducer();
        console.log('[PRODUCER] Productor de RabbitMQ iniciado');

        // Iniciar consumidor de RabbitMQ
        await startConsumer();
        console.log('[CONSUMER] Consumidor de RabbitMQ iniciado');

    } catch (error) {
        console.error('[SERVICE] Error al iniciar el servicio:', error);
        process.exit(1);
    }
}

// Manejo de señales de terminación
process.on('SIGTERM', () => {
    console.log('[SERVICE] Señal SIGTERM recibida. Cerrando servicio...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('[SERVICE] Señal SIGINT recibida. Cerrando servicio...');
    process.exit(0);
});

startService();

