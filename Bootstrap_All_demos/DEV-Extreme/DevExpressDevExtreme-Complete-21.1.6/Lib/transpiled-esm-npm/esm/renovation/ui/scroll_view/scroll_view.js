import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["aria", "bounceEnabled", "children", "classes", "direction", "disabled", "height", "inertiaEnabled", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onStop", "onUpdated", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "showScrollbar", "updateManually", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { current, isMaterial } from "../../../ui/themes";
import { isDefined } from "../../../core/utils/type";
import { Scrollable, defaultOptionRules } from "./scrollable";
import { BaseWidgetProps } from "../common/base_props";
import { ScrollableProps } from "./scrollable_props";
import { WidgetProps } from "../common/widget";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
export var viewFunction = viewModel => {
  var {
    props: {
      aria,
      bounceEnabled,
      children,
      direction,
      disabled,
      height,
      inertiaEnabled,
      onBounce,
      onEnd,
      onPullDown,
      onReachBottom,
      onScroll,
      onStart,
      onStop,
      onUpdated,
      pullDownEnabled,
      reachBottomEnabled,
      rtlEnabled,
      scrollByContent,
      scrollByThumb,
      showScrollbar,
      updateManually,
      useKeyboard,
      useNative,
      useSimulatedScrollbar,
      visible,
      width
    },
    pulledDownText,
    pullingDownText,
    reachBottomText,
    refreshingText,
    restAttributes,
    scrollableRef
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Scrollable, _extends({
    "useNative": useNative,
    "classes": "dx-scrollview",
    "aria": aria,
    "width": width,
    "height": height,
    "disabled": disabled,
    "visible": visible,
    "rtlEnabled": rtlEnabled,
    "direction": direction,
    "showScrollbar": showScrollbar,
    "scrollByThumb": scrollByThumb,
    "updateManually": updateManually,
    "pullDownEnabled": pullDownEnabled,
    "reachBottomEnabled": reachBottomEnabled,
    "onScroll": onScroll,
    "onUpdated": onUpdated,
    "onPullDown": onPullDown,
    "onReachBottom": onReachBottom,
    "pulledDownText": pulledDownText,
    "pullingDownText": pullingDownText,
    "refreshingText": refreshingText,
    "reachBottomText": reachBottomText,
    "forceGeneratePockets": true,
    "needScrollViewContentWrapper": true,
    "needScrollViewLoadPanel": true,
    "useSimulatedScrollbar": useSimulatedScrollbar,
    "inertiaEnabled": inertiaEnabled,
    "bounceEnabled": bounceEnabled,
    "scrollByContent": scrollByContent,
    "useKeyboard": useKeyboard,
    "onStart": onStart,
    "onEnd": onEnd,
    "onBounce": onBounce,
    "onStop": onStop
  }, restAttributes, {
    children: children
  }), null, scrollableRef));
};
export var ScrollViewProps = _extends({}, ScrollableProps);
var ScrollViewPropsType = {
  useNative: ScrollableProps.useNative,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  bounceEnabled: ScrollableProps.bounceEnabled,
  scrollByContent: ScrollableProps.scrollByContent,
  scrollByThumb: ScrollableProps.scrollByThumb,
  updateManually: ScrollableProps.updateManually,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  aria: WidgetProps.aria,
  disabled: BaseWidgetProps.disabled,
  visible: BaseWidgetProps.visible,
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  useKeyboard: ScrollableSimulatedProps.useKeyboard
};
import { convertRulesToOptions } from "../../../core/options/utils";
import { createRef as infernoCreateRef } from "inferno";
export class ScrollView extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollableRef = infernoCreateRef();
    this.update = this.update.bind(this);
    this.release = this.release.bind(this);
    this.refresh = this.refresh.bind(this);
    this.content = this.content.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
  }

  get pullingDownText() {
    var {
      pullingDownText
    } = this.props;

    if (isDefined(pullingDownText)) {
      return pullingDownText;
    }

    return isMaterial(current()) ? "" : undefined;
  }

  get pulledDownText() {
    var {
      pulledDownText
    } = this.props;

    if (isDefined(pulledDownText)) {
      return pulledDownText;
    }

    return isMaterial(current()) ? "" : undefined;
  }

  get refreshingText() {
    var {
      refreshingText
    } = this.props;

    if (isDefined(refreshingText)) {
      return refreshingText;
    }

    return isMaterial(current()) ? "" : undefined;
  }

  get reachBottomText() {
    var {
      reachBottomText
    } = this.props;

    if (isDefined(reachBottomText)) {
      return reachBottomText;
    }

    return isMaterial(current()) ? "" : undefined;
  }

  get scrollable() {
    return this.scrollableRef.current;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  update() {
    this.scrollable.update();
  }

  release() {
    this.scrollable.release();
  }

  refresh() {
    if (this.props.pullDownEnabled) {
      this.scrollable.refresh();
    }
  }

  content() {
    return this.scrollable.content();
  }

  scrollBy(distance) {
    this.scrollable.scrollBy(distance);
  }

  scrollTo(targetLocation) {
    this.scrollable.scrollTo(targetLocation);
  }

  scrollToElement(element) {
    this.scrollable.scrollToElement(element);
  }

  scrollHeight() {
    return this.scrollable.scrollHeight();
  }

  scrollWidth() {
    return this.scrollable.scrollWidth();
  }

  scrollOffset() {
    return this.scrollable.scrollOffset();
  }

  scrollTop() {
    return this.scrollable.scrollTop();
  }

  scrollLeft() {
    return this.scrollable.scrollLeft();
  }

  clientHeight() {
    return this.scrollable.clientHeight();
  }

  clientWidth() {
    return this.scrollable.clientWidth();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      scrollableRef: this.scrollableRef,
      pullingDownText: this.pullingDownText,
      pulledDownText: this.pulledDownText,
      refreshingText: this.refreshingText,
      reachBottomText: this.reachBottomText,
      scrollable: this.scrollable,
      restAttributes: this.restAttributes
    });
  }

}

function __createDefaultProps() {
  return _extends({}, ScrollViewPropsType, convertRulesToOptions(defaultOptionRules));
}

ScrollView.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  ScrollView.defaultProps = _extends({}, __createDefaultProps(), convertRulesToOptions(__defaultOptionRules));
}