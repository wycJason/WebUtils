import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["rootElementRef"],
    _excluded2 = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "indicatorSrc", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyLoadIndicator from "../../ui/load_indicator";
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
    "componentType": LegacyLoadIndicator,
    "componentProps": componentProps
  }, restAttributes)));
};
export var LoadIndicatorProps = _extends({}, WidgetProps);
export class LoadIndicator extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  }

}
LoadIndicator.defaultProps = _extends({}, LoadIndicatorProps);