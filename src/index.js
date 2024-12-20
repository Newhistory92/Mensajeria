const {getNotificacionesPendientes} = require("../controller/getNotificaciones");
const { marcarNotificacionesComoProcesadas} = require("../controller/getverificacion");

async function procesarNotificaciones() {
    try {
        // Obtener notificaciones pendientes
        const notificaciones = await getNotificacionesPendientes();

        if (notificaciones.length === 0) {
            console.log("No hay notificaciones pendientes.");
            return;
        }

        // Publicar en RabbitMQ
        await publicarNotificaciones(notificaciones);

        // Marcar como procesadas
        const ids = notificaciones.map(n => n.id);
        await marcarNotificacionesComoProcesadas(ids);
    } catch (err) {
        console.error("Error al procesar notificaciones:", err);
    }
}

// Ejecutar cada minuto
setInterval(procesarNotificaciones, 60000);
