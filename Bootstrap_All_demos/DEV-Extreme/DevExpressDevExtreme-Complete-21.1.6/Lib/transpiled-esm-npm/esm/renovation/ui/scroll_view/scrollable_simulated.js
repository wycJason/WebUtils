import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["aria", "bounceEnabled", "children", "classes", "contentTranslateOffsetChange", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onKeyDown", "onPullDown", "onReachBottom", "onScroll", "onStart", "onStop", "onUpdated", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "updateManually", "useKeyboard", "useNative", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { subscribeToScrollEvent } from "../../utils/subscribe_to_event";
import { ScrollViewLoadPanel } from "./load_panel";
import { AnimatedScrollbar } from "./animated_scrollbar";
import { Widget } from "../common/widget";
import { combineClasses } from "../../utils/combine_classes";
import { getBoundaryProps } from "./utils/get_boundary_props";
import { isDxMouseWheelEvent, normalizeKeyName, isCommandKeyPressed } from "../../../events/utils/index";
import { getWindow, hasWindow } from "../../../core/utils/window";
import { isDefined } from "../../../core/utils/type";
import { ScrollableSimulatedPropsType } from "./scrollable_simulated_props";
import "../../../events/gesture/emitter.gesture.scroll";
import eventsEngine from "../../../events/core/events_engine";
import { getLocation, updateAllowedDirection } from "./scrollable_utils";
import { ScrollDirection } from "./utils/scroll_direction";
import { DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, SCROLLABLE_SIMULATED_CLASS, SCROLLABLE_CONTAINER_CLASS, SCROLLABLE_CONTENT_CLASS, SCROLLABLE_WRAPPER_CLASS, SCROLLVIEW_CONTENT_CLASS, SCROLLABLE_DISABLED_CLASS, SCROLLABLE_SCROLLBARS_HIDDEN, SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, SCROLL_LINE_HEIGHT, SCROLLABLE_SCROLLBAR_CLASS, DIRECTION_BOTH, KEY_CODES, VALIDATE_WHEEL_TIMEOUT, TopPocketState } from "./common/consts";
import { getElementOffset } from "./utils/get_element_offset";
import { getElementStyle } from "./utils/get_element_style";
import { TopPocket } from "./top_pocket";
import { BottomPocket } from "./bottom_pocket";
import { dxScrollInit, dxScrollStart, dxScrollMove, dxScrollEnd, dxScrollStop, dxScrollCancel } from "../../../events/short";
import { getOffsetDistance } from "./utils/get_offset_distance";
import { restoreLocation } from "./utils/restore_location";
import { getScrollTopMax } from "./utils/get_scroll_top_max";
import { getScrollLeftMax } from "./utils/get_scroll_left_max";
export var viewFunction = viewModel => {
  var {
    bottomPocketClientHeight,
    bottomPocketRef,
    containerClientHeight,
    containerClientWidth,
    containerRef,
    containerStyles,
    contentHeight,
    contentRef,
    contentStyles,
    contentTranslateOffsetChange,
    contentWidth,
    cssClasses,
    cursorEnterHandler,
    cursorLeaveHandler,
    direction,
    forceUpdateHScrollbarLocation,
    forceUpdateVScrollbarLocation,
    hScrollLocation,
    hScrollbarRef,
    isHovered,
    isLoadPanelVisible,
    onBounce,
    onPullDown,
    onReachBottom,
    onRelease,
    onWidgetKeyDown,
    pocketStateChange,
    props: {
      aria,
      bounceEnabled,
      children,
      disabled,
      forceGeneratePockets,
      height,
      inertiaEnabled,
      needScrollViewContentWrapper,
      needScrollViewLoadPanel,
      pullDownEnabled,
      pulledDownText,
      pullingDownText,
      reachBottomEnabled,
      reachBottomText,
      refreshingText,
      rtlEnabled,
      scrollByThumb,
      showScrollbar,
      useKeyboard,
      visible,
      width
    },
    restAttributes,
    scrollLocationChange,
    scrollViewContentRef,
    scrollableOffsetLeft,
    scrollableOffsetTop,
    scrollableRef,
    topPocketClientHeight,
    topPocketRef,
    topPocketState,
    vScrollLocation,
    vScrollbarRef,
    windowResizeHandler,
    wrapperRef
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": scrollableRef,
    "focusStateEnabled": useKeyboard,
    "hoverStateEnabled": true,
    "aria": aria,
    "classes": cssClasses,
    "disabled": disabled,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onKeyDown": onWidgetKeyDown,
    "onHoverStart": cursorEnterHandler,
    "onHoverEnd": cursorLeaveHandler,
    "onDimensionChanged": windowResizeHandler
  }, restAttributes, {
    children: [createVNode(1, "div", SCROLLABLE_WRAPPER_CLASS, createVNode(1, "div", SCROLLABLE_CONTAINER_CLASS, [createVNode(1, "div", SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && createComponentVNode(2, TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": "simulated",
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? createVNode(1, "div", SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : createVNode(1, "div", null, children, 0), forceGeneratePockets && createComponentVNode(2, BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": normalizeStyles(contentStyles)
    }, null, contentRef), direction.isHorizontal && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "horizontal",
      "scrollableOffset": scrollableOffsetLeft,
      "contentSize": contentWidth,
      "containerSize": containerClientWidth,
      "isScrollableHovered": isHovered,
      "scrollLocation": hScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "contentTranslateOffsetChange": contentTranslateOffsetChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "forceUpdateScrollbarLocation": forceUpdateHScrollbarLocation
    }, null, hScrollbarRef), direction.isVertical && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "vertical",
      "scrollableOffset": scrollableOffsetTop,
      "contentSize": contentHeight,
      "containerSize": containerClientHeight,
      "isScrollableHovered": isHovered,
      "scrollLocation": vScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "contentTranslateOffsetChange": contentTranslateOffsetChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "forceUpdateScrollbarLocation": forceUpdateVScrollbarLocation,
      "forceGeneratePockets": forceGeneratePockets,
      "topPocketSize": topPocketClientHeight,
      "bottomPocketSize": bottomPocketClientHeight,
      "onPullDown": onPullDown,
      "onRelease": onRelease,
      "onReachBottom": onReachBottom,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "pocketState": topPocketState,
      "pocketStateChange": pocketStateChange
    }, null, vScrollbarRef)], 0, {
      "style": normalizeStyles(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && createComponentVNode(2, ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    })]
  })));
};
import { createRef as infernoCreateRef } from "inferno";
export class ScrollableSimulated extends InfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.locked = false;
    this.loadingIndicatorEnabled = true;
    this.validDirections = {};
    this.prevContainerClientWidth = 0;
    this.prevContainerClientHeight = 0;
    this.prevContentClientWidth = 0;
    this.prevContentClientHeight = 0;
    this.scrollableRef = infernoCreateRef();
    this.wrapperRef = infernoCreateRef();
    this.contentRef = infernoCreateRef();
    this.scrollViewContentRef = infernoCreateRef();
    this.containerRef = infernoCreateRef();
    this.vScrollbarRef = infernoCreateRef();
    this.hScrollbarRef = infernoCreateRef();
    this.topPocketRef = infernoCreateRef();
    this.bottomPocketRef = infernoCreateRef();
    this.state = {
      isHovered: false,
      scrollableOffsetLeft: 0,
      scrollableOffsetTop: 0,
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentScrollWidth: 0,
      contentScrollHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      topPocketClientHeight: 0,
      bottomPocketClientHeight: 0,
      topPocketState: TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      vScrollLocation: 0,
      hScrollLocation: 0,
      vContentTranslateOffset: 0,
      hContentTranslateOffset: 0,
      forceUpdateHScrollbarLocation: false,
      forceUpdateVScrollbarLocation: false
    };
    this.content = this.content.bind(this);
    this.update = this.update.bind(this);
    this.refresh = this.refresh.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
    this.release = this.release.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.getElementLocation = this.getElementLocation.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
    this.disposeWheelTimer = this.disposeWheelTimer.bind(this);
    this.scrollEffect = this.scrollEffect.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getEventArgs = this.getEventArgs.bind(this);
    this.initEffect = this.initEffect.bind(this);
    this.getInitEventData = this.getInitEventData.bind(this);
    this.startEffect = this.startEffect.bind(this);
    this.moveEffect = this.moveEffect.bind(this);
    this.endEffect = this.endEffect.bind(this);
    this.stopEffect = this.stopEffect.bind(this);
    this.cancelEffect = this.cancelEffect.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onUpdated = this.onUpdated.bind(this);
    this.onBounce = this.onBounce.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.pocketStateChange = this.pocketStateChange.bind(this);
    this.scrollLocationChange = this.scrollLocationChange.bind(this);
    this.triggerScrollEvent = this.triggerScrollEvent.bind(this);
    this.contentTranslateOffsetChange = this.contentTranslateOffsetChange.bind(this);
    this.cursorEnterHandler = this.cursorEnterHandler.bind(this);
    this.cursorLeaveHandler = this.cursorLeaveHandler.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isCrossThumbScrolling = this.isCrossThumbScrolling.bind(this);
    this.adjustDistance = this.adjustDistance.bind(this);
    this.suppressDirections = this.suppressDirections.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.prepareDirections = this.prepareDirections.bind(this);
    this.isContent = this.isContent.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.getDirection = this.getDirection.bind(this);
    this.allowedDirection = this.allowedDirection.bind(this);
    this.validate = this.validate.bind(this);
    this.isLocked = this.isLocked.bind(this);
    this.validateWheel = this.validateWheel.bind(this);
    this.clearWheelValidationTimer = this.clearWheelValidationTimer.bind(this);
    this.validateMove = this.validateMove.bind(this);
    this.onWidgetKeyDown = this.onWidgetKeyDown.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.scrollByLine = this.scrollByLine.bind(this);
    this.tryGetDevicePixelRatio = this.tryGetDevicePixelRatio.bind(this);
    this.scrollByPage = this.scrollByPage.bind(this);
    this.wheelDirection = this.wheelDirection.bind(this);
    this.scrollToHome = this.scrollToHome.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.effectDisabledState = this.effectDisabledState.bind(this);
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
    this.effectResetInactiveState = this.effectResetInactiveState.bind(this);
    this.updateScrollbarSize = this.updateScrollbarSize.bind(this);
    this.windowResizeHandler = this.windowResizeHandler.bind(this);
    this.updateSizes = this.updateSizes.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.disposeWheelTimer, []), new InfernoEffect(this.scrollEffect, [this.props.onScroll, this.props.direction, this.topPocketClientHeight]), new InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByContent, this.props.scrollByThumb, this.props.onStop, this.topPocketClientHeight, this.contentScrollHeight, this.contentClientHeight, this.containerClientHeight, this.props.bounceEnabled, this.contentScrollWidth, this.contentClientWidth, this.containerClientWidth, this.props.updateManually, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.vScrollLocation, this.props.onUpdated, this.props.disabled]), new InfernoEffect(this.startEffect, [this.props.direction, this.props.onStart, this.topPocketClientHeight]), new InfernoEffect(this.moveEffect, [this.props.direction]), new InfernoEffect(this.endEffect, [this.props.direction, this.props.onEnd, this.topPocketClientHeight]), new InfernoEffect(this.stopEffect, [this.props.direction]), new InfernoEffect(this.cancelEffect, [this.props.direction]), new InfernoEffect(this.effectDisabledState, [this.props.disabled]), new InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new InfernoEffect(this.updateScrollbarSize, [this.isHovered, this.scrollableOffsetLeft, this.scrollableOffsetTop, this.containerClientWidth, this.containerClientHeight, this.contentScrollWidth, this.contentScrollHeight, this.contentClientWidth, this.contentClientHeight, this.topPocketClientHeight, this.bottomPocketClientHeight, this.topPocketState, this.isLoadPanelVisible, this.vScrollLocation, this.hScrollLocation, this.vContentTranslateOffset, this.hContentTranslateOffset, this.forceUpdateHScrollbarLocation, this.forceUpdateVScrollbarLocation, this.props.inertiaEnabled, this.props.useKeyboard, this.props.onStart, this.props.onEnd, this.props.onBounce, this.props.onStop, this.props.contentTranslateOffsetChange, this.props.scrollLocationChange, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.updateManually, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.onScroll, this.props.direction, this.topPocketClientHeight]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.direction, this.props.scrollByContent, this.props.scrollByThumb, this.props.onStop, this.topPocketClientHeight, this.contentScrollHeight, this.contentClientHeight, this.containerClientHeight, this.props.bounceEnabled, this.contentScrollWidth, this.contentClientWidth, this.containerClientWidth, this.props.updateManually, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.vScrollLocation, this.props.onUpdated, this.props.disabled]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.direction, this.props.onStart, this.topPocketClientHeight]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.direction]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.direction, this.props.onEnd, this.topPocketClientHeight]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.direction]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.direction]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.disabled]);
    (_this$_effects$9 = this._effects[9]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.direction]);
    (_this$_effects$10 = this._effects[10]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.isHovered, this.scrollableOffsetLeft, this.scrollableOffsetTop, this.containerClientWidth, this.containerClientHeight, this.contentScrollWidth, this.contentScrollHeight, this.contentClientWidth, this.contentClientHeight, this.topPocketClientHeight, this.bottomPocketClientHeight, this.topPocketState, this.isLoadPanelVisible, this.vScrollLocation, this.hScrollLocation, this.vContentTranslateOffset, this.hContentTranslateOffset, this.forceUpdateHScrollbarLocation, this.forceUpdateVScrollbarLocation, this.props.inertiaEnabled, this.props.useKeyboard, this.props.onStart, this.props.onEnd, this.props.onBounce, this.props.onStop, this.props.contentTranslateOffsetChange, this.props.scrollLocationChange, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.updateManually, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width]);
  }

  get isHovered() {
    var state = this._currentState || this.state;
    return state.isHovered;
  }

  set_isHovered(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        isHovered: newValue
      };
    });
  }

  get scrollableOffsetLeft() {
    var state = this._currentState || this.state;
    return state.scrollableOffsetLeft;
  }

  set_scrollableOffsetLeft(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        scrollableOffsetLeft: newValue
      };
    });
  }

  get scrollableOffsetTop() {
    var state = this._currentState || this.state;
    return state.scrollableOffsetTop;
  }

  set_scrollableOffsetTop(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        scrollableOffsetTop: newValue
      };
    });
  }

  get containerClientWidth() {
    var state = this._currentState || this.state;
    return state.containerClientWidth;
  }

  set_containerClientWidth(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        containerClientWidth: newValue
      };
    });
  }

  get containerClientHeight() {
    var state = this._currentState || this.state;
    return state.containerClientHeight;
  }

  set_containerClientHeight(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        containerClientHeight: newValue
      };
    });
  }

  get contentScrollWidth() {
    var state = this._currentState || this.state;
    return state.contentScrollWidth;
  }

  set_contentScrollWidth(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        contentScrollWidth: newValue
      };
    });
  }

  get contentScrollHeight() {
    var state = this._currentState || this.state;
    return state.contentScrollHeight;
  }

  set_contentScrollHeight(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        contentScrollHeight: newValue
      };
    });
  }

  get contentClientWidth() {
    var state = this._currentState || this.state;
    return state.contentClientWidth;
  }

  set_contentClientWidth(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        contentClientWidth: newValue
      };
    });
  }

  get contentClientHeight() {
    var state = this._currentState || this.state;
    return state.contentClientHeight;
  }

  set_contentClientHeight(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        contentClientHeight: newValue
      };
    });
  }

  get topPocketClientHeight() {
    var state = this._currentState || this.state;
    return state.topPocketClientHeight;
  }

  set_topPocketClientHeight(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        topPocketClientHeight: newValue
      };
    });
  }

  get bottomPocketClientHeight() {
    var state = this._currentState || this.state;
    return state.bottomPocketClientHeight;
  }

  set_bottomPocketClientHeight(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        bottomPocketClientHeight: newValue
      };
    });
  }

  get topPocketState() {
    var state = this._currentState || this.state;
    return state.topPocketState;
  }

  set_topPocketState(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        topPocketState: newValue
      };
    });
  }

  get isLoadPanelVisible() {
    var state = this._currentState || this.state;
    return state.isLoadPanelVisible;
  }

  set_isLoadPanelVisible(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        isLoadPanelVisible: newValue
      };
    });
  }

  get vScrollLocation() {
    var state = this._currentState || this.state;
    return state.vScrollLocation;
  }

  set_vScrollLocation(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        vScrollLocation: newValue
      };
    });
  }

  get hScrollLocation() {
    var state = this._currentState || this.state;
    return state.hScrollLocation;
  }

  set_hScrollLocation(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        hScrollLocation: newValue
      };
    });
  }

  get vContentTranslateOffset() {
    var state = this._currentState || this.state;
    return state.vContentTranslateOffset;
  }

  set_vContentTranslateOffset(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        vContentTranslateOffset: newValue
      };
    });
  }

  get hContentTranslateOffset() {
    var state = this._currentState || this.state;
    return state.hContentTranslateOffset;
  }

  set_hContentTranslateOffset(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        hContentTranslateOffset: newValue
      };
    });
  }

  get forceUpdateHScrollbarLocation() {
    var state = this._currentState || this.state;
    return state.forceUpdateHScrollbarLocation;
  }

  set_forceUpdateHScrollbarLocation(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        forceUpdateHScrollbarLocation: newValue
      };
    });
  }

  get forceUpdateVScrollbarLocation() {
    var state = this._currentState || this.state;
    return state.forceUpdateVScrollbarLocation;
  }

  set_forceUpdateVScrollbarLocation(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        forceUpdateVScrollbarLocation: newValue
      };
    });
  }

  disposeWheelTimer() {
    return () => this.clearWheelValidationTimer();
  }

  scrollEffect() {
    return subscribeToScrollEvent(this.containerElement, () => {
      this.handleScroll();
    });
  }

  initEffect() {
    var namespace = "dxScrollable";
    dxScrollInit.on(this.wrapperRef.current, e => {
      this.handleInit(e);
    }, this.getInitEventData(), {
      namespace
    });
    return () => dxScrollInit.off(this.wrapperRef.current, {
      namespace
    });
  }

  startEffect() {
    var namespace = "dxScrollable";
    dxScrollStart.on(this.wrapperRef.current, e => {
      this.handleStart(e);
    }, {
      namespace
    });
    return () => dxScrollStart.off(this.wrapperRef.current, {
      namespace
    });
  }

  moveEffect() {
    var namespace = "dxScrollable";
    dxScrollMove.on(this.wrapperRef.current, e => {
      this.handleMove(e);
    }, {
      namespace
    });
    return () => dxScrollMove.off(this.wrapperRef.current, {
      namespace
    });
  }

  endEffect() {
    var namespace = "dxScrollable";
    dxScrollEnd.on(this.wrapperRef.current, e => {
      this.handleEnd(e);
    }, {
      namespace
    });
    return () => dxScrollEnd.off(this.wrapperRef.current, {
      namespace
    });
  }

  stopEffect() {
    var namespace = "dxScrollable";
    dxScrollStop.on(this.wrapperRef.current, () => {
      this.handleStop();
    }, {
      namespace
    });
    return () => dxScrollStop.off(this.wrapperRef.current, {
      namespace
    });
  }

  cancelEffect() {
    var namespace = "dxScrollable";
    dxScrollCancel.on(this.wrapperRef.current, event => {
      this.handleCancel(event);
    }, {
      namespace
    });
    return () => dxScrollCancel.off(this.wrapperRef.current, {
      namespace
    });
  }

  effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  }

  effectResetInactiveState() {
    var containerEl = this.containerRef.current;

    if (this.props.direction === DIRECTION_BOTH || !isDefined(containerEl)) {
      return;
    }

    containerEl[this.fullScrollInactiveProp] = 0;
  }

  updateScrollbarSize() {
    this.set_scrollableOffsetLeft(() => this.scrollableOffset.left);
    this.set_scrollableOffsetTop(() => this.scrollableOffset.top);
    this.updateSizes();
  }

  startLoading() {
    if (this.loadingIndicatorEnabled) {
      this.set_isLoadPanelVisible(() => true);
    }

    this.lock();
  }

  finishLoading() {
    this.set_isLoadPanelVisible(() => false);
    this.unlock();
  }

  handleScroll() {
    var _this$props$onScroll, _this$props;

    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  }

  getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset
    }, getBoundaryProps(this.props.direction, scrollOffset, this.containerElement, this.topPocketClientHeight));
  }

  getInitEventData() {
    return {
      getDirection: this.getDirection,
      validate: this.validate,
      isNative: false,
      scrollTarget: this.containerRef.current
    };
  }

  onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  }

  onEnd() {
    var _this$props$onEnd, _this$props3;

    (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.getEventArgs());
  }

  onStop() {
    var _this$props$onStop, _this$props4;

    (_this$props$onStop = (_this$props4 = this.props).onStop) === null || _this$props$onStop === void 0 ? void 0 : _this$props$onStop.call(_this$props4, this.getEventArgs());
  }

  onUpdated() {
    var _this$props$onUpdated, _this$props5;

    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  }

  onBounce() {
    var _this$props$onBounce, _this$props6;

    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  }

  onPullDown() {
    var _this$props$onPullDow, _this$props7;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  }

  onRelease() {
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.onUpdated();
  }

  onReachBottom() {
    var _this$props$onReachBo, _this$props8;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  }

  pocketStateChange(state) {
    this.set_topPocketState(() => state);
  }

  scrollLocationChange(scrollProp, location) {
    var containerEl = this.containerElement;
    containerEl[scrollProp] = -location;

    if (scrollProp === "scrollLeft") {
      this.set_hScrollLocation(() => location);
    } else {
      this.set_vScrollLocation(() => location);
    }

    this.set_forceUpdateHScrollbarLocation(() => false);
    this.set_forceUpdateVScrollbarLocation(() => false);
    this.triggerScrollEvent();
  }

  triggerScrollEvent() {
    eventsEngine.triggerHandler(this.containerElement, {
      type: "scroll"
    });
  }

  contentTranslateOffsetChange(prop, translateOffset) {
    if (prop === "top") {
      this.set_vContentTranslateOffset(() => translateOffset);
    } else {
      this.set_hContentTranslateOffset(() => translateOffset);
    }
  }

  cursorEnterHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.set_isHovered(() => true);
    }
  }

  cursorLeaveHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.set_isHovered(() => false);
    }
  }

  handleInit(e) {
    this.suppressDirections(e);
    this.eventForUserAction = e;
    var crossThumbScrolling = this.isCrossThumbScrolling(e);
    this.eventHandler(scrollbar => scrollbar.initHandler(e, crossThumbScrolling));
    this.onStop();
  }

  handleStart(e) {
    this.eventForUserAction = e;
    this.eventHandler(scrollbar => scrollbar.startHandler());
    this.onStart();
  }

  handleMove(e) {
    if (this.isLocked()) {
      e.cancel = true;
      return;
    }

    e.preventDefault();
    this.adjustDistance(e, "delta");
    this.eventForUserAction = e;
    this.eventHandler(scrollbar => scrollbar.moveHandler(e.delta));
  }

  handleEnd(e) {
    this.adjustDistance(e, "velocity");
    this.eventForUserAction = e;
    this.eventHandler(scrollbar => scrollbar.endHandler(e.velocity));
    this.onEnd();
  }

  handleStop() {
    this.eventHandler(scrollbar => scrollbar.stopHandler());
  }

  handleCancel(e) {
    this.eventForUserAction = e;
    this.eventHandler(scrollbar => scrollbar.endHandler({
      x: 0,
      y: 0
    }));
  }

  isCrossThumbScrolling(e) {
    var {
      target
    } = e.originalEvent;
    var verticalScrolling;
    var horizontalScrolling;

    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }

    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }

    return verticalScrolling || horizontalScrolling;
  }

  adjustDistance(e, property) {
    var distance = e[property];
    distance.x *= this.validDirections[DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[DIRECTION_VERTICAL] ? 1 : 0;
    var devicePixelRatio = this.tryGetDevicePixelRatio();

    if (devicePixelRatio && isDxMouseWheelEvent(e.originalEvent)) {
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }

  suppressDirections(e) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      this.prepareDirections(true);
      return;
    }

    this.prepareDirections(false);

    if (this.direction.isVertical && isDefined(this.vScrollbarRef.current)) {
      var isValid = this.validateEvent(e, this.vScrollbarRef.current);
      this.validDirections[DIRECTION_VERTICAL] = isValid;
    }

    if (this.direction.isHorizontal && isDefined(this.hScrollbarRef.current)) {
      var _isValid = this.validateEvent(e, this.hScrollbarRef.current);

      this.validDirections[DIRECTION_HORIZONTAL] = _isValid;
    }
  }

  validateEvent(e, scrollbarRef) {
    var {
      scrollByContent,
      scrollByThumb
    } = this.props;
    return scrollByThumb && scrollbarRef.validateEvent(e) || scrollByContent && this.isContent(e.originalEvent.target);
  }

  prepareDirections(value) {
    this.validDirections[DIRECTION_HORIZONTAL] = value;
    this.validDirections[DIRECTION_VERTICAL] = value;
  }

  isContent(element) {
    var closest = element.closest(".dx-scrollable-simulated");

    if (isDefined(closest)) {
      return closest === this.scrollableRef.current;
    }

    return false;
  }

  eventHandler(handler) {
    if (this.direction.isHorizontal) {
      handler(this.hScrollbarRef.current);
    }

    if (this.direction.isVertical) {
      handler(this.vScrollbarRef.current);
    }
  }

  getDirection(e) {
    return isDxMouseWheelEvent(e) ? this.wheelDirection(e) : this.allowedDirection();
  }

  allowedDirection() {
    return updateAllowedDirection(this.allowedDirections, this.props.direction);
  }

  get allowedDirections() {
    return {
      vertical: this.direction.isVertical && (Math.round(-Math.max(this.contentHeight - this.containerClientHeight, 0)) < 0 || this.props.bounceEnabled),
      horizontal: this.direction.isHorizontal && (Math.round(-Math.max(this.contentWidth - this.containerClientWidth, 0)) < 0 || this.props.bounceEnabled)
    };
  }

  isLocked() {
    return this.locked;
  }

  validateWheel(e) {
    var scrollbar = this.wheelDirection(e) === "horizontal" ? this.hScrollbarRef.current : this.vScrollbarRef.current;
    var reachedMin = scrollbar.reachedMin();
    var reachedMax = scrollbar.reachedMax();
    var contentGreaterThanContainer = !reachedMin || !reachedMax;
    var locatedNotAtBound = !reachedMin && !reachedMax;
    var {
      delta
    } = e;
    var scrollFromMin = reachedMin && delta > 0;
    var scrollFromMax = reachedMax && delta < 0;
    var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this.validateWheelTimer !== undefined;

    if (validated) {
      this.clearWheelValidationTimer();
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, VALIDATE_WHEEL_TIMEOUT);
    }

    return validated;
  }

  clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  }

  validateMove(e) {
    if (!this.props.scrollByContent && !isDefined(e.target.closest(".".concat(SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }

    return isDefined(this.allowedDirection());
  }

  onWidgetKeyDown(options) {
    var {
      onKeyDown
    } = this.props;
    var {
      originalEvent
    } = options;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(options);

    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }

    this.keyDownHandler(originalEvent);
    return undefined;
  }

  keyDownHandler(e) {
    var handled = true;

    switch (normalizeKeyName(e)) {
      case KEY_CODES.DOWN:
        this.scrollByLine({
          y: 1
        });
        break;

      case KEY_CODES.UP:
        this.scrollByLine({
          y: -1
        });
        break;

      case KEY_CODES.RIGHT:
        this.scrollByLine({
          x: 1
        });
        break;

      case KEY_CODES.LEFT:
        this.scrollByLine({
          x: -1
        });
        break;

      case KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;

      case KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;

      case KEY_CODES.HOME:
        this.scrollToHome();
        break;

      case KEY_CODES.END:
        this.scrollToEnd();
        break;

      default:
        handled = false;
        break;
    }

    if (handled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  scrollByLine(lines) {
    var devicePixelRatio = this.tryGetDevicePixelRatio();
    var scrollOffset = SCROLL_LINE_HEIGHT;

    if (devicePixelRatio) {
      scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100;
    }

    this.scrollBy({
      top: (lines.y || 0) * scrollOffset,
      left: (lines.x || 0) * scrollOffset
    });
  }

  tryGetDevicePixelRatio() {
    if (hasWindow()) {
      return getWindow().devicePixelRatio;
    }

    return undefined;
  }

  scrollByPage(page) {
    var {
      isVertical
    } = new ScrollDirection(this.wheelDirection());
    var distance = {};
    var {
      clientHeight,
      clientWidth
    } = this.containerElement;

    if (isVertical) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }

    this.scrollBy(distance);
  }

  wheelDirection(e) {
    switch (this.props.direction) {
      case DIRECTION_HORIZONTAL:
        return DIRECTION_HORIZONTAL;

      case DIRECTION_VERTICAL:
        return DIRECTION_VERTICAL;

      default:
        return e !== null && e !== void 0 && e.shiftKey ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL;
    }
  }

  scrollToHome() {
    var distance = {
      [this.direction.isVertical ? "top" : "left"]: 0
    };
    this.scrollTo(distance);
  }

  scrollToEnd() {
    var {
      isVertical
    } = new ScrollDirection(this.wheelDirection());
    var distance = {};

    if (isVertical) {
      distance.top = getScrollTopMax(this.containerElement);
    } else {
      distance.left = getScrollLeftMax(this.containerElement);
    }

    this.scrollTo(distance);
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  }

  get fullScrollInactiveProp() {
    return this.props.direction === DIRECTION_HORIZONTAL ? "scrollTop" : "scrollLeft";
  }

  windowResizeHandler() {
    this.update();
  }

  updateSizes() {
    var containerEl = this.containerElement;
    var contentEl = this.contentRef.current;

    if (isDefined(containerEl)) {
      this.set_containerClientWidth(() => containerEl.clientWidth);
      this.set_containerClientHeight(() => containerEl.clientHeight);
    }

    if (isDefined(contentEl)) {
      this.set_contentClientWidth(() => contentEl.clientWidth);
      this.set_contentClientHeight(() => contentEl.clientHeight);
      this.set_contentScrollWidth(() => contentEl.scrollWidth);
      this.set_contentScrollHeight(() => contentEl.scrollHeight);
    }

    if (this.props.forceGeneratePockets) {
      if (this.props.pullDownEnabled) {
        var topPocketEl = this.topPocketRef.current;

        if (isDefined(topPocketEl)) {
          this.set_topPocketClientHeight(() => topPocketEl.clientHeight);
        }
      }

      if (this.props.reachBottomEnabled) {
        var bottomPocketEl = this.bottomPocketRef.current;

        if (isDefined(bottomPocketEl)) {
          this.set_bottomPocketClientHeight(() => bottomPocketEl.clientHeight);
        }
      }
    }

    if (this.prevContentClientWidth !== this.contentClientWidth || this.prevContainerClientWidth !== this.containerClientWidth) {
      this.set_forceUpdateHScrollbarLocation(() => true);
      this.prevContentClientWidth = this.contentClientWidth;
      this.prevContainerClientWidth = this.containerClientWidth;
      this.set_hScrollLocation(() => -containerEl.scrollLeft);
    }

    if (this.prevContentClientHeight !== this.contentClientHeight || this.prevContainerClientHeight !== this.containerClientHeight) {
      this.set_forceUpdateVScrollbarLocation(() => true);
      this.prevContentClientHeight = this.contentClientHeight;
      this.prevContainerClientHeight = this.containerClientHeight;

      if (this.vScrollLocation <= 0) {
        this.set_vScrollLocation(() => -containerEl.scrollTop);
      }
    }
  }

  get containerElement() {
    return this.containerRef.current;
  }

  get contentWidth() {
    if (!isDefined(this.contentRef) || !isDefined(this.contentRef.current)) {
      return 0;
    }

    var isOverflowHidden = getElementStyle("overflowX", this.contentRef.current) === "hidden";

    if (!isOverflowHidden) {
      var containerScrollSize = this.contentScrollWidth;
      return Math.max(containerScrollSize, this.contentClientWidth);
    }

    return this.contentClientWidth;
  }

  get contentHeight() {
    if (!isDefined(this.contentRef) || !isDefined(this.contentRef.current)) {
      return 0;
    }

    var isOverflowHidden = getElementStyle("overflowY", this.contentRef.current) === "hidden";

    if (!isOverflowHidden) {
      var containerScrollSize = this.contentScrollHeight;
      return Math.max(containerScrollSize, this.contentClientHeight);
    }

    return this.contentClientHeight;
  }

  get scrollableOffset() {
    return getElementOffset(this.scrollableRef.current);
  }

  get contentStyles() {
    return {
      transform: "translate(".concat(this.hContentTranslateOffset, "px, ").concat(this.vContentTranslateOffset, "px)")
    };
  }

  get containerStyles() {
    var touchDirection = this.allowedDirections.vertical ? "pan-x" : "";
    touchDirection = this.allowedDirections.horizontal ? "pan-y" : touchDirection;
    touchDirection = this.allowedDirections.vertical && this.allowedDirections.horizontal ? "none" : touchDirection;
    return {
      touchAction: touchDirection
    };
  }

  get cssClasses() {
    var {
      classes,
      direction,
      disabled,
      showScrollbar
    } = this.props;
    var classesMap = {
      "dx-scrollable dx-scrollable-renovated": true,
      [SCROLLABLE_SIMULATED_CLASS]: true,
      ["dx-scrollable-".concat(direction)]: true,
      [SCROLLABLE_DISABLED_CLASS]: !!disabled,
      [SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE]: showScrollbar === "always",
      [SCROLLABLE_SCROLLBARS_HIDDEN]: !showScrollbar,
      ["".concat(classes)]: !!classes
    };
    return combineClasses(classesMap);
  }

  get direction() {
    return new ScrollDirection(this.props.direction);
  }

  get restAttributes() {
    var _this$props9 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props9, _excluded);

    return restProps;
  }

  content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }

    return this.contentRef.current;
  }

  update() {
    if (!this.props.updateManually) {
      this.updateSizes();
      this.onUpdated();
    }
  }

  refresh() {
    var _this$props$onPullDow2, _this$props10;

    this.set_topPocketState(() => TopPocketState.STATE_READY);
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props10 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props10, {});
  }

  release() {
    this.eventHandler(scrollbar => scrollbar.releaseHandler());
  }

  scrollBy(distance) {
    var location = restoreLocation(distance, this.props.direction);

    if (!location.top && !location.left) {
      return;
    }

    this.update();

    if (this.direction.isVertical) {
      var scrollbar = this.vScrollbarRef.current;
      location.top = scrollbar.boundLocation(location.top + this.vScrollLocation) - this.vScrollLocation;
    }

    if (this.direction.isHorizontal) {
      var _scrollbar = this.hScrollbarRef.current;
      location.left = _scrollbar.boundLocation(location.left + this.hScrollLocation) - this.hScrollLocation;
    }

    this.prepareDirections(true);
    this.onStart();
    this.eventHandler(scrollbar => scrollbar.scrollByHandler({
      x: location.left || 0,
      y: location.top || 0
    }));
    this.onEnd();
  }

  scrollTo(targetLocation) {
    this.update();
    var {
      direction
    } = this.props;
    var distance = getOffsetDistance(targetLocation, direction, this.scrollOffset());
    this.scrollBy(distance);
  }

  scrollToElement(element) {
    if (!isDefined(element)) {
      return;
    }

    var {
      left,
      top
    } = this.scrollOffset();
    element.scrollIntoView({
      block: "nearest",
      inline: "nearest"
    });
    var containerEl = this.containerElement;
    var {
      direction
    } = this.props;
    var distance = getOffsetDistance({
      top,
      left
    }, direction, this.scrollOffset());

    if (!this.direction.isHorizontal) {
      containerEl.scrollLeft += distance.left;
    }

    if (!this.direction.isVertical) {
      containerEl.scrollTop += distance.top;
    }

    this.set_vScrollLocation(() => -containerEl.scrollTop);
    this.set_hScrollLocation(() => -containerEl.scrollLeft);
  }

  getElementLocation(element, direction, offset) {
    var scrollOffset = _extends({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }, offset);

    return getLocation(element, scrollOffset, direction, this.containerElement);
  }

  scrollHeight() {
    return this.content().offsetHeight;
  }

  scrollWidth() {
    return this.content().offsetWidth;
  }

  scrollOffset() {
    var {
      scrollLeft,
      scrollTop
    } = this.containerElement;
    return {
      top: scrollTop,
      left: scrollLeft
    };
  }

  scrollTop() {
    return this.scrollOffset().top;
  }

  scrollLeft() {
    return this.scrollOffset().left;
  }

  clientHeight() {
    return this.containerElement.clientHeight;
  }

  clientWidth() {
    return this.containerElement.clientWidth;
  }

  validate(e) {
    if (this.isLocked()) {
      return false;
    }

    this.update();

    if (this.props.disabled || isDxMouseWheelEvent(e) && isCommandKeyPressed({
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey
    })) {
      return false;
    }

    if (this.props.bounceEnabled) {
      return true;
    }

    return isDxMouseWheelEvent(e) ? this.validateWheel(e) : this.validateMove(e);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      isHovered: this.isHovered,
      scrollableOffsetLeft: this.scrollableOffsetLeft,
      scrollableOffsetTop: this.scrollableOffsetTop,
      containerClientWidth: this.containerClientWidth,
      containerClientHeight: this.containerClientHeight,
      contentScrollWidth: this.contentScrollWidth,
      contentScrollHeight: this.contentScrollHeight,
      contentClientWidth: this.contentClientWidth,
      contentClientHeight: this.contentClientHeight,
      topPocketClientHeight: this.topPocketClientHeight,
      bottomPocketClientHeight: this.bottomPocketClientHeight,
      topPocketState: this.topPocketState,
      isLoadPanelVisible: this.isLoadPanelVisible,
      vScrollLocation: this.vScrollLocation,
      hScrollLocation: this.hScrollLocation,
      vContentTranslateOffset: this.vContentTranslateOffset,
      hContentTranslateOffset: this.hContentTranslateOffset,
      forceUpdateHScrollbarLocation: this.forceUpdateHScrollbarLocation,
      forceUpdateVScrollbarLocation: this.forceUpdateVScrollbarLocation,
      scrollableRef: this.scrollableRef,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      handleScroll: this.handleScroll,
      getEventArgs: this.getEventArgs,
      getInitEventData: this.getInitEventData,
      onStart: this.onStart,
      onEnd: this.onEnd,
      onStop: this.onStop,
      onUpdated: this.onUpdated,
      onBounce: this.onBounce,
      onPullDown: this.onPullDown,
      onRelease: this.onRelease,
      onReachBottom: this.onReachBottom,
      pocketStateChange: this.pocketStateChange,
      scrollLocationChange: this.scrollLocationChange,
      triggerScrollEvent: this.triggerScrollEvent,
      contentTranslateOffsetChange: this.contentTranslateOffsetChange,
      cursorEnterHandler: this.cursorEnterHandler,
      cursorLeaveHandler: this.cursorLeaveHandler,
      handleInit: this.handleInit,
      handleStart: this.handleStart,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      handleCancel: this.handleCancel,
      isCrossThumbScrolling: this.isCrossThumbScrolling,
      adjustDistance: this.adjustDistance,
      suppressDirections: this.suppressDirections,
      validateEvent: this.validateEvent,
      prepareDirections: this.prepareDirections,
      isContent: this.isContent,
      eventHandler: this.eventHandler,
      getDirection: this.getDirection,
      allowedDirection: this.allowedDirection,
      allowedDirections: this.allowedDirections,
      isLocked: this.isLocked,
      validateWheel: this.validateWheel,
      clearWheelValidationTimer: this.clearWheelValidationTimer,
      validateMove: this.validateMove,
      onWidgetKeyDown: this.onWidgetKeyDown,
      keyDownHandler: this.keyDownHandler,
      scrollByLine: this.scrollByLine,
      tryGetDevicePixelRatio: this.tryGetDevicePixelRatio,
      scrollByPage: this.scrollByPage,
      wheelDirection: this.wheelDirection,
      scrollToHome: this.scrollToHome,
      scrollToEnd: this.scrollToEnd,
      lock: this.lock,
      unlock: this.unlock,
      fullScrollInactiveProp: this.fullScrollInactiveProp,
      windowResizeHandler: this.windowResizeHandler,
      updateSizes: this.updateSizes,
      containerElement: this.containerElement,
      contentWidth: this.contentWidth,
      contentHeight: this.contentHeight,
      scrollableOffset: this.scrollableOffset,
      contentStyles: this.contentStyles,
      containerStyles: this.containerStyles,
      cssClasses: this.cssClasses,
      direction: this.direction,
      restAttributes: this.restAttributes
    });
  }

}
ScrollableSimulated.defaultProps = _extends({}, ScrollableSimulatedPropsType);