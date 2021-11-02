import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "defaultPocketState", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onPullDown", "onReachBottom", "onRelease", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { Widget } from "../common/widget";
import { combineClasses } from "../../utils/combine_classes";
import domAdapter from "../../../core/dom_adapter";
import { isDefined } from "../../../core/utils/type";
import { isDxMouseWheelEvent } from "../../../events/utils/index";
import { ScrollbarProps } from "./scrollbar_props";
import { DIRECTION_HORIZONTAL, SCROLLABLE_SCROLLBAR_CLASS, TopPocketState, SCROLLABLE_SCROLL_CLASS, SCROLLABLE_SCROLL_CONTENT_CLASS, HIDE_SCROLLBAR_TIMEOUT, SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, HOVER_ENABLED_STATE } from "./common/consts";
import { dxPointerDown, dxPointerUp } from "../../../events/short";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
import { ScrollableProps } from "./scrollable_props";
var OUT_BOUNDS_ACCELERATION = 0.5;
var THUMB_MIN_SIZE = 15;
export var viewFunction = viewModel => {
  var {
    cssClasses,
    hoverStateEnabled,
    isVisible,
    onHoverEnd,
    onHoverStart,
    props: {
      activeStateEnabled
    },
    scrollRef,
    scrollStyles,
    scrollbarRef
  } = viewModel;
  return createComponentVNode(2, Widget, {
    "rootElementRef": scrollbarRef,
    "classes": cssClasses,
    "activeStateEnabled": activeStateEnabled,
    "hoverStateEnabled": hoverStateEnabled,
    "visible": isVisible,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    children: createVNode(1, "div", viewModel.scrollClasses, createVNode(1, "div", SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": normalizeStyles(scrollStyles)
    }, null, scrollRef)
  });
};
export var ScrollbarPropsType = {
  activeStateEnabled: ScrollbarProps.activeStateEnabled,
  containerSize: ScrollbarProps.containerSize,
  contentSize: ScrollbarProps.contentSize,
  topPocketSize: ScrollbarProps.topPocketSize,
  bottomPocketSize: ScrollbarProps.bottomPocketSize,
  scrollableOffset: ScrollbarProps.scrollableOffset,
  isScrollableHovered: ScrollbarProps.isScrollableHovered,
  forceVisibility: ScrollbarProps.forceVisibility,
  forceUpdateScrollbarLocation: ScrollbarProps.forceUpdateScrollbarLocation,
  scrollLocation: ScrollbarProps.scrollLocation,
  onAnimatorCancel: ScrollbarProps.onAnimatorCancel,
  onPullDown: ScrollbarProps.onPullDown,
  onReachBottom: ScrollbarProps.onReachBottom,
  onRelease: ScrollbarProps.onRelease,
  defaultPocketState: ScrollbarProps.defaultPocketState,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  scrollByThumb: ScrollableProps.scrollByThumb,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled
};
import { createRef as infernoCreateRef } from "inferno";
export class Scrollbar extends InfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
    this.initialTopPocketSize = 0;
    this.scrollbarRef = infernoCreateRef();
    this.scrollRef = infernoCreateRef();
    this.state = {
      showOnScrollByWheel: undefined,
      hovered: false,
      expanded: false,
      visibility: false,
      boundaryOffset: 0,
      maxOffset: 0,
      pocketState: this.props.pocketState !== undefined ? this.props.pocketState : this.props.defaultPocketState
    };
    this.updateBoundaryOffset = this.updateBoundaryOffset.bind(this);
    this.pointerDownEffect = this.pointerDownEffect.bind(this);
    this.pointerUpEffect = this.pointerUpEffect.bind(this);
    this.isThumb = this.isThumb.bind(this);
    this.isScrollbar = this.isScrollbar.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.reachedMin = this.reachedMin.bind(this);
    this.reachedMax = this.reachedMax.bind(this);
    this.inBounds = this.inBounds.bind(this);
    this.boundLocation = this.boundLocation.bind(this);
    this.getMinOffset = this.getMinOffset.bind(this);
    this.getMaxOffset = this.getMaxOffset.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.hide = this.hide.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.onInertiaAnimatorStart = this.onInertiaAnimatorStart.bind(this);
    this.onBounceAnimatorStart = this.onBounceAnimatorStart.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollByHandler = this.scrollByHandler.bind(this);
    this.scrollComplete = this.scrollComplete.bind(this);
    this.pullDownRefreshing = this.pullDownRefreshing.bind(this);
    this.reachBottomLoading = this.reachBottomLoading.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.scrollToBounds = this.scrollToBounds.bind(this);
    this.stopComplete = this.stopComplete.bind(this);
    this.resetThumbScrolling = this.resetThumbScrolling.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.onAnimatorCancel = this.onAnimatorCancel.bind(this);
    this.prepareThumbScrolling = this.prepareThumbScrolling.bind(this);
    this.moveToMouseLocation = this.moveToMouseLocation.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.moveToBoundaryOnSizeChange = this.moveToBoundaryOnSizeChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateContentTranslate = this.updateContentTranslate.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
    this.release = this.release.bind(this);
    this.stateReleased = this.stateReleased.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.setPocketState = this.setPocketState.bind(this);
    this.isPullDown = this.isPullDown.bind(this);
    this.isReachBottom = this.isReachBottom.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateBoundaryOffset, [this.props.forceGeneratePockets, this.props.scrollLocation, this.props.pullDownEnabled, this.props.topPocketSize, this.boundaryOffset]), new InfernoEffect(this.pointerDownEffect, []), new InfernoEffect(this.pointerUpEffect, []), new InfernoEffect(this.moveToBoundaryOnSizeChange, [this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.maxOffset, this.props.scrollLocationChange, this.props.direction, this.props.forceGeneratePockets, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.pullDownEnabled, this.props.topPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.bounceEnabled, this.boundaryOffset, this.__state_pocketState, this.props.pocketStateChange, this.props.onRelease]), new InfernoEffect(this.updateContentTranslate, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.forceGeneratePockets, this.props.scrollLocation, this.props.pullDownEnabled, this.props.topPocketSize, this.boundaryOffset]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([]);
    (_this$_effects$3 = this._effects[2]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([]);
    (_this$_effects$4 = this._effects[3]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.maxOffset, this.props.scrollLocationChange, this.props.direction, this.props.forceGeneratePockets, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.pullDownEnabled, this.props.topPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.bounceEnabled, this.boundaryOffset, this.__state_pocketState, this.props.pocketStateChange, this.props.onRelease]);
    (_this$_effects$5 = this._effects[4]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]);
  }

  get showOnScrollByWheel() {
    var state = this._currentState || this.state;
    return state.showOnScrollByWheel;
  }

  set_showOnScrollByWheel(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        showOnScrollByWheel: newValue
      };
    });
  }

  get hovered() {
    var state = this._currentState || this.state;
    return state.hovered;
  }

  set_hovered(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        hovered: newValue
      };
    });
  }

  get expanded() {
    var state = this._currentState || this.state;
    return state.expanded;
  }

  set_expanded(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        expanded: newValue
      };
    });
  }

  get visibility() {
    var state = this._currentState || this.state;
    return state.visibility;
  }

  set_visibility(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        visibility: newValue
      };
    });
  }

  get boundaryOffset() {
    var state = this._currentState || this.state;
    return state.boundaryOffset;
  }

  set_boundaryOffset(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        boundaryOffset: newValue
      };
    });
  }

  get maxOffset() {
    var state = this._currentState || this.state;
    return state.maxOffset;
  }

  set_maxOffset(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        maxOffset: newValue
      };
    });
  }

  get __state_pocketState() {
    var state = this._currentState || this.state;
    return this.props.pocketState !== undefined ? this.props.pocketState : state.pocketState;
  }

  set_pocketState(value) {
    this.setState(state => {
      var _this$props$pocketSta, _this$props;

      this._currentState = state;
      var newValue = value();
      (_this$props$pocketSta = (_this$props = this.props).pocketStateChange) === null || _this$props$pocketSta === void 0 ? void 0 : _this$props$pocketSta.call(_this$props, newValue);
      this._currentState = null;
      return {
        pocketState: newValue
      };
    });
  }

  updateBoundaryOffset() {
    if (this.props.forceGeneratePockets) {
      this.set_boundaryOffset(() => this.props.scrollLocation - this.topPocketSize);
      this.set_maxOffset(() => this.boundaryOffset > 0 ? this.topPocketSize : 0);
    }
  }

  pointerDownEffect() {
    var namespace = "dxScrollbar";
    dxPointerDown.on(this.scrollRef.current, () => {
      this.expand();
    }, {
      namespace
    });
    return () => dxPointerDown.off(this.scrollRef.current, {
      namespace
    });
  }

  pointerUpEffect() {
    var namespace = "dxScrollbar";
    dxPointerUp.on(domAdapter.getDocument(), () => {
      this.collapse();
    }, {
      namespace
    });
    return () => dxPointerUp.off(this.scrollRef.current, {
      namespace
    });
  }

  moveToBoundaryOnSizeChange() {
    if (this.props.forceUpdateScrollbarLocation) {
      if (this.props.scrollLocation <= this.maxOffset) {
        this.moveTo(this.boundLocation(this.props.scrollLocation));
      }
    }
  }

  updateContentTranslate() {
    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      if (this.initialTopPocketSize !== this.topPocketSize) {
        this.updateContent(this.props.scrollLocation);
        this.initialTopPocketSize = this.topPocketSize;
      }
    }
  }

  get axis() {
    return this.isHorizontal ? "x" : "y";
  }

  get scrollProp() {
    return this.isHorizontal ? "left" : "top";
  }

  get fullScrollProp() {
    return this.isHorizontal ? "scrollLeft" : "scrollTop";
  }

  get dimension() {
    return this.isHorizontal ? "width" : "height";
  }

  get isHorizontal() {
    return this.props.direction === DIRECTION_HORIZONTAL;
  }

  hide() {
    this.set_visibility(() => false);

    if (isDefined(this.showOnScrollByWheel) && this.props.showScrollbar === "onScroll") {
      setTimeout(() => {
        this.set_showOnScrollByWheel(() => undefined);
      }, HIDE_SCROLLBAR_TIMEOUT);
    }
  }

  onInertiaAnimatorStart(velocity) {
    var _this$props$onAnimato, _this$props2;

    (_this$props$onAnimato = (_this$props2 = this.props).onAnimatorStart) === null || _this$props$onAnimato === void 0 ? void 0 : _this$props$onAnimato.call(_this$props2, "inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
  }

  onBounceAnimatorStart() {
    var _this$props$onAnimato2, _this$props3;

    (_this$props$onAnimato2 = (_this$props3 = this.props).onAnimatorStart) === null || _this$props$onAnimato2 === void 0 ? void 0 : _this$props$onAnimato2.call(_this$props3, "bounce");
  }

  pullDownRefreshing() {
    this.setPocketState(TopPocketState.STATE_REFRESHING);
    this.onPullDown();
  }

  reachBottomLoading() {
    this.onReachBottom();
  }

  onPullDown() {
    var _this$props$onPullDow, _this$props4;

    (_this$props$onPullDow = (_this$props4 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props4);
  }

  onReachBottom() {
    var _this$props$onReachBo, _this$props5;

    (_this$props$onReachBo = (_this$props5 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props5);
  }

  scrollToBounds() {
    if (this.inBounds()) {
      this.hide();
      return;
    }

    this.onBounceAnimatorStart();
  }

  resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  }

  scrollBy(delta) {
    var distance = delta[this.axis];

    if (!this.inBounds()) {
      distance *= OUT_BOUNDS_ACCELERATION;
    }

    this.scrollStep(distance);
  }

  stopScrolling() {
    this.hide();
    this.onAnimatorCancel();
  }

  onAnimatorCancel() {
    var _this$props$onAnimato3, _this$props6;

    (_this$props$onAnimato3 = (_this$props6 = this.props).onAnimatorCancel) === null || _this$props$onAnimato3 === void 0 ? void 0 : _this$props$onAnimato3.call(_this$props6);
  }

  prepareThumbScrolling(e, currentCrossThumbScrolling) {
    if (isDxMouseWheelEvent(e.originalEvent)) {
      if (this.props.showScrollbar === "onScroll") {
        this.set_showOnScrollByWheel(() => true);
      }

      return;
    }

    var {
      target
    } = e.originalEvent;
    var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);

    if (scrollbarClicked) {
      this.moveToMouseLocation(e);
    }

    var currentThumbScrolling = scrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
    this.thumbScrolling = currentThumbScrolling;
    this.crossThumbScrolling = !currentThumbScrolling && currentCrossThumbScrolling;

    if (currentThumbScrolling) {
      this.expand();
    }
  }

  moveToMouseLocation(e) {
    var mouseLocation = e["page".concat(this.axis.toUpperCase())] - this.props.scrollableOffset;
    var delta = this.props.scrollLocation + mouseLocation / this.containerToContentRatio - this.props.containerSize / 2;
    this.scrollStep(-Math.round(delta));
  }

  updateContent(location) {
    var _this$props$contentTr, _this$props7;

    var contentTranslateOffset;

    if (location > 0) {
      contentTranslateOffset = location;
    } else if (location <= this.minOffset) {
      contentTranslateOffset = location - this.minOffset;
    } else {
      contentTranslateOffset = location % 1;
    }

    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      contentTranslateOffset -= this.topPocketSize;
    }

    (_this$props$contentTr = (_this$props7 = this.props).contentTranslateOffsetChange) === null || _this$props$contentTr === void 0 ? void 0 : _this$props$contentTr.call(_this$props7, this.scrollProp, contentTranslateOffset);
  }

  release() {
    this.stateReleased();
    this.scrollComplete();
  }

  stateReleased() {
    this.setPocketState(TopPocketState.STATE_RELEASED);
    this.onRelease();
  }

  onRelease() {
    var _this$props$onRelease, _this$props8;

    (_this$props$onRelease = (_this$props8 = this.props).onRelease) === null || _this$props$onRelease === void 0 ? void 0 : _this$props$onRelease.call(_this$props8);
  }

  setPocketState(state) {
    var _this$props$pocketSta2, _this$props9;

    (_this$props$pocketSta2 = (_this$props9 = this.props).pocketStateChange) === null || _this$props$pocketSta2 === void 0 ? void 0 : _this$props$pocketSta2.call(_this$props9, state);
  }

  isPullDown() {
    return this.props.pullDownEnabled && this.props.bounceEnabled && this.boundaryOffset >= 0;
  }

  isReachBottom() {
    return this.props.reachBottomEnabled && this.props.scrollLocation - this.minOffset - this.bottomPocketSize <= 0.5;
  }

  get minOffset() {
    if (this.props.forceGeneratePockets) {
      return -Math.max(this.bottomBoundaryOffset + this.bottomPocketSize, 0);
    }

    return -Math.max(this.bottomBoundaryOffset, 0);
  }

  get scrollSize() {
    return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
  }

  get scrollRatio() {
    if (this.bottomBoundaryOffset) {
      return (this.props.containerSize - this.scrollSize) / this.bottomBoundaryOffset;
    }

    return 1;
  }

  get contentSize() {
    if (this.props.contentSize) {
      return this.props.contentSize - this.bottomPocketSize - this.topPocketSize;
    }

    return 0;
  }

  get containerToContentRatio() {
    return this.contentSize ? this.props.containerSize / this.contentSize : this.props.containerSize;
  }

  expand() {
    this.set_expanded(() => true);
  }

  collapse() {
    this.set_expanded(() => false);
  }

  onHoverStart() {
    if (this.props.showScrollbar === "onHover") {
      this.set_hovered(() => true);
    }
  }

  onHoverEnd() {
    if (this.props.showScrollbar === "onHover") {
      this.set_hovered(() => false);
    }
  }

  get topPocketSize() {
    if (this.props.pullDownEnabled) {
      return this.props.topPocketSize;
    }

    return 0;
  }

  get bottomPocketSize() {
    if (this.props.reachBottomEnabled) {
      return this.props.bottomPocketSize;
    }

    return 0;
  }

  get bottomBoundaryOffset() {
    return this.contentSize - this.props.containerSize;
  }

  get cssClasses() {
    var {
      direction
    } = this.props;
    var classesMap = {
      [SCROLLABLE_SCROLLBAR_CLASS]: true,
      ["dx-scrollbar-".concat(direction)]: true,
      [SCROLLABLE_SCROLLBAR_ACTIVE_CLASS]: !!this.expanded,
      [HOVER_ENABLED_STATE]: !!this.hoverStateEnabled
    };
    return combineClasses(classesMap);
  }

  get scrollStyles() {
    return {
      [this.dimension]: this.scrollSize || THUMB_MIN_SIZE,
      transform: this.scrollTransform
    };
  }

  get scrollTransform() {
    if (this.props.showScrollbar === "never") {
      return "none";
    }

    var translateValue = -this.props.scrollLocation * this.scrollRatio;

    if (this.isHorizontal) {
      return "translate(".concat(translateValue, "px, 0px)");
    }

    return "translate(0px, ".concat(translateValue, "px)");
  }

  get scrollClasses() {
    return combineClasses({
      [SCROLLABLE_SCROLL_CLASS]: true,
      "dx-state-invisible": !this.visible
    });
  }

  get isVisible() {
    return this.props.showScrollbar !== "never" && this.containerToContentRatio < 1;
  }

  get visible() {
    var {
      forceVisibility,
      showScrollbar
    } = this.props;

    if (!this.isVisible) {
      return false;
    }

    if (showScrollbar === "onHover") {
      return this.visibility || this.props.isScrollableHovered || this.hovered;
    }

    if (showScrollbar === "always") {
      return true;
    }

    return forceVisibility || this.visibility || !!this.showOnScrollByWheel;
  }

  get hoverStateEnabled() {
    var {
      scrollByThumb,
      showScrollbar
    } = this.props;
    return (showScrollbar === "onHover" || showScrollbar === "always") && scrollByThumb;
  }

  get restAttributes() {
    var _this$props$pocketSta3 = _extends({}, this.props, {
      pocketState: this.__state_pocketState
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pocketSta3, _excluded);

    return restProps;
  }

  isThumb(element) {
    var _this$scrollbarRef$cu, _this$scrollbarRef$cu2;

    return ((_this$scrollbarRef$cu = this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.querySelector(".".concat(SCROLLABLE_SCROLL_CLASS))) === element || ((_this$scrollbarRef$cu2 = this.scrollbarRef.current) === null || _this$scrollbarRef$cu2 === void 0 ? void 0 : _this$scrollbarRef$cu2.querySelector(".".concat(SCROLLABLE_SCROLL_CONTENT_CLASS))) === element;
  }

  isScrollbar(element) {
    return element === this.scrollbarRef.current;
  }

  validateEvent(e) {
    var {
      target
    } = e.originalEvent;
    return this.isThumb(target) || this.isScrollbar(target);
  }

  reachedMin() {
    return this.props.scrollLocation <= this.minOffset;
  }

  reachedMax() {
    return this.props.scrollLocation >= this.maxOffset;
  }

  inBounds() {
    return this.boundLocation() === this.props.scrollLocation;
  }

  boundLocation(value) {
    var currentLocation = isDefined(value) ? value : this.props.scrollLocation;
    return Math.max(Math.min(currentLocation, this.maxOffset), this.minOffset);
  }

  getMinOffset() {
    return this.minOffset;
  }

  getMaxOffset() {
    return this.maxOffset;
  }

  initHandler(e, crossThumbScrolling) {
    this.stopScrolling();
    this.prepareThumbScrolling(e, crossThumbScrolling);
  }

  startHandler() {
    this.set_visibility(() => true);
  }

  moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    var distance = delta;

    if (this.thumbScrolling) {
      distance[this.axis] = -Math.round(distance[this.axis] / this.containerToContentRatio);
    }

    this.scrollBy(distance);
  }

  endHandler(velocity) {
    this.onInertiaAnimatorStart(velocity[this.axis]);
    this.resetThumbScrolling();
  }

  stopHandler() {
    this.hide();

    if (this.thumbScrolling) {
      this.scrollComplete();
    } else {
      this.scrollToBounds();
    }

    this.resetThumbScrolling();
  }

  scrollByHandler(delta) {
    this.scrollBy(delta);
    this.scrollComplete();
  }

  scrollComplete() {
    if (this.props.forceGeneratePockets) {
      if (this.inBounds()) {
        if (this.__state_pocketState === TopPocketState.STATE_READY) {
          this.pullDownRefreshing();
          return;
        }

        if (this.__state_pocketState === TopPocketState.STATE_LOADING) {
          this.reachBottomLoading();
          return;
        }
      }
    }

    this.scrollToBounds();
  }

  stopComplete() {}

  scrollStep(delta) {
    if (this.props.bounceEnabled) {
      this.moveTo(this.props.scrollLocation + delta);
    } else {
      this.moveTo(this.boundLocation(this.props.scrollLocation + delta));
    }
  }

  moveTo(location) {
    var _this$props$scrollLoc, _this$props10;

    (_this$props$scrollLoc = (_this$props10 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props10, this.fullScrollProp, location);
    this.updateContent(location);

    if (this.props.forceGeneratePockets) {
      if (this.isPullDown()) {
        if (this.__state_pocketState !== TopPocketState.STATE_READY) {
          this.setPocketState(TopPocketState.STATE_READY);
        }
      } else if (this.isReachBottom()) {
        if (this.__state_pocketState !== TopPocketState.STATE_LOADING) {
          this.setPocketState(TopPocketState.STATE_LOADING);
        }
      } else if (this.__state_pocketState !== TopPocketState.STATE_RELEASED) {
        this.stateReleased();
      }
    }
  }

  releaseHandler() {
    this.release();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pocketState: this.__state_pocketState
      }),
      showOnScrollByWheel: this.showOnScrollByWheel,
      hovered: this.hovered,
      expanded: this.expanded,
      visibility: this.visibility,
      boundaryOffset: this.boundaryOffset,
      maxOffset: this.maxOffset,
      scrollbarRef: this.scrollbarRef,
      scrollRef: this.scrollRef,
      axis: this.axis,
      scrollProp: this.scrollProp,
      fullScrollProp: this.fullScrollProp,
      dimension: this.dimension,
      isHorizontal: this.isHorizontal,
      hide: this.hide,
      onInertiaAnimatorStart: this.onInertiaAnimatorStart,
      onBounceAnimatorStart: this.onBounceAnimatorStart,
      pullDownRefreshing: this.pullDownRefreshing,
      reachBottomLoading: this.reachBottomLoading,
      onPullDown: this.onPullDown,
      onReachBottom: this.onReachBottom,
      scrollToBounds: this.scrollToBounds,
      resetThumbScrolling: this.resetThumbScrolling,
      scrollBy: this.scrollBy,
      stopScrolling: this.stopScrolling,
      onAnimatorCancel: this.onAnimatorCancel,
      prepareThumbScrolling: this.prepareThumbScrolling,
      moveToMouseLocation: this.moveToMouseLocation,
      updateContent: this.updateContent,
      release: this.release,
      stateReleased: this.stateReleased,
      onRelease: this.onRelease,
      setPocketState: this.setPocketState,
      isPullDown: this.isPullDown,
      isReachBottom: this.isReachBottom,
      minOffset: this.minOffset,
      scrollSize: this.scrollSize,
      scrollRatio: this.scrollRatio,
      contentSize: this.contentSize,
      containerToContentRatio: this.containerToContentRatio,
      expand: this.expand,
      collapse: this.collapse,
      onHoverStart: this.onHoverStart,
      onHoverEnd: this.onHoverEnd,
      topPocketSize: this.topPocketSize,
      bottomPocketSize: this.bottomPocketSize,
      bottomBoundaryOffset: this.bottomBoundaryOffset,
      cssClasses: this.cssClasses,
      scrollStyles: this.scrollStyles,
      scrollTransform: this.scrollTransform,
      scrollClasses: this.scrollClasses,
      isVisible: this.isVisible,
      visible: this.visible,
      hoverStateEnabled: this.hoverStateEnabled,
      restAttributes: this.restAttributes
    });
  }

}
Scrollbar.defaultProps = _extends({}, ScrollbarPropsType);