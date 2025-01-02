"use strict";

var _require = require("@react-email/components"),
  Text = _require.Text;
var styles = {
  "footer": "Footer-module__footer___1mwhR",
  "text": "Footer-module__text___3Jm-J"
};
var React = require('react');
function Footer() {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement(Text, {
    className: styles.text
  }, "\xA9 ", new Date().getFullYear(), " | Obra Social Provincia | Todos los derechos reservados"));
}
module.exports.Footer = Footer;