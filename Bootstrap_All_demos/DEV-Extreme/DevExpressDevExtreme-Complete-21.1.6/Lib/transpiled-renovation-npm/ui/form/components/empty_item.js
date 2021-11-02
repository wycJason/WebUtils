"use strict";

exports.renderEmptyItemTo = renderEmptyItemTo;
exports.FIELD_EMPTY_ITEM_CLASS = void 0;
var FIELD_EMPTY_ITEM_CLASS = 'dx-field-empty-item';
exports.FIELD_EMPTY_ITEM_CLASS = FIELD_EMPTY_ITEM_CLASS;

function renderEmptyItemTo(_ref) {
  var $container = _ref.$container;
  return $container.addClass(FIELD_EMPTY_ITEM_CLASS).html('&nbsp;');
}