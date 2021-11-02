import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { combineClasses } from "../../utils/combine_classes";
import { Widget } from "../common/widget";
import { LayoutManagerProps } from "./layout_manager_props";
export var viewFunction = viewModel => {
  var {
    cssClasses,
    restAttributes
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "classes": cssClasses
  }, restAttributes)));
};
export class LayoutManager extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get cssClasses() {
    return combineClasses({
      "dx-layout-manager": true
    });
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _extends({}, _this$props);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      cssClasses: this.cssClasses,
      restAttributes: this.restAttributes
    });
  }

}
LayoutManager.defaultProps = _extends({}, LayoutManagerProps);