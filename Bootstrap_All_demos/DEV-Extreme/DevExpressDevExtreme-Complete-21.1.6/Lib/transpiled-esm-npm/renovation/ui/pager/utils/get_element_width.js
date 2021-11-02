"use strict";

exports.getElementStyle = getElementStyle;
exports.getElementWidth = getElementWidth;
exports.getElementMinWidth = getElementMinWidth;

var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));

var _type_conversion = require("../../../utils/type_conversion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementStyle(name, element) {
  var computedStyle = (0, _get_computed_style.default)(element) || {};
  return (0, _type_conversion.toNumber)(computedStyle[name]);
}

function getElementWidth(element) {
  return getElementStyle("width", element);
}

function getElementMinWidth(element) {
  return getElementStyle("minWidth", element);
}