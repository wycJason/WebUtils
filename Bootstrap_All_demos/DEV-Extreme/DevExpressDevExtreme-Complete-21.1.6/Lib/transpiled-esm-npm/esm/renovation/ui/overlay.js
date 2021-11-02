import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["rootElementRef"],
    _excluded2 = ["_checkParentVisibility", "_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "animation", "aria", "children", "className", "classes", "closeOnOutsideClick", "closeOnTargetScroll", "container", "contentTemplate", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "position", "propagateOutsideClick", "rootElementRef", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { WidgetProps } from "./common/widget";
import LegacyOverlay from "../../ui/overlay/ui.overlay";
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
    "componentType": LegacyOverlay,
    "componentProps": componentProps
  }, restAttributes)));
};
export var OverlayProps = _extends({}, WidgetProps, {
  integrationOptions: {},
  templatesRenderAsynchronously: false,
  shading: true,
  closeOnOutsideClick: false,
  closeOnTargetScroll: false,
  animation: {
    type: "pop",
    duration: 300,
    to: {
      opacity: 0,
      scale: 0.55
    },
    from: {
      opacity: 1,
      scale: 1
    }
  },
  visible: false,
  propagateOutsideClick: true,
  _checkParentVisibility: false,
  rtlEnabled: false,
  contentTemplate: "content",
  maxWidth: null
});
export class Overlay extends BaseInfernoComponent {
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
Overlay.defaultProps = _extends({}, OverlayProps);