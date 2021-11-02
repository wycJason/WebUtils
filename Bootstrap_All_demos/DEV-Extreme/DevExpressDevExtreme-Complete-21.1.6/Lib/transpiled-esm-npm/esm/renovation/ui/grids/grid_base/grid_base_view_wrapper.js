import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["view"];
import { createVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import $ from "../../../../core/renderer";
export var viewFunction = _ref => {
  var {
    viewRef
  } = _ref;
  return createVNode(1, "div", null, null, 1, null, null, viewRef);
};
export var GridBaseViewWrapperProps = {};
import { createRef as infernoCreateRef } from "inferno";
export class GridBaseViewWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.viewRef = infernoCreateRef();
    this.renderView = this.renderView.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.renderView, [])];
  }

  updateEffects() {}

  renderView() {
    var $element = $(this.viewRef.current);
    this.props.view._$element = $element;
    this.props.view._$parent = $element.parent();
    this.props.view.render();
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
      viewRef: this.viewRef,
      restAttributes: this.restAttributes
    });
  }

}
GridBaseViewWrapper.defaultProps = _extends({}, GridBaseViewWrapperProps);