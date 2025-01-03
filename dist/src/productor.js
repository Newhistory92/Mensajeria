"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var amqp = require("amqplib");
var _require = require("./lib/backoff"),
  backOff = _require.backOff;
var _require2 = require("./controller/getNotificaciones.js"),
  getNotificacionesPendientes = _require2.getNotificacionesPendientes,
  updateNotificationStatus = _require2.updateNotificationStatus;
var _require3 = require("./config/bd"),
  rabbitSettings = _require3.rabbitSettings,
  exchangeName = _require3.exchangeName,
  routingKeys = _require3.routingKeys;
var exchangeType = "direct"; // Exchange de tipo Direct
function configurarExchangeYColas(_x) {
  return _configurarExchangeYColas.apply(this, arguments);
}
function _configurarExchangeYColas() {
  _configurarExchangeYColas = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(canal) {
    var _i, _Object$values, key;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return canal.assertExchange(exchangeName, exchangeType);
        case 2:
          _i = 0, _Object$values = Object.values(routingKeys);
        case 3:
          if (!(_i < _Object$values.length)) {
            _context2.next = 12;
            break;
          }
          key = _Object$values[_i];
          _context2.next = 7;
          return canal.assertQueue(key);
        case 7:
          _context2.next = 9;
          return canal.bindQueue(key, exchangeName, key);
        case 9:
          _i++;
          _context2.next = 3;
          break;
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _configurarExchangeYColas.apply(this, arguments);
}
function connect() {
  return _connect.apply(this, arguments);
}
function _connect() {
  _connect = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var conn, canal, notificaciones, _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return amqp.connect(rabbitSettings);
        case 3:
          conn = _context5.sent;
          console.log("¡Conexión exitosa!");
          _context5.next = 7;
          return conn.createChannel();
        case 7:
          canal = _context5.sent;
          _context5.next = 10;
          return configurarExchangeYColas(canal);
        case 10:
          _context5.next = 12;
          return getNotificacionesPendientes();
        case 12:
          notificaciones = _context5.sent;
          if (notificaciones.length) {
            _context5.next = 17;
            break;
          }
          console.log("No hay notificaciones pendientes.");
          conn.close();
          return _context5.abrupt("return");
        case 17:
          // Enviar mensajes
          _iterator = _createForOfIteratorHelper(notificaciones);
          _context5.prev = 18;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var notificacion, routingKey, msg, currentTime, scheduledTime, scheduledTimeArgentina, delay;
            return _regeneratorRuntime().wrap(function _loop$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  notificacion = _step.value;
                  routingKey = notificacion.receptorId ? routingKeys.afiliado : notificacion.receptorPrestadorId ? routingKeys.prestador : routingKeys.operador;
                  if (!routingKey) {
                    _context4.next = 29;
                    break;
                  }
                  msg = {
                    id: notificacion.id,
                    titulo: notificacion.titulo,
                    contenido: notificacion.contenido,
                    receptorId: notificacion.receptorId,
                    receptorPrestadorId: notificacion.receptorPrestadorId,
                    receptorOperadorId: notificacion.receptorOperadorId,
                    receptorName: notificacion.receptorName,
                    mail: notificacion.mail
                  };
                  currentTime = new Date();
                  currentTime.setHours(currentTime.getHours() - 3);
                  console.log("[PRODUCER] Hora actual:", currentTime);
                  scheduledTime = new Date(notificacion.scheduledAt);
                  scheduledTimeArgentina = new Date(scheduledTime.toLocaleString('en-US', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour12: false
                  }));
                  console.log("[PRODUCER] Hora programada:", scheduledTimeArgentina);
                  delay = scheduledTimeArgentina - currentTime;
                  if (!(delay > 0)) {
                    _context4.next = 16;
                    break;
                  }
                  // Si la notificación está programada para el futuro, programamos su envío
                  console.log("[PRODUCER] Mensaje programado para ".concat(notificacion.scheduledAt));
                  setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.prev = 0;
                          _context3.next = 3;
                          return canal.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(msg)), {
                            persistent: true
                          });
                        case 3:
                          console.log("[PRODUCER] Mensaje enviado a ".concat(routingKey, ":"), msg);

                          // Actualizamos el estado a "Enviado"
                          _context3.next = 6;
                          return updateNotificationStatus(notificacion.id, 'Enviado');
                        case 6:
                          _context3.next = 11;
                          break;
                        case 8:
                          _context3.prev = 8;
                          _context3.t0 = _context3["catch"](0);
                          console.error("[PRODUCER] Error al enviar mensaje programado ".concat(notificacion.id, ":"), _context3.t0);
                        case 11:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3, null, [[0, 8]]);
                  })), delay);
                  _context4.next = 27;
                  break;
                case 16:
                  _context4.prev = 16;
                  _context4.next = 19;
                  return canal.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(msg)), {
                    persistent: true
                  });
                case 19:
                  console.log("[PRODUCER] Mensaje enviado a ".concat(routingKey, ":"), msg);

                  // Actualizamos el estado a "Enviado"
                  _context4.next = 22;
                  return updateNotificationStatus(notificacion.id, 'Enviado');
                case 22:
                  _context4.next = 27;
                  break;
                case 24:
                  _context4.prev = 24;
                  _context4.t0 = _context4["catch"](16);
                  console.error("[PRODUCER] Error al enviar mensaje inmediato ".concat(notificacion.id, ":"), _context4.t0);
                case 27:
                  _context4.next = 30;
                  break;
                case 29:
                  console.error("Mensaje con receptor no reconocido:", notificacion);
                case 30:
                case "end":
                  return _context4.stop();
              }
            }, _loop, null, [[16, 24]]);
          });
          _iterator.s();
        case 21:
          if ((_step = _iterator.n()).done) {
            _context5.next = 25;
            break;
          }
          return _context5.delegateYield(_loop(), "t0", 23);
        case 23:
          _context5.next = 21;
          break;
        case 25:
          _context5.next = 30;
          break;
        case 27:
          _context5.prev = 27;
          _context5.t1 = _context5["catch"](18);
          _iterator.e(_context5.t1);
        case 30:
          _context5.prev = 30;
          _iterator.f();
          return _context5.finish(30);
        case 33:
          _context5.next = 39;
          break;
        case 35:
          _context5.prev = 35;
          _context5.t2 = _context5["catch"](0);
          console.error("Error durante la conexión o envío de mensajes:", _context5.t2);
          throw _context5.t2;
        case 39:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[0, 35], [18, 27, 30, 33]]);
  }));
  return _connect.apply(this, arguments);
}
setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var currentTime;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        currentTime = new Date();
        currentTime.setHours(currentTime.getHours() - 3);
        console.log("[PRODUCER] Revisando notificaciones... ", currentTime);
        _context.next = 5;
        return connect();
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee);
})), 60000);

// Implementación de BackOff
var startProducerWithBackOff = backOff(1,
// Tiempo inicial en segundos
64,
// Tiempo máximo en segundos
connect, function () {
  return console.log("[BACKOFF] Conexión establecida y mensajes enviados.");
}, function (error) {
  return console.error("[BACKOFF] Error al conectar:", error);
}, function (finalError) {
  console.error("[BACKOFF] Fallo crítico:", finalError);
  process.exit(1); // Salida en caso de fallo crítico
});
module.exports = {
  startProducer: startProducerWithBackOff
};