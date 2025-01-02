"use strict";

var _components = require("@react-email/components");
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var baseUrl = process.env.VERCEL_URL ? "https://".concat(process.env.VERCEL_URL) : "";
var NotificationEmail = function NotificationEmail(_ref) {
  var userFirstName = _ref.userFirstName,
    loginDate = _ref.loginDate,
    loginDevice = _ref.loginDevice,
    loginLocation = _ref.loginLocation,
    loginIp = _ref.loginIp;
  var formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(loginDate);
  return /*#__PURE__*/React.createElement(_components.Html, null, /*#__PURE__*/React.createElement(_components.Head, null), /*#__PURE__*/React.createElement(_components.Preview, null, "Yelp recent login"), /*#__PURE__*/React.createElement(_components.Body, {
    style: main
  }, /*#__PURE__*/React.createElement(_components.Container, null, /*#__PURE__*/React.createElement(_components.Section, {
    style: logo
  }, /*#__PURE__*/React.createElement(_components.Img, {
    src: "".concat(baseUrl, "/static/yelp-logo.png")
  })), /*#__PURE__*/React.createElement(_components.Section, {
    style: content
  }, /*#__PURE__*/React.createElement(_components.Row, null, /*#__PURE__*/React.createElement(_components.Img, {
    style: image,
    width: 620,
    src: "".concat(baseUrl, "/static/yelp-header.png")
  })), /*#__PURE__*/React.createElement(_components.Row, {
    style: _objectSpread(_objectSpread({}, boxInfos), {}, {
      paddingBottom: "0"
    })
  }, /*#__PURE__*/React.createElement(_components.Column, null, /*#__PURE__*/React.createElement(_components.Heading, {
    style: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center"
    }
  }, "Hola Emiliano ", userFirstName, ","), /*#__PURE__*/React.createElement(_components.Heading, {
    as: "h2",
    style: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center"
    }
  }, "Notamos un inicio de sesi\xF3n reciente en su cuenta de Obra Social Provincia.."), /*#__PURE__*/React.createElement(_components.Text, {
    style: paragraph
  }, /*#__PURE__*/React.createElement("b", null, "Tiempo: "), formattedDate), /*#__PURE__*/React.createElement(_components.Text, {
    style: _objectSpread(_objectSpread({}, paragraph), {}, {
      marginTop: -5
    })
  }, /*#__PURE__*/React.createElement("b", null, "Dispositivo: "), loginDevice), /*#__PURE__*/React.createElement(_components.Text, {
    style: _objectSpread(_objectSpread({}, paragraph), {}, {
      marginTop: -5
    })
  }, /*#__PURE__*/React.createElement("b", null, "Ubicaci\xF3n: "), loginLocation), /*#__PURE__*/React.createElement(_components.Text, {
    style: {
      color: "rgb(0,0,0, 0.5)",
      fontSize: 14,
      marginTop: -5
    }
  }, "*Ubicaci\xF3n geogr\xE1fica aproximada basada en direcci\xF3n IP:", loginIp), /*#__PURE__*/React.createElement(_components.Text, {
    style: paragraph
  }, "Si este es tu caso, no hay nada m\xE1s que hacer."), /*#__PURE__*/React.createElement(_components.Text, {
    style: _objectSpread(_objectSpread({}, paragraph), {}, {
      marginTop: -5
    })
  }, "Si no es tu caso o tienes preguntas adicionales, consulta nuestra p\xE1gina de soporte."))), /*#__PURE__*/React.createElement(_components.Row, {
    style: _objectSpread(_objectSpread({}, boxInfos), {}, {
      paddingTop: "0"
    })
  }, /*#__PURE__*/React.createElement(_components.Column, {
    style: containerButton,
    colSpan: 2
  }, /*#__PURE__*/React.createElement(_components.Button, {
    style: button
  }, "M\xE1s informaci\xF3n")))), /*#__PURE__*/React.createElement(_components.Section, {
    style: containerImageFooter
  }, /*#__PURE__*/React.createElement(_components.Img, {
    style: image,
    width: 620,
    src: "".concat(baseUrl, "/static/yelp-footer.png")
  })), /*#__PURE__*/React.createElement(_components.Text, {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "rgb(0,0,0, 0.7)"
    }
  }, "\xA9 2022 | Obra Social Provincia., Agust\xEDn Gnecco 360 (S)- 5400 | San Juan, Argentina| https://obrasocial.sanjuan.gob.ar/"))));
};
NotificationEmail.PreviewProps = {
  userFirstName: "Alan",
  loginDate: new Date("September 7, 2022, 10:58 am"),
  loginDevice: "Chrome on Mac OS X",
  loginLocation: "Upland, California, United States",
  loginIp: "47.149.53.167"
};
module.exports = NotificationEmail;
var main = {
  backgroundColor: "#fff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};
var paragraph = {
  fontSize: 16
};
var logo = {
  padding: "30px 20px"
};
var containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%"
};
var button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px"
};
var content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden"
};
var image = {
  maxWidth: "100%"
};
var boxInfos = {
  padding: "20px"
};
var containerImageFooter = {
  padding: "45px 0 0 0"
};