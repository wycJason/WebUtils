import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["rootElementRef"],
    _excluded2 = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "boundary", "children", "className", "classes", "container", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "name", "offset", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "positionRequest", "rootElementRef", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { WidgetProps } from "./common/widget";
import LegacyValidationMessage from "../../ui/validation_message";
import { DomComponentWrapper } from "./common/dom_component_wrapper";
export var viewFunction = _ref => {
  var {
    componentProps,
    props: {
      rootElementRef
    },
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "rootElementRef": rootElementRef,
    "componentType": LegacyValidationMessage,
    "componentProps": componentProps
  }, restAttributes)));
};
export var ValidationMessageProps = _extends({}, WidgetProps, {
  mode: "auto",
  offset: {
    h: 0,
    v: 0
  }
});
export class ValidationMessage extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get componentProps() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  get restAttributes() {
    var _this$props2 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props2, _excluded2);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  }

}
ValidationMessage.defaultProps = _extends({}, ValidationMessageProps);