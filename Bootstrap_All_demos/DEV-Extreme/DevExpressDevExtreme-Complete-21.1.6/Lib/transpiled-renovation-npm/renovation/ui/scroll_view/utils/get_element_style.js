"use strict";

exports.getElementStyle = getElementStyle;

var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementStyle(name, element) {
  var computedStyle = (0, _get_computed_style.default)(element) || {};
  return computedStyle[name];
}