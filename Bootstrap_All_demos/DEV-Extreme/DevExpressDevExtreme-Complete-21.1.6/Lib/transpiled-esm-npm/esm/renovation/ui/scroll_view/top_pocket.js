import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["pocketState", "pocketTop", "pullDownIconAngle", "pullDownOpacity", "pullDownTop", "pullDownTranslateTop", "pulledDownText", "pullingDownText", "refreshStrategy", "refreshingText", "topPocketRef", "topPocketTranslateTop", "visible"];
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { LoadIndicator } from "../load_indicator";
import { isDefined } from "../../../core/utils/type";
import messageLocalization from "../../../localization/message";
import { BaseWidgetProps } from "../common/base_props";
import { combineClasses } from "../../utils/combine_classes";
import { PULLDOWN_ICON_CLASS, SCROLLVIEW_PULLDOWN, SCROLLVIEW_PULLDOWN_IMAGE_CLASS, SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, SCROLLVIEW_PULLDOWN_READY_CLASS, SCROLLVIEW_PULLDOWN_LOADING_CLASS, SCROLLVIEW_PULLDOWN_TEXT_CLASS, SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS, SCROLLVIEW_TOP_POCKET_CLASS, TopPocketState } from "./common/consts";
export var viewFunction = viewModel => {
  var {
    props: {
      refreshStrategy,
      topPocketRef
    },
    pullDownClasses,
    pullDownIconStyles,
    pullDownRef,
    pullDownStyles,
    pulledDownText,
    pullingDownText,
    readyVisibleClass,
    refreshVisibleClass,
    refreshingText,
    releaseVisibleClass,
    topPocketStyles
  } = viewModel;
  return createVNode(1, "div", SCROLLVIEW_TOP_POCKET_CLASS, createVNode(1, "div", pullDownClasses, [refreshStrategy !== "swipeDown" && createVNode(1, "div", SCROLLVIEW_PULLDOWN_IMAGE_CLASS), refreshStrategy === "swipeDown" && createVNode(1, "div", PULLDOWN_ICON_CLASS, null, 1, {
    "style": normalizeStyles(pullDownIconStyles)
  }), createVNode(1, "div", SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, createComponentVNode(2, LoadIndicator), 2), refreshStrategy !== "swipeDown" && createVNode(1, "div", SCROLLVIEW_PULLDOWN_TEXT_CLASS, [createVNode(1, "div", releaseVisibleClass, pullingDownText, 0), createVNode(1, "div", readyVisibleClass, pulledDownText, 0), createVNode(1, "div", refreshVisibleClass, refreshingText, 0)], 4)], 0, {
    "style": normalizeStyles(pullDownStyles)
  }, null, pullDownRef), 2, {
    "style": normalizeStyles(topPocketStyles)
  }, null, topPocketRef);
};
export var TopPocketProps = {
  pocketState: TopPocketState.STATE_RELEASED,
  pullDownTop: 0,
  pullDownTranslateTop: 0,
  pullDownIconAngle: 0,
  pullDownOpacity: 0,
  pocketTop: 0,
  topPocketTranslateTop: 0
};
export var TopPocketPropsType = {
  pocketState: TopPocketProps.pocketState,
  pullDownTop: TopPocketProps.pullDownTop,
  pullDownTranslateTop: TopPocketProps.pullDownTranslateTop,
  pullDownIconAngle: TopPocketProps.pullDownIconAngle,
  pullDownOpacity: TopPocketProps.pullDownOpacity,
  pocketTop: TopPocketProps.pocketTop,
  topPocketTranslateTop: TopPocketProps.topPocketTranslateTop,
  visible: BaseWidgetProps.visible
};
import { createRef as infernoCreateRef } from "inferno";
export class TopPocket extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.pullDownRef = infernoCreateRef();
  }

  get releaseVisibleClass() {
    return this.props.pocketState === TopPocketState.STATE_RELEASED ? SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
  }

  get readyVisibleClass() {
    return this.props.pocketState === TopPocketState.STATE_READY ? SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
  }

  get refreshVisibleClass() {
    return this.props.pocketState === TopPocketState.STATE_REFRESHING ? SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
  }

  get pullingDownText() {
    var {
      pullingDownText
    } = this.props;

    if (isDefined(pullingDownText)) {
      return pullingDownText;
    }

    return messageLocalization.format("dxScrollView-pullingDownText");
  }

  get pulledDownText() {
    var {
      pulledDownText
    } = this.props;

    if (isDefined(pulledDownText)) {
      return pulledDownText;
    }

    return messageLocalization.format("dxScrollView-pulledDownText");
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

  get pullDownClasses() {
    var {
      pocketState,
      visible
    } = this.props;
    var classesMap = {
      [SCROLLVIEW_PULLDOWN]: true,
      [SCROLLVIEW_PULLDOWN_READY_CLASS]: pocketState === TopPocketState.STATE_READY,
      [SCROLLVIEW_PULLDOWN_LOADING_CLASS]: pocketState === TopPocketState.STATE_REFRESHING,
      "dx-state-invisible": !visible
    };
    return combineClasses(classesMap);
  }

  get pullDownStyles() {
    if (this.props.refreshStrategy === "swipeDown") {
      return {
        opacity: this.props.pullDownOpacity,
        transform: "translate(0px, ".concat(this.props.pullDownTranslateTop, "px)")
      };
    }

    return undefined;
  }

  get topPocketStyles() {
    if (this.props.refreshStrategy === "pullDown") {
      return {
        top: "".concat(this.props.pocketTop, "px"),
        transform: "translate(0px, ".concat(this.props.topPocketTranslateTop, "px)")
      };
    }

    return undefined;
  }

  get pullDownIconStyles() {
    return {
      transform: "rotate(".concat(this.props.pullDownIconAngle, "deg)")
    };
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
      pullDownRef: this.pullDownRef,
      releaseVisibleClass: this.releaseVisibleClass,
      readyVisibleClass: this.readyVisibleClass,
      refreshVisibleClass: this.refreshVisibleClass,
      pullingDownText: this.pullingDownText,
      pulledDownText: this.pulledDownText,
      refreshingText: this.refreshingText,
      pullDownClasses: this.pullDownClasses,
      pullDownStyles: this.pullDownStyles,
      topPocketStyles: this.topPocketStyles,
      pullDownIconStyles: this.pullDownIconStyles,
      restAttributes: this.restAttributes
    });
  }

}
TopPocket.defaultProps = _extends({}, TopPocketPropsType);