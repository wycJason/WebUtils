import { extend } from '../../core/utils/extend';
import { isDefined } from '../../core/utils/type';
import { each } from '../../core/utils/iterator';
import { captionize } from '../../core/utils/inflector';
import { inArray } from '../../core/utils/array';
import Guid from '../../core/guid';
import { SIMPLE_ITEM_TYPE } from './constants';
var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider'];
export function convertToRenderFieldItemOptions(_ref) {
  var {
    $container,
    containerCssClass,
    parentComponent,
    createComponentCallback,
    useFlexLayout,
    item,
    template,
    name,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorValue,
    canAssignUndefinedValueToEditor,
    editorValidationBoundary,
    editorStylingMode,
    showColonAfterLabel,
    managerLabelLocation,
    itemId,
    managerMarkOptions
  } = _ref;
  var isRequired = isDefined(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  var isSimpleItem = item.itemType === SIMPLE_ITEM_TYPE;
  var helpID = item.helpText ? 'dx-' + new Guid() : null;
  var helpText = item.helpText;

  var labelOptions = _convertToLabelOptions({
    item,
    id: itemId,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation: managerLabelLocation
  });

  var needRenderLabel = labelOptions.visible && labelOptions.text;
  var {
    location: labelLocation,
    labelID
  } = labelOptions;
  var labelNeedBaselineAlign = labelLocation !== 'top' && (!!item.helpText && !useFlexLayout || inArray(item.editorType, ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor']) !== -1);
  return {
    $container,
    containerCssClass,
    parentComponent,
    createComponentCallback,
    useFlexLayout,
    labelOptions,
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    item,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorOptions: _convertToEditorOptions({
      editorType: item.editorType,
      editorValue,
      defaultEditorName: item.dataField,
      canAssignUndefinedValueToEditor,
      externalEditorOptions: item.editorOptions,
      editorInputId: itemId,
      editorValidationBoundary,
      editorStylingMode
    })
  };
}
export function convertToLabelMarkOptions(_ref2, isRequired) {
  var {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref2;
  return {
    isRequiredMark: showRequiredMark && isRequired,
    requiredMark,
    isOptionalMark: showOptionalMark && !isRequired,
    optionalMark
  };
}

function _convertToEditorOptions(_ref3) {
  var {
    editorType,
    defaultEditorName,
    editorValue,
    canAssignUndefinedValueToEditor,
    externalEditorOptions,
    editorInputId,
    editorValidationBoundary,
    editorStylingMode
  } = _ref3;
  var editorOptionsWithValue = {};

  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }

  if (EDITORS_WITH_ARRAY_VALUE.indexOf(editorType) !== -1) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }

  var result = extend(true, editorOptionsWithValue, externalEditorOptions, {
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
    each(rules, function (index, rule) {
      if (rule.type === 'required') {
        hasRequiredRule = true;
        return false;
      }
    });
  }

  return hasRequiredRule;
}

function _convertToLabelOptions(_ref4) {
  var {
    item,
    id,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation
  } = _ref4;
  var labelOptions = extend({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id: id,
    visible: true,
    isRequired: isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired)
  });
  var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor']; // TODO: support "dxCalendar"

  if (inArray(item.editorType, editorsRequiringIdForLabel) !== -1) {
    labelOptions.labelID = "dx-label-".concat(new Guid());
  }

  if (!labelOptions.text && item.dataField) {
    labelOptions.text = captionize(item.dataField);
  }

  if (labelOptions.text) {
    labelOptions.text += labelOptions.showColon ? ':' : '';
  }

  return labelOptions;
}