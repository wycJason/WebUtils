import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["refreshingText", "targetElement", "visible"];
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { isDefined } from "../../../core/utils/type";
import messageLocalization from "../../../localization/message";
import { LoadPanel, LoadPanelProps } from "../load_panel";
var SCROLLVIEW_LOADPANEL = "dx-scrollview-loadpanel";
export var viewFunction = viewModel => {
  var {
    position,
    props: {
      visible
    },
    refreshingText
  } = viewModel;
  return createComponentVNode(2, LoadPanel, {
    "className": SCROLLVIEW_LOADPANEL,
    "shading": false,
    "delay": 400,
    "message": refreshingText,
    "position": position,
    "visible": visible
  });
};
export var ScrollViewLoadPanelProps = {};
export var ScrollViewLoadPanelPropsType = {
  visible: LoadPanelProps.visible
};
export class ScrollViewLoadPanel extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get refreshingText() {
    var {
      refreshingText
    } = this.props;

    if (isDefined(refreshingText)) {
      return refreshingText;
    }

    return messageLocalization.format("dxScrollView-refreshingText");
  }

  get position() {
    if (this.props.targetElement) {
      return {
        of: this.props.targetElement.current
      };
    }

    return undefined;
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
      refreshingText: this.refreshingText,
      position: this.position,
      restAttributes: this.restAttributes
    });
  }

}
ScrollViewLoadPanel.defaultProps = _extends({}, ScrollViewLoadPanelPropsType);