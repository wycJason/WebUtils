import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["rootElementRef"],
    _excluded2 = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "invalidValueMessage", "max", "min", "mode", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "value", "valueChange", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyNumberBox from "../../ui/number_box";
import { WidgetProps } from "./common/widget";
import { DomComponentWrapper } from "./common/dom_component_wrapper";
export var viewFunction = _ref => {
  var {
    props: {
      rootElementRef
    },
    restAttributes
  } = _ref,
      componentProps = _objectWithoutPropertiesLoose(_ref.props, _excluded);

  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "rootElementRef": rootElementRef,
    "componentType": LegacyNumberBox,
    "componentProps": componentProps
  }, restAttributes)));
};
export var NumberBoxProps = _extends({}, WidgetProps, {
  focusStateEnabled: true,
  hoverStateEnabled: true,
  defaultValue: 0
});
export class NumberBox extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
  }

  get __state_value() {
    var state = this._currentState || this.state;
    return this.props.value !== undefined ? this.props.value : state.value;
  }

  set_value(value) {
    this.setState(state => {
      var _this$props$valueChan, _this$props;

      this._currentState = state;
      var newValue = value();
      (_this$props$valueChan = (_this$props = this.props).valueChange) === null || _this$props$valueChan === void 0 ? void 0 : _this$props$valueChan.call(_this$props, newValue);
      this._currentState = null;
      return {
        value: newValue
      };
    });
  }

  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
      value: this.__state_value
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded2);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.__state_value
      }),
      restAttributes: this.restAttributes
    });
  }

}
NumberBox.defaultProps = _extends({}, NumberBoxProps);