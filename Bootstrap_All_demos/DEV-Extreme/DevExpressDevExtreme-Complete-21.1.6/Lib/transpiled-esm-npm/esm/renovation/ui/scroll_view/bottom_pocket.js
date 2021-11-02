import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["bottomPocketRef", "reachBottomText", "visible"];
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { LoadIndicator } from "../load_indicator";
import { isDefined } from "../../../core/utils/type";
import { SCROLLVIEW_BOTTOM_POCKET_CLASS, SCROLLVIEW_REACHBOTTOM_CLASS, SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, SCROLLVIEW_REACHBOTTOM_TEXT_CLASS } from "./common/consts";
import messageLocalization from "../../../localization/message";
import { BaseWidgetProps } from "../common/base_props";
import { combineClasses } from "../../utils/combine_classes";
export var viewFunction = viewModel => {
  var {
    props: {
      bottomPocketRef
    },
    reachBottomClasses,
    reachBottomText
  } = viewModel;
  return createVNode(1, "div", SCROLLVIEW_BOTTOM_POCKET_CLASS, createVNode(1, "div", reachBottomClasses, [createVNode(1, "div", SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, createComponentVNode(2, LoadIndicator), 2), createVNode(1, "div", SCROLLVIEW_REACHBOTTOM_TEXT_CLASS, createVNode(1, "div", null, reachBottomText, 0), 2)], 4), 2, null, null, bottomPocketRef);
};
export var BottomPocketProps = {};
export var BottomPocketPropsType = {
  visible: BaseWidgetProps.visible
};
export class BottomPocket extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get reachBottomText() {
    var {
      reachBottomText
    } = this.props;

    if (isDefined(reachBottomText)) {
      return reachBottomText;
    }

    return messageLocalization.format("dxScrollView-reachBottomText");
  }

  get reachBottomClasses() {
    var {
      visible
    } = this.props;
    var classesMap = {
      [SCROLLVIEW_REACHBOTTOM_CLASS]: true,
      "dx-state-invisible": !visible
    };
    return combineClasses(classesMap);
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
      reachBottomText: this.reachBottomText,
      reachBottomClasses: this.reachBottomClasses,
      restAttributes: this.restAttributes
    });
  }

}
BottomPocket.defaultProps = _extends({}, BottomPocketPropsType);