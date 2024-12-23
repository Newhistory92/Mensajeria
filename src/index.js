const { procesarNotificaciones } = require("./productor");
const { consumirCola } = require("./consumidor");
const { applyBackoff } = require("../lib/backoff");

// Función principal
(async function startApp() {
    try {
        console.log("Iniciando servicio de notificaciones...");

        // Inicializar productor
        setInterval(procesarNotificaciones, 60000);

        // Inicializar consumidor para cada tipo de cola
        consumirCola("afiliado");
        consumirCola("prestador");
        consumirCola("operador");

        console.log("Servicio en ejecución.");
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);

        // Aplicar backoff para reintentar si ocurre un error crítico
        applyBackoff(() => startApp());
    }
})();

