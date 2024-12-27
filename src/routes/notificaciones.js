const express = require('express');
const router = express.Router();
const { getNotificacionesPendientes, updateNotificationStatus, updateNotificationLeido } = require('../../controller/getNotificaciones');

// Obtener todas las notificaciones pendientes
router.get('/pending', async (req, res, next) => {
    try {
        const notifications = await getNotificacionesPendientes();
        res.json(notifications);
    } catch (error) {
        next(error);
    }
});

// Actualizar estado de notificación
router.put('/:id/tipo', async (req, res, next) => {
    try {
        const { id } = req.params;
        await updateNotificationStatus(id);
        res.json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});


router.put('/:id/read', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (status !== 'Leido') {
            return res.status(400).json({ 
                error: 'El status debe ser "Leido"' 
            });
        }

        await updateNotificationLeido(id);
        res.json({ 
            message: 'Notificación marcada como leída',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

// Obtener estado del servicio
router.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;