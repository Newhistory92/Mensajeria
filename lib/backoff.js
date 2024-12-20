const increaseBackOffTime = (currentBackoffTime) => Math.min(currentBackoffTime * 2, 30000); // Máximo de 30 segundos
const calculateBackOffDelayMs = (backoffTime) => Math.floor(1000 * (backoffTime + Math.random())); // Variación aleatoria

/**
 * Implementación de algoritmo BackOff
 * @param {number} minTime - Tiempo inicial de espera (en segundos).
 * @param {number} maxTime - Tiempo máximo de espera permitido (en segundos).
 * @param {Function} fn - Función a ejecutar en cada reintento.
 * @param {Function} onSuccess - Función de callback en caso de éxito.
 * @param {Function} onError - Función de callback para registrar errores.
 * @param {Function} onErrorEnd - Función de callback cuando se alcanzan los intentos máximos.
 */
const backOff = (minTime, maxTime, fn, onSuccess, onError, onErrorEnd) => {
    let currentBackoffTime = minTime;

    const attempt = async (...args) => {
        try {
            const result = await fn(...args);
            if (onSuccess) onSuccess(result);
        } catch (error) {
            if (currentBackoffTime > maxTime) {
                if (onErrorEnd) onErrorEnd(error, ...args);
                return;
            }

            if (onError) onError(error);

            const delay = calculateBackOffDelayMs(currentBackoffTime);
            console.log(`[BACKOFF] Reintento en ${delay}ms`);

            setTimeout(() => {
                currentBackoffTime = increaseBackOffTime(currentBackoffTime);
                attempt(...args);
            }, delay);
        }
    };

    return attempt;
};

module.exports = { backOff };
