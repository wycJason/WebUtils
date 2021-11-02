"use strict";

exports.renderButtonItemTo = renderButtonItemTo;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _type = require("../../../core/utils/type");

var _extend = require("../../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELD_BUTTON_ITEM_CLASS = 'dx-field-button-item';

function renderButtonItemTo(_ref) {
  var item = _ref.item,
      $container = _ref.$container,
      validationGroup = _ref.validationGroup,
      createComponentCallback = _ref.createComponentCallback,
      cssItemClass = _ref.cssItemClass;
  $container.addClass(FIELD_BUTTON_ITEM_CLASS).css('textAlign', convertAlignmentToTextAlign(item.horizontalAlignment)).addClass(cssItemClass); // TODO: try to avoid changes in $container.parent() and adjust the created $elements only

  $container.parent().css('justifyContent', convertAlignmentToJustifyContent(item.verticalAlignment));
  var $button = (0, _renderer.default)('<div>');
  $container.append($button);
  return createComponentCallback($button, 'dxButton', (0, _extend.extend)({
    validationGroup: validationGroup
  }, item.buttonOptions));
}

function convertAlignmentToTextAlign(horizontalAlignment) {
  return (0, _type.isDefined)(horizontalAlignment) ? horizontalAlignment : 'right';
}

function convertAlignmentToJustifyContent(verticalAlignment) {
  switch (verticalAlignment) {
    case 'center':
      return 'center';

    case 'bottom':
      return 'flex-end';

    default:
      return 'flex-start';
  }
}