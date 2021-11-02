import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onContentReady", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "useInkRipple", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from "@devextreme/vdom";
import { createDefaultOptionRules, convertRulesToOptions } from "../../core/options/utils";
import devices from "../../core/devices";
import Guid from "../../core/guid";
import { InkRipple } from "./common/ink_ripple";
import { Widget } from "./common/widget";
import { isMaterial, current } from "../../ui/themes";
import { BaseWidgetProps } from "./common/base_props";
import { combineClasses } from "../utils/combine_classes";
import { ValidationMessage } from "./validation_message";

var getCssClasses = model => {
  var {
    isValid,
    readOnly,
    text,
    value
  } = model;
  var checked = value;
  var indeterminate = checked === null;
  var classesMap = {
    "dx-checkbox": true,
    "dx-state-readonly": !!readOnly,
    "dx-checkbox-checked": !!checked,
    "dx-checkbox-has-text": !!text,
    "dx-invalid": !isValid,
    "dx-checkbox-indeterminate": indeterminate
  };
  return combineClasses(classesMap);
};

var inkRippleConfig = {
  waveSizeCoefficient: 2.5,
  useHoldAnimation: false,
  wavesNumber: 2,
  isCentered: true
};
export var viewFunction = viewModel => {
  var {
    name,
    text
  } = viewModel.props;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": viewModel.target,
    "accessKey": viewModel.props.accessKey,
    "activeStateEnabled": viewModel.props.activeStateEnabled,
    "classes": viewModel.cssClasses,
    "disabled": viewModel.props.disabled,
    "focusStateEnabled": viewModel.props.focusStateEnabled,
    "height": viewModel.props.height,
    "hint": viewModel.props.hint,
    "hoverStateEnabled": viewModel.props.hoverStateEnabled,
    "onActive": viewModel.onActive,
    "onFocusIn": viewModel.onFocusIn,
    "onFocusOut": viewModel.onFocusOut,
    "aria": viewModel.aria,
    "onContentReady": viewModel.props.onContentReady,
    "onClick": viewModel.onWidgetClick,
    "onInactive": viewModel.onInactive,
    "onKeyDown": viewModel.onWidgetKeyDown,
    "rtlEnabled": viewModel.props.rtlEnabled,
    "tabIndex": viewModel.props.tabIndex,
    "visible": viewModel.props.visible,
    "width": viewModel.props.width
  }, viewModel.restAttributes, {
    children: [normalizeProps(createVNode(64, "input", null, null, 1, _extends({
      "type": "hidden",
      "value": "".concat(viewModel.props.value)
    }, name && {
      name
    }), null, viewModel.inputRef)), createVNode(1, "div", "dx-checkbox-container", [createVNode(1, "span", "dx-checkbox-icon", null, 1, null, null, viewModel.iconRef), text && createVNode(1, "span", "dx-checkbox-text", text, 0)], 0), viewModel.props.useInkRipple && createComponentVNode(2, InkRipple, {
      "config": inkRippleConfig
    }, null, viewModel.inkRippleRef), viewModel.showValidationMessage && createComponentVNode(2, ValidationMessage, {
      "validationErrors": viewModel.validationErrors,
      "mode": viewModel.props.validationMessageMode,
      "positionRequest": "below",
      "rtlEnabled": viewModel.props.rtlEnabled,
      "target": viewModel.targetCurrent,
      "boundary": viewModel.targetCurrent,
      "container": viewModel.targetCurrent
    })]
  }), null, viewModel.widgetRef));
};
export var CheckBoxProps = _extends({}, BaseWidgetProps, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  validationError: null,
  validationErrors: null,
  text: "",
  validationMessageMode: "auto",
  validationStatus: "valid",
  name: "",
  readOnly: false,
  isValid: true,
  useInkRipple: false,
  defaultValue: false,
  valueChange: () => {}
});
export var defaultOptionRules = createDefaultOptionRules([{
  device: () => devices.real().deviceType === "desktop" && !devices.isSimulator(),
  options: {
    focusStateEnabled: true
  }
}, {
  device: () => isMaterial(current()),
  options: {
    useInkRipple: false
  }
}]);
import { createRef as infernoCreateRef } from "inferno";
export class CheckBox extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.iconRef = infernoCreateRef();
    this.inkRippleRef = infernoCreateRef();
    this.inputRef = infernoCreateRef();
    this.widgetRef = infernoCreateRef();
    this.target = infernoCreateRef();
    this.state = {
      showValidationMessage: false,
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
    this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
    this.focus = this.focus.bind(this);
    this.contentReadyEffect = this.contentReadyEffect.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onInactive = this.onInactive.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.onWidgetKeyDown = this.onWidgetKeyDown.bind(this);
    this.wave = this.wave.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), new InfernoEffect(this.contentReadyEffect, [this.props.onContentReady])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.onContentReady]);
  }

  get showValidationMessage() {
    var state = this._currentState || this.state;
    return state.showValidationMessage;
  }

  set_showValidationMessage(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        showValidationMessage: newValue
      };
    });
  }

  get __state_value() {
    var state = this._currentState || this.state;
    return this.props.value !== undefined ? this.props.value : state.value;
  }

  set_value(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.valueChange(newValue);
      this._currentState = null;
      return {
        value: newValue
      };
    });
  }

  updateValidationMessageVisibility() {
    this.set_showValidationMessage(() => this.shouldShowValidationMessage);
  }

  contentReadyEffect() {
    var {
      onContentReady
    } = this.props;
    onContentReady === null || onContentReady === void 0 ? void 0 : onContentReady({});
  }

  onActive(event) {
    this.wave(event, "showWave", 1);
  }

  onInactive(event) {
    this.wave(event, "hideWave", 1);
  }

  onFocusIn(event) {
    var {
      onFocusIn
    } = this.props;
    this.wave(event, "showWave", 0);
    onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(event);
  }

  onFocusOut(event) {
    this.wave(event, "hideWave", 0);
  }

  onWidgetClick(event) {
    var {
      readOnly,
      saveValueChangeEvent
    } = this.props;

    if (!readOnly) {
      saveValueChangeEvent === null || saveValueChangeEvent === void 0 ? void 0 : saveValueChangeEvent(event);
      this.set_value(() => !this.__state_value);
    }
  }

  onWidgetKeyDown(options) {
    var {
      onKeyDown
    } = this.props;
    var {
      keyName,
      originalEvent,
      which
    } = options;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(options);

    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }

    if (keyName === "space" || which === "space") {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }

    return undefined;
  }

  get cssClasses() {
    return getCssClasses(_extends({}, this.props, {
      value: this.__state_value
    }));
  }

  get shouldShowValidationMessage() {
    var _this$validationError;

    var {
      isValid,
      validationStatus
    } = this.props;
    return !isValid && validationStatus === "invalid" && !!((_this$validationError = this.validationErrors) !== null && _this$validationError !== void 0 && _this$validationError.length);
  }

  get aria() {
    var {
      isValid,
      readOnly
    } = this.props;
    var checked = !!this.__state_value;
    var indeterminate = this.__state_value === null;
    var result = {
      role: "checkbox",
      checked: indeterminate ? "mixed" : "".concat(checked),
      readonly: readOnly ? "true" : "false",
      invalid: !isValid ? "true" : "false"
    };

    if (this.shouldShowValidationMessage) {
      result.describedby = "dx-".concat(new Guid());
    }

    return result;
  }

  get validationErrors() {
    var {
      validationError,
      validationErrors
    } = this.props;
    var allValidationErrors = validationErrors;

    if (!allValidationErrors && validationError) {
      allValidationErrors = [validationError];
    }

    return allValidationErrors;
  }

  get targetCurrent() {
    var _this$target;

    return (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.current;
  }

  wave(event, type, waveId) {
    var {
      useInkRipple
    } = this.props;
    useInkRipple && this.inkRippleRef.current[type]({
      element: this.iconRef.current,
      event,
      wave: waveId
    });
  }

  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
      value: this.__state_value
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);

    return restProps;
  }

  focus() {
    this.widgetRef.current.focus();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.__state_value
      }),
      showValidationMessage: this.showValidationMessage,
      iconRef: this.iconRef,
      inputRef: this.inputRef,
      target: this.target,
      inkRippleRef: this.inkRippleRef,
      widgetRef: this.widgetRef,
      onActive: this.onActive,
      onInactive: this.onInactive,
      onFocusIn: this.onFocusIn,
      onFocusOut: this.onFocusOut,
      onWidgetClick: this.onWidgetClick,
      onWidgetKeyDown: this.onWidgetKeyDown,
      cssClasses: this.cssClasses,
      shouldShowValidationMessage: this.shouldShowValidationMessage,
      aria: this.aria,
      validationErrors: this.validationErrors,
      targetCurrent: this.targetCurrent,
      wave: this.wave,
      restAttributes: this.restAttributes
    });
  }

}

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["value"];
  return Object.keys(defaultProps).reduce((props, propName) => {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(p => p === propName) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _extends({}, CheckBoxProps, __processTwoWayProps(convertRulesToOptions(defaultOptionRules)));
}

CheckBox.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  CheckBox.defaultProps = _extends({}, __createDefaultProps(), __processTwoWayProps(convertRulesToOptions(__defaultOptionRules)));
}