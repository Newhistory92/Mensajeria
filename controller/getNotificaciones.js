const { dbConfig } = require("../config/bd");
const sql = require("mssql");
async function getNotificacionesPendientes() {
    try {
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .query(`
                SELECT 
                    id, 
                    titulo, 
                    contenido, 
                    receptorId, 
                    receptorPrestadorId, 
                    CASE 
                        WHEN scheduledAt IS NULL THEN NULL
                        ELSE scheduledAt
                    END as scheduledAt,
                    GETDATE() as CurrentServerTime
                FROM Notificacion
                WHERE status = 'No_leido'
                AND tipo NOT IN ('Enviado', 'Recibido')
                AND (
                    scheduledAt IS NULL
                    OR
                    CONVERT(DATE, scheduledAt) = CONVERT(DATE, GETDATE())
                )
                ORDER BY 
                    CASE 
                        WHEN scheduledAt IS NULL THEN 0 
                        ELSE 1 
                    END,
                    scheduledAt ASC;
            `);

        return result.recordset;
    } catch (err) {
        console.error("Error al obtener notificaciones:", err);
        throw err;
    }
}
async function updateNotificationStatus(id,tipo) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('tipo', sql.VarChar, tipo)
            .query(`
                UPDATE Notificacion 
                SET tipo = @tipo
                WHERE id = @id
            `);
    } catch (err) {
        console.error("Error al actualizar estado de notificación:", err);
        throw err;
    }
}


async function updateNotificationLeido(id) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query(`
                UPDATE Notificacion 
                SET status = 'Leido',
                leido = GETDATE() as CurrentServerTime
                WHERE id = @id
            `);
    } catch (err) {
        console.error("Error al actualizar estado leído de notificación:", err);
        throw err;
    }
}


module.exports = { 
    getNotificacionesPendientes,
    updateNotificationStatus,
    updateNotificationLeido
};
