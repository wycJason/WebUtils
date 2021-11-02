import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
import { WIDGET_CLASS, FIELD_ITEM_LABEL_CONTENT_CLASS, FIELD_ITEM_LABEL_CLASS } from '../constants'; // TODO: exported for tests only

export var GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
export var FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
export var FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
export var FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
export var FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
export function renderLabel(_ref) {
  var {
    text,
    id,
    location,
    alignment,
    labelID = null,
    markOptions = {}
  } = _ref;

  if (!isDefined(text) || text.length <= 0) {
    return null;
  }

  return $('<label>').addClass(FIELD_ITEM_LABEL_CLASS + ' ' + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment).append($('<span>').addClass(FIELD_ITEM_LABEL_CONTENT_CLASS).append($('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text), _renderLabelMark(markOptions)));
}

function _renderLabelMark(_ref2) {
  var {
    isRequiredMark,
    requiredMark,
    isOptionalMark,
    optionalMark
  } = _ref2;

  if (!isRequiredMark && !isOptionalMark) {
    return null;
  }

  return $('<span>').addClass(isRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(String.fromCharCode(160) + (isRequiredMark ? requiredMark : optionalMark));
}

export function getLabelWidthByText(renderLabelOptions) {
  var $hiddenContainer = $('<div>').addClass(WIDGET_CLASS).addClass(GET_LABEL_WIDTH_BY_TEXT_CLASS).appendTo('body');
  var $label = renderLabel(renderLabelOptions).appendTo($hiddenContainer);
  var labelTextElement = $label.find('.' + FIELD_ITEM_LABEL_TEXT_CLASS)[0]; // this code has slow performance

  var result = labelTextElement.offsetWidth;
  $hiddenContainer.remove();
  return result;
}