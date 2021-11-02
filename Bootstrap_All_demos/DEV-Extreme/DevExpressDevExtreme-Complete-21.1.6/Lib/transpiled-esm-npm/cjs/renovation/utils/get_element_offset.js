"use strict";

exports.default = getElementOffset;

function getElementOffset(elem) {
  if (!elem) return null;
  var rect = elem.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}

module.exports = exports.default;
module.exports.default = exports.default;