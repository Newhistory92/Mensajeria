const {dbConfig} = require("../config/bd");

//Esta función evalúa las notificaciones pendientes en la base de datos y 
// las organiza según el receptor y la programación (scheduledAt).

async function getNotificacionesPendientes() {
    try {
        const pool = await sql.connect(dbConfig);

        // Consultar notificaciones no leídas y programadas para envío
        const result = await pool.request().query(`
            SELECT id, titulo, contenido, receptorId, receptorPrestadorId, scheduledAt
            FROM notificaciones
            WHERE status = 'No_leido'
              AND (scheduledAt IS NULL OR scheduledAt <= GETDATE())
        `);

        return result.recordset;
    } catch (err) {
        console.error("Error al obtener notificaciones:", err);
        throw err;
    }
}
module.exports = {  getNotificacionesPendientes};