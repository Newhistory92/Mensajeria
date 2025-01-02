"use strict";

var styles = {
  "button": "Button-module__button___2hT6N"
};
var React = require('react');
function Button(_ref) {
  var children = _ref.children,
    href = _ref.href;
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: styles.button
  }, children);
}
module.exports.Button = Button;