import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onStop", "onUpdated", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "showScrollbar", "updateManually", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { BaseWidgetProps } from "../common/base_props";
import { ScrollableProps } from "./scrollable_props";
import { ScrollableNative } from "./scrollable_native";
import { ScrollableSimulated } from "./scrollable_simulated";
import { createDefaultOptionRules, convertRulesToOptions } from "../../../core/options/utils";
import devices from "../../../core/devices";
import { nativeScrolling, touch } from "../../../core/utils/support";
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
      forceGeneratePockets,
      height,
      inertiaEnabled,
      needScrollViewContentWrapper,
      needScrollViewLoadPanel,
      onBounce,
      onEnd,
      onPullDown,
      onReachBottom,
      onScroll,
      onStart,
      onStop,
      onUpdated,
      pullDownEnabled,
      pulledDownText,
      pullingDownText,
      reachBottomEnabled,
      reachBottomText,
      refreshingText,
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
    restAttributes,
    scrollableNativeRef,
    scrollableSimulatedRef
  } = viewModel;
  return useNative ? normalizeProps(createComponentVNode(2, ScrollableNative, _extends({
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
    "forceGeneratePockets": forceGeneratePockets,
    "needScrollViewContentWrapper": needScrollViewContentWrapper,
    "needScrollViewLoadPanel": needScrollViewLoadPanel,
    "onScroll": onScroll,
    "onUpdated": onUpdated,
    "onPullDown": onPullDown,
    "onReachBottom": onReachBottom,
    "pulledDownText": pulledDownText,
    "pullingDownText": pullingDownText,
    "refreshingText": refreshingText,
    "reachBottomText": reachBottomText,
    "useSimulatedScrollbar": useSimulatedScrollbar
  }, restAttributes, {
    children: children
  }), null, scrollableNativeRef)) : normalizeProps(createComponentVNode(2, ScrollableSimulated, _extends({
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
    "forceGeneratePockets": forceGeneratePockets,
    "needScrollViewContentWrapper": needScrollViewContentWrapper,
    "needScrollViewLoadPanel": needScrollViewLoadPanel,
    "onScroll": onScroll,
    "onUpdated": onUpdated,
    "onPullDown": onPullDown,
    "onReachBottom": onReachBottom,
    "pulledDownText": pulledDownText,
    "pullingDownText": pullingDownText,
    "refreshingText": refreshingText,
    "reachBottomText": reachBottomText,
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
  }), null, scrollableSimulatedRef));
};
export var ScrollablePropsType = {
  useNative: ScrollableProps.useNative,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  bounceEnabled: ScrollableProps.bounceEnabled,
  scrollByContent: ScrollableProps.scrollByContent,
  scrollByThumb: ScrollableProps.scrollByThumb,
  updateManually: ScrollableProps.updateManually,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  needScrollViewContentWrapper: ScrollableProps.needScrollViewContentWrapper,
  needScrollViewLoadPanel: ScrollableProps.needScrollViewLoadPanel,
  aria: WidgetProps.aria,
  disabled: BaseWidgetProps.disabled,
  visible: BaseWidgetProps.visible,
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  useKeyboard: ScrollableSimulatedProps.useKeyboard
};
export var defaultOptionRules = createDefaultOptionRules([{
  device: _device => !devices.isSimulator() && devices.real().deviceType === "desktop" && _device.platform === "generic",
  options: {
    bounceEnabled: false,
    scrollByContent: touch,
    scrollByThumb: true,
    showScrollbar: "onHover"
  }
}, {
  device: () => !nativeScrolling,
  options: {
    useNative: false
  }
}]);
import { createRef as infernoCreateRef } from "inferno";
export class Scrollable extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollableNativeRef = infernoCreateRef();
    this.scrollableSimulatedRef = infernoCreateRef();
    this.content = this.content.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.update = this.update.bind(this);
    this.release = this.release.bind(this);
    this.refresh = this.refresh.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
    this.validate = this.validate.bind(this);
    this.getScrollElementPosition = this.getScrollElementPosition.bind(this);
  }

  validate(e) {
    return this.scrollableRef.validate(e);
  }

  get scrollableRef() {
    if (this.props.useNative) {
      return this.scrollableNativeRef.current;
    }

    return this.scrollableSimulatedRef.current;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  content() {
    return this.scrollableRef.content();
  }

  scrollBy(distance) {
    this.scrollableRef.scrollBy(distance);
  }

  update() {
    this.scrollableRef.update();
  }

  release() {
    return this.scrollableRef.release();
  }

  refresh() {
    this.scrollableRef.refresh();
  }

  scrollTo(targetLocation) {
    this.scrollableRef.scrollTo(targetLocation);
  }

  scrollToElement(element) {
    this.scrollableRef.scrollToElement(element);
  }

  scrollHeight() {
    return this.scrollableRef.scrollHeight();
  }

  scrollWidth() {
    return this.scrollableRef.scrollWidth();
  }

  scrollOffset() {
    return this.scrollableRef.scrollOffset();
  }

  scrollTop() {
    return this.scrollableRef.scrollTop();
  }

  scrollLeft() {
    return this.scrollableRef.scrollLeft();
  }

  clientHeight() {
    return this.scrollableRef.clientHeight();
  }

  clientWidth() {
    return this.scrollableRef.clientWidth();
  }

  getScrollElementPosition(element, direction) {
    return this.scrollableRef.getElementLocation(element, direction);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      scrollableNativeRef: this.scrollableNativeRef,
      scrollableSimulatedRef: this.scrollableSimulatedRef,
      validate: this.validate,
      scrollableRef: this.scrollableRef,
      restAttributes: this.restAttributes
    });
  }

}

function __createDefaultProps() {
  return _extends({}, ScrollablePropsType, convertRulesToOptions(defaultOptionRules));
}

Scrollable.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  Scrollable.defaultProps = _extends({}, __createDefaultProps(), convertRulesToOptions(__defaultOptionRules));
}