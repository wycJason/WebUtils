"use strict";

exports.renderLabel = renderLabel;
exports.getLabelWidthByText = getLabelWidthByText;
exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _type = require("../../../core/utils/type");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: exported for tests only
var GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = GET_LABEL_WIDTH_BY_TEXT_CLASS;
var FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
exports.FIELD_ITEM_REQUIRED_MARK_CLASS = FIELD_ITEM_REQUIRED_MARK_CLASS;
var FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
exports.FIELD_ITEM_LABEL_LOCATION_CLASS = FIELD_ITEM_LABEL_LOCATION_CLASS;
var FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = FIELD_ITEM_OPTIONAL_MARK_CLASS;
var FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
exports.FIELD_ITEM_LABEL_TEXT_CLASS = FIELD_ITEM_LABEL_TEXT_CLASS;

function renderLabel(_ref) {
  var text = _ref.text,
      id = _ref.id,
      location = _ref.location,
      alignment = _ref.alignment,
      _ref$labelID = _ref.labelID,
      labelID = _ref$labelID === void 0 ? null : _ref$labelID,
      _ref$markOptions = _ref.markOptions,
      markOptions = _ref$markOptions === void 0 ? {} : _ref$markOptions;

  if (!(0, _type.isDefined)(text) || text.length <= 0) {
    return null;
  }

  return (0, _renderer.default)('<label>').addClass(_constants.FIELD_ITEM_LABEL_CLASS + ' ' + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment).append((0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS).append((0, _renderer.default)('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text), _renderLabelMark(markOptions)));
}

function _renderLabelMark(_ref2) {
  var isRequiredMark = _ref2.isRequiredMark,
      requiredMark = _ref2.requiredMark,
      isOptionalMark = _ref2.isOptionalMark,
      optionalMark = _ref2.optionalMark;

  if (!isRequiredMark && !isOptionalMark) {
    return null;
  }

  return (0, _renderer.default)('<span>').addClass(isRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(String.fromCharCode(160) + (isRequiredMark ? requiredMark : optionalMark));
}

function getLabelWidthByText(renderLabelOptions) {
  var $hiddenContainer = (0, _renderer.default)('<div>').addClass(_constants.WIDGET_CLASS).addClass(GET_LABEL_WIDTH_BY_TEXT_CLASS).appendTo('body');
  var $label = renderLabel(renderLabelOptions).appendTo($hiddenContainer);
  var labelTextElement = $label.find('.' + FIELD_ITEM_LABEL_TEXT_CLASS)[0]; // this code has slow performance

  var result = labelTextElement.offsetWidth;
  $hiddenContainer.remove();
  return result;
}