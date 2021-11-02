import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "visible"];
import { createVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import messageLocalization from "../../../../../../../localization/message";
import { combineClasses } from "../../../../../../utils/combine_classes";
export var viewFunction = viewModel => normalizeProps(createVNode(1, "div", viewModel.classes, viewModel.text, 0, _extends({}, viewModel.restAttributes)));
export var AllDayPanelTitleProps = {
  className: "",
  visible: true
};
export class AllDayPanelTitle extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get text() {
    return messageLocalization.format("dxScheduler-allDay");
  }

  get classes() {
    return combineClasses({
      "dx-scheduler-all-day-title": true,
      "dx-scheduler-all-day-title-hidden": !this.props.visible,
      [this.props.className]: !!this.props.className
    });
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
      text: this.text,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  }

}
AllDayPanelTitle.defaultProps = _extends({}, AllDayPanelTitleProps);