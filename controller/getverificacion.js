const {dbConfig} = require("../config/bd");

async function marcarNotificacionesComoProcesadas(ids) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request().query(`
            UPDATE notificaciones
            SET status = 'Enviado'
            WHERE id IN (${ids.join(",")})
        `);
        console.log("Notificaciones marcadas como enviadas:", ids);
    } catch (err) {
        console.error("Error al marcar notificaciones:", err);
    }
}
module.exports = { marcarNotificacionesComoProcesadas};