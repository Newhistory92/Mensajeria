const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const notificationRoutes = require('./routes/notificaciones');

const createServer = () => {
    const app = express();

    // Middleware básico
    app.use(helmet()); // Seguridad
    app.use(cors()); // CORS
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parser JSON
    app.use(express.urlencoded({ extended: true }));

    // Rutas
    app.use('/api/notificaciones', notificationRoutes);

    // Middleware de errores
    app.use(errorHandler);

    return app;
};

module.exports = createServer;