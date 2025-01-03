const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const notificationRoutes = require('./routes/notificaciones');
const { previewEmail } = require('./email-previa');


const createServer = () => {
    const app = express();

    // Middleware básico
    app.use(helmet()); // Seguridad
    app.use(cors()); // CORS
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parser JSON
    app.use(express.urlencoded({ extended: true }));
    
 
    
    app.use('/static', express.static(path.join(__dirname, 'static')));
    app.use('/preview', express.static(path.join(__dirname, 'preview')));
    app.use((req, res, next) => {
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'"
        );
        next();
    });
    // Rutas
    app.use('/api/notificaciones', notificationRoutes);
    app.get('/preview-email', async (req, res) => {
        try {
            // Esperar el resultado de previewEmail
            const previewPath = await previewEmail(
                "Email de prueba", 
                "<p>Este es un contenido de prueba para verificar el diseño del email.</p>"
            );
            
            // Enviar el archivo generado
            res.sendFile(previewPath);
        } catch (error) {
            console.error('Error al generar el email preview:', error);
            res.status(500).json({ error: error.message });
        }
    });
    // Middleware de errores
    app.use(errorHandler);

    return app;
};

module.exports = createServer;