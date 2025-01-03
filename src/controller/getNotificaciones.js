const { dbConfig } = require("../config/bd");
const sql = require("mssql");
async function getNotificacionesPendientes() {
    try {
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .query(`
                SELECT 
                    n.id, 
                    n.titulo, 
                    n.mail,
                    n.receptorId, 
                    n.receptorPrestadorId,
                    n.receptorOperadorId,
                    CASE 
                        WHEN n.scheduledAt IS NULL THEN NULL
                        ELSE n.scheduledAt
                    END as scheduledAt,
                    GETDATE() as CurrentServerTime,
                    -- Obtener el nombre del receptor según la tabla correspondiente
                    CASE
                        WHEN n.receptorId IS NOT NULL THEN a.name
                        WHEN n.receptorPrestadorId IS NOT NULL THEN p.name 
                        WHEN n.receptorOperadorId IS NOT NULL THEN o.name
                        ELSE NULL
                    END as receptorName
                FROM Notificacion n
                -- Left joins para obtener los nombres
                LEFT JOIN Afiliado a ON n.receptorId = a.id
                LEFT JOIN Prestador p ON n.receptorPrestadorId = p.id
                LEFT JOIN Operador o ON n.receptorOperadorId = o.id
                WHERE n.status = 'No_leido'
                AND n.tipo NOT IN ('Enviado', 'Recibido')
                AND (
                    n.scheduledAt IS NULL
                    OR
                    CONVERT(DATE, n.scheduledAt) = CONVERT(DATE, GETDATE())
                )
                ORDER BY 
                    CASE 
                        WHEN n.scheduledAt IS NULL THEN 0 
                        ELSE 1 
                    END,
                    n.scheduledAt ASC;
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
