"use strict";

exports.convertToRenderFieldItemOptions = convertToRenderFieldItemOptions;
exports.convertToLabelMarkOptions = convertToLabelMarkOptions;

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _iterator = require("../../core/utils/iterator");

var _inflector = require("../../core/utils/inflector");

var _array = require("../../core/utils/array");

var _guid = _interopRequireDefault(require("../../core/guid"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider'];

function convertToRenderFieldItemOptions(_ref) {
  var $container = _ref.$container,
      containerCssClass = _ref.containerCssClass,
      parentComponent = _ref.parentComponent,
      createComponentCallback = _ref.createComponentCallback,
      useFlexLayout = _ref.useFlexLayout,
      item = _ref.item,
      template = _ref.template,
      name = _ref.name,
      formLabelLocation = _ref.formLabelLocation,
      requiredMessageTemplate = _ref.requiredMessageTemplate,
      validationGroup = _ref.validationGroup,
      editorValue = _ref.editorValue,
      canAssignUndefinedValueToEditor = _ref.canAssignUndefinedValueToEditor,
      editorValidationBoundary = _ref.editorValidationBoundary,
      editorStylingMode = _ref.editorStylingMode,
      showColonAfterLabel = _ref.showColonAfterLabel,
      managerLabelLocation = _ref.managerLabelLocation,
      itemId = _ref.itemId,
      managerMarkOptions = _ref.managerMarkOptions;
  var isRequired = (0, _type.isDefined)(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  var isSimpleItem = item.itemType === _constants.SIMPLE_ITEM_TYPE;
  var helpID = item.helpText ? 'dx-' + new _guid.default() : null;
  var helpText = item.helpText;

  var labelOptions = _convertToLabelOptions({
    item: item,
    id: itemId,
    isRequired: isRequired,
    managerMarkOptions: managerMarkOptions,
    showColonAfterLabel: showColonAfterLabel,
    labelLocation: managerLabelLocation
  });

  var needRenderLabel = labelOptions.visible && labelOptions.text;
  var labelLocation = labelOptions.location,
      labelID = labelOptions.labelID;
  var labelNeedBaselineAlign = labelLocation !== 'top' && (!!item.helpText && !useFlexLayout || (0, _array.inArray)(item.editorType, ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor']) !== -1);
  return {
    $container: $container,
    containerCssClass: containerCssClass,
    parentComponent: parentComponent,
    createComponentCallback: createComponentCallback,
    useFlexLayout: useFlexLayout,
    labelOptions: labelOptions,
    labelNeedBaselineAlign: labelNeedBaselineAlign,
    labelLocation: labelLocation,
    needRenderLabel: needRenderLabel,
    item: item,
    isSimpleItem: isSimpleItem,
    isRequired: isRequired,
    template: template,
    helpID: helpID,
    labelID: labelID,
    name: name,
    helpText: helpText,
    formLabelLocation: formLabelLocation,
    requiredMessageTemplate: requiredMessageTemplate,
    validationGroup: validationGroup,
    editorOptions: _convertToEditorOptions({
      editorType: item.editorType,
      editorValue: editorValue,
      defaultEditorName: item.dataField,
      canAssignUndefinedValueToEditor: canAssignUndefinedValueToEditor,
      externalEditorOptions: item.editorOptions,
      editorInputId: itemId,
      editorValidationBoundary: editorValidationBoundary,
      editorStylingMode: editorStylingMode
    })
  };
}

function convertToLabelMarkOptions(_ref2, isRequired) {
  var showRequiredMark = _ref2.showRequiredMark,
      requiredMark = _ref2.requiredMark,
      showOptionalMark = _ref2.showOptionalMark,
      optionalMark = _ref2.optionalMark;
  return {
    isRequiredMark: showRequiredMark && isRequired,
    requiredMark: requiredMark,
    isOptionalMark: showOptionalMark && !isRequired,
    optionalMark: optionalMark
  };
}

function _convertToEditorOptions(_ref3) {
  var editorType = _ref3.editorType,
      defaultEditorName = _ref3.defaultEditorName,
      editorValue = _ref3.editorValue,
      canAssignUndefinedValueToEditor = _ref3.canAssignUndefinedValueToEditor,
      externalEditorOptions = _ref3.externalEditorOptions,
      editorInputId = _ref3.editorInputId,
      editorValidationBoundary = _ref3.editorValidationBoundary,
      editorStylingMode = _ref3.editorStylingMode;
  var editorOptionsWithValue = {};

  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }

  if (EDITORS_WITH_ARRAY_VALUE.indexOf(editorType) !== -1) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }

  var result = (0, _extend.extend)(true, editorOptionsWithValue, externalEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode: editorStylingMode
  });

  if (externalEditorOptions) {
    if (result.dataSource) {
      result.dataSource = externalEditorOptions.dataSource;
    }

    if (result.items) {
      result.items = externalEditorOptions.items;
    }
  }

  if (defaultEditorName && !result.name) {
    result.name = defaultEditorName;
  }

  return result;
}

function _hasRequiredRuleInSet(rules) {
  var hasRequiredRule;

  if (rules && rules.length) {
    (0, _iterator.each)(rules, function (index, rule) {
      if (rule.type === 'required') {
        hasRequiredRule = true;
        return false;
      }
    });
  }

  return hasRequiredRule;
}

function _convertToLabelOptions(_ref4) {
  var item = _ref4.item,
      id = _ref4.id,
      isRequired = _ref4.isRequired,
      managerMarkOptions = _ref4.managerMarkOptions,
      showColonAfterLabel = _ref4.showColonAfterLabel,
      labelLocation = _ref4.labelLocation;
  var labelOptions = (0, _extend.extend)({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id: id,
    visible: true,
    isRequired: isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired)
  });
  var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor']; // TODO: support "dxCalendar"

  if ((0, _array.inArray)(item.editorType, editorsRequiringIdForLabel) !== -1) {
    labelOptions.labelID = "dx-label-".concat(new _guid.default());
  }

  if (!labelOptions.text && item.dataField) {
    labelOptions.text = (0, _inflector.captionize)(item.dataField);
  }

  if (labelOptions.text) {
    labelOptions.text += labelOptions.showColon ? ':' : '';
  }

  return labelOptions;
}