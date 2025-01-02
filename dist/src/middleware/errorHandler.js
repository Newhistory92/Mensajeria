"use strict";

var errorHandler = function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack);
  var status = err.status || 500;
  var message = err.message || 'Error interno del servidor';
  res.status(status).json({
    error: {
      message: message,
      status: status,
      timestamp: new Date().toISOString()
    }
  });
};
module.exports = errorHandler;