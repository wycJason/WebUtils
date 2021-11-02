import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["scrollingEnabled", "useNativeScrolling"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { FormProps } from "./form_props";
import { combineClasses } from "../../utils/combine_classes";
import { Widget } from "../common/widget";
import { LayoutManager } from "./layout_manager";
import { Scrollable } from "../scroll_view/scrollable";
export var viewFunction = viewModel => {
  var aria = {
    role: "form"
  };
  var cssClasses = combineClasses({
    "dx-form": true
  });
  var {
    props: {
      scrollingEnabled,
      useNativeScrolling
    },
    restAttributes
  } = viewModel;
  var rootLayoutManager = createComponentVNode(2, LayoutManager);
  return scrollingEnabled ? createComponentVNode(2, Scrollable, {
    "aria": aria,
    "classes": cssClasses,
    "useNative": !!useNativeScrolling,
    "useSimulatedScrollbar": !useNativeScrolling,
    "useKeyboard": false,
    "direction": "both",
    "bounceEnabled": false,
    children: rootLayoutManager
  }) : normalizeProps(createComponentVNode(2, Widget, _extends({
    "aria": aria,
    "classes": cssClasses
  }, restAttributes, {
    children: rootLayoutManager
  })));
};
export class Form extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

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
Form.defaultProps = _extends({}, FormProps);