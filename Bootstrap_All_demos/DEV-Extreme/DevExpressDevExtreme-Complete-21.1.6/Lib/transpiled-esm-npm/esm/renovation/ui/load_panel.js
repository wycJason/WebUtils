import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["rootElementRef"],
    _excluded2 = ["_checkParentVisibility", "_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "animation", "aria", "children", "className", "classes", "closeOnOutsideClick", "closeOnTargetScroll", "container", "contentTemplate", "delay", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "message", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "position", "propagateOutsideClick", "rootElementRef", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyLoadPanel from "../../ui/load_panel";
import { DomComponentWrapper } from "./common/dom_component_wrapper";
import { OverlayProps } from "./overlay";
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
    "componentType": LegacyLoadPanel,
    "componentProps": componentProps
  }, restAttributes)));
};
export var LoadPanelProps = _extends({}, OverlayProps);
export class LoadPanel extends BaseInfernoComponent {
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
LoadPanel.defaultProps = _extends({}, LoadPanelProps);