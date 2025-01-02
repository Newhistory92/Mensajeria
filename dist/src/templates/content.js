"use strict";

var _require = require("@react-email/components"),
  Text = _require.Text;
var styles = {
  "content": "Content-module__content___2SwkI",
  "title": "Content-module__title___3NTKt",
  "body": "Content-module__body___3CE_U",
  "date": "Content-module__date___3WB3X"
};
var React = require('react');
function Content(_ref) {
  var titulo = _ref.titulo,
    contenido = _ref.contenido,
    fecha = _ref.fecha;
  var formattedDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(fecha);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("h1", {
    className: styles.title
  }, titulo), /*#__PURE__*/React.createElement("div", {
    className: styles.body,
    dangerouslySetInnerHTML: {
      __html: contenido
    }
  }), /*#__PURE__*/React.createElement(Text, {
    className: styles.date
  }, "Fecha: ", formattedDate));
}
module.exports.Content = Content;