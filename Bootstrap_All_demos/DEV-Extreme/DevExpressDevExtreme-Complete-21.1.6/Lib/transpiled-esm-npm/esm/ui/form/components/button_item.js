import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
import { extend } from '../../../core/utils/extend';
var FIELD_BUTTON_ITEM_CLASS = 'dx-field-button-item';
export function renderButtonItemTo(_ref) {
  var {
    item,
    $container,
    validationGroup,
    createComponentCallback,
    cssItemClass
  } = _ref;
  $container.addClass(FIELD_BUTTON_ITEM_CLASS).css('textAlign', convertAlignmentToTextAlign(item.horizontalAlignment)).addClass(cssItemClass); // TODO: try to avoid changes in $container.parent() and adjust the created $elements only

  $container.parent().css('justifyContent', convertAlignmentToJustifyContent(item.verticalAlignment));
  var $button = $('<div>');
  $container.append($button);
  return createComponentCallback($button, 'dxButton', extend({
    validationGroup
  }, item.buttonOptions));
}

function convertAlignmentToTextAlign(horizontalAlignment) {
  return isDefined(horizontalAlignment) ? horizontalAlignment : 'right';
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