"use strict";

var _require = require("@react-email/components"),
  Img = _require.Img;
var styles = {
  "header": "Header-module__header___2fQ7P",
  "logo": "Header-module__logo___1zscO"
};
var React = require('react');
function Header(_ref) {
  var logoUrl = _ref.logoUrl;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(Img, {
    src: logoUrl,
    alt: "Logo",
    className: styles.logo
  }));
}
module.exports.Header = Header;