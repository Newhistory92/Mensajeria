"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("@react-email/components"),
  Body = _require.Body,
  Button = _require.Button,
  Container = _require.Container,
  Column = _require.Column,
  Head = _require.Head,
  Heading = _require.Heading,
  Html = _require.Html,
  Img = _require.Img,
  Preview = _require.Preview,
  Row = _require.Row,
  Section = _require.Section,
  Text = _require.Text;
function NotificationEmail(_ref) {
  var userFirstName = _ref.userFirstName,
    loginDate = _ref.loginDate,
    message = _ref.message,
    titulo = _ref.titulo;
  var formattedDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(loginDate);
  return /*#__PURE__*/React.createElement(Html, null, /*#__PURE__*/React.createElement(Head, null), /*#__PURE__*/React.createElement(Preview, null, "Notificacion de Obra Social Provincia"), /*#__PURE__*/React.createElement(Body, {
    style: main
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Section, {
    style: logo
  }, /*#__PURE__*/React.createElement(Img, {
    src: "https://i.postimg.cc/X71TTYWH/OSP.png",
    width: 350,
    height: 108,
    alt: "Logo"
  })), /*#__PURE__*/React.createElement(Section, {
    style: content
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Img, {
    style: image,
    width: 620,
    src: "https://obrasocial.sanjuan.gob.ar/_next/image?url=%2Ftexturas-osp-5_2x.webp&w=1920&q=75",
    alt: "Header"
  })), /*#__PURE__*/React.createElement(Row, {
    style: _objectSpread(_objectSpread({}, boxInfos), {}, {
      paddingBottom: "0"
    })
  }, /*#__PURE__*/React.createElement(Column, null, /*#__PURE__*/React.createElement(Heading, {
    style: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "capitalize"
    }
  }, "Hola ", userFirstName), /*#__PURE__*/React.createElement(Heading, {
    as: "h2",
    style: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center"
    }
  }, message), /*#__PURE__*/React.createElement(Text, {
    style: _objectSpread(_objectSpread({}, paragraph), {}, {
      marginTop: -5
    })
  }, /*#__PURE__*/React.createElement("b", null, "Referencia: "), titulo), /*#__PURE__*/React.createElement(Text, {
    style: _objectSpread(_objectSpread({}, paragraph), {}, {
      marginTop: -5
    })
  }, "Ingresa a nuestra web con tu cuenta de usuario y obt\xE9n m\xE1s informaci\xF3n."), /*#__PURE__*/React.createElement(Text, {
    style: paragraph
  }, /*#__PURE__*/React.createElement("b", null, "Aviso: "), formattedDate), /*#__PURE__*/React.createElement(Text, {
    style: {
      color: "rgb(0,0,0, 1)",
      fontSize: 8,
      lineHeight: 1.5
    }
  }, "ESTE MENSAJE FUE ORIGINADO DESDE UNA DIRECCI\xD3N DE CORREO ELECTR\xD3NICO QUE NO SE ENCUENTRA HABILITADA PARA RECIBIR MENSAJES. POR FAVOR NO RESPONDER AL MISMO. EL PRESENTE MAIL NO PODR\xCDA HABER SIDO ENVIADO SIN QUE UD. NOS PROPORCIONASE SU DIRECCI\xD3N DE CORREO ELECTR\xD3NICO. QUEDA BAJO SU EXCLUSIVA RESPONSABILIDAD INFORMAR A LA OBRA SOCIAL PROVINCIA DE CUALQUIER CAMBIO O MODIFICACI\xD3N QUE DICHA DIRECCI\xD3N SUFRIESE.EL TITULAR DE LOS DATOS PERSONALES TIENE LA FACULTAD DE EJERCER EL DERECHO DE ACCESO A LOS MISMOS EN FORMA GRATUITA A INTERVALOS NO INFERIORES A 6 MESES, SALVO QUE ACREDITE UN INTER\xC9S LEG\xCDTIMO AL EFECTO CONFORME LO ESTABLECIDO EN EL ART. 14 INC. 3. DE LA LEY N\xB0 25.326. LA AGENCIA DE ACCESO A LA INFORMACI\xD3N P\xDABLICA, EN SU CAR\xC1CTER DE \xD3RGANO DE CONTROL DE LA LEY N\xB0 25.326, TIENE LA ATRIBUCI\xD3N DE ATENDER LAS DENUNCIAS Y RECLAMOS QUE INTERPONGAN QUIENES RESULTEN AFECTADOS EN SUS DERECHOS POR INCUMPLIMIENTO DE LAS NORMAS VIGENTES EN MATERIA DE PROTECCI\xD3N DE DATOS PERSONALES. EL CONTENIDO DEL PRESENTE MENSAJE ES PRIVADO, CONFIDENCIAL Y EXCLUSIVO PARA SU DESTINATARIO, PUDIENDO CONTENER INFORMACI\xD3N PROTEGIDA POR NORMAS LEGALES Y DE SECRETO PROFESIONAL. BAJO NINGUNA CIRCUNSTANCIA SU CONTENIDO PUEDE SER TRANSMITIDO O RELEVADO A TERCEROS NI DIVULGADO EN FORMA ALGUNA."))), /*#__PURE__*/React.createElement(Row, {
    style: _objectSpread(_objectSpread({}, boxInfos), {}, {
      paddingTop: "0"
    })
  }, /*#__PURE__*/React.createElement(Column, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("table", {
    align: "center",
    role: "presentation",
    style: {
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Button, {
    style: button
  }, "M\xE1s informaci\xF3n"))))))), /*#__PURE__*/React.createElement(Section, {
    style: containerImageFooter
  }, /*#__PURE__*/React.createElement(Img, {
    style: image,
    width: 620,
    src: "https://react-email-demo-lpdmf0ryo-resend.vercel.app/static/yelp-footer.png",
    alt: "Footer"
  })), /*#__PURE__*/React.createElement(Text, {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "rgb(0,0,0, 0.7)"
    }
  }, "\xA9 ", new Date().getFullYear(), " | Obra Social Provincia., Agust\xEDn Gnecco 360 (S)- 5400 | San Juan, Argentina | www.obrasocial.sanjuan.gob.ar"))));
}
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
  padding: "12px 30px",
  justifyContent: "center",
  display: "inline-block"
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
module.exports = NotificationEmail;