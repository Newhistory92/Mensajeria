const {dbConfig} = require("../config/bd");
const sql = require("mssql");

//Esta función evalúa las notificaciones pendientes en la base de datos y 
// las organiza según el receptor y la programación (scheduledAt).

async function getNotificacionesPendientes() {
    try {
        const pool = await sql.connect(dbConfig);
        
        // Obtener fecha actual en Argentina
        const currentDate = new Date();
        
        // Configurar para zona horaria de Argentina (UTC-3)
        const argentinaTime = new Date(currentDate.toLocaleString('en-US', { 
            timeZone: 'America/Argentina/Buenos_Aires' 
        }));

        console.log('Fecha y hora actual (UTC):', currentDate.toISOString());
        console.log('Fecha y hora en Argentina:', argentinaTime.toLocaleString('es-AR', { 
            timeZone: 'America/Argentina/Buenos_Aires',
            hour12: false // Usar formato 24 horas
        }));
        
        // Consultar notificaciones no leídas y programadas para envío
        const result = await pool.request()
            .input('currentDate', sql.DateTime, argentinaTime)
            .query(`
                SELECT 
                    id, 
                    titulo, 
                    contenido, 
                    receptorId, 
                    receptorPrestadorId, 
                    scheduledAt,
                    SYSDATETIMEOFFSET() as ServerTime, -- Usar SYSDATETIMEOFFSET para ver la zona horaria
                    GETDATE() as CurrentServerTime
                FROM Notificacion
                WHERE status = 'No_leido'
                AND (
                    -- Notificaciones del día actual
                    (CONVERT(DATE, scheduledAt) = CONVERT(DATE, @currentDate))
                    OR
                    -- Notificaciones programadas para fechas futuras
                    (scheduledAt > @currentDate)
                )
            `);

        // Mostrar información de depuración
        console.log('Total de notificaciones encontradas:', result.recordset.length);
        if (result.recordset.length > 0) {
            console.log('Información de la primera notificación:', {
                id: result.recordset[0].id,
                scheduledAt: result.recordset[0].scheduledAt,
                serverTime: result.recordset[0].ServerTime,
                currentServerTime: result.recordset[0].CurrentServerTime
            });
        }

        // Mostrar todas las fechas para debugging
        result.recordset.forEach(notif => {
            console.log(`Notificación ID ${notif.id}:`, {
                scheduledAt: new Date(notif.scheduledAt).toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour12: false
                })
            });
        });

        return result.recordset;
    } catch (err) {
        console.error("Error al obtener notificaciones:", err);
        throw err;
    }
}

module.exports = {  getNotificacionesPendientes};