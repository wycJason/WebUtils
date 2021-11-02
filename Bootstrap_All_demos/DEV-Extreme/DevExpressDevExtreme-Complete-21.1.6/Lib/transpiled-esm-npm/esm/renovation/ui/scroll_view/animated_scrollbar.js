import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "defaultPocketState", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "inertiaEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onBounce", "onPullDown", "onReachBottom", "onRelease", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { isDefined } from "../../../core/utils/type";
import devices from "../../../core/devices";
import { Scrollbar } from "./scrollbar";
import { requestAnimationFrame, cancelAnimationFrame } from "../../../animation/frame";
import { ScrollbarProps } from "./scrollbar_props";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
import { ScrollableProps } from "./scrollable_props";
export var OUT_BOUNDS_ACCELERATION = 0.5;
var isSluggishPlatform = devices.real().platform === "android";
export var ACCELERATION = isSluggishPlatform ? 0.95 : 0.92;
export var MIN_VELOCITY_LIMIT = 1;
export var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
var FRAME_DURATION = 17;
var BOUNCE_DURATION = isSluggishPlatform ? 300 : 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
export var BOUNCE_ACCELERATION_SUM = (1 - ACCELERATION ** BOUNCE_FRAMES) / (1 - ACCELERATION);
export var viewFunction = viewModel => {
  var {
    cancel,
    props: {
      bottomPocketSize,
      bounceEnabled,
      containerSize,
      contentSize,
      contentTranslateOffsetChange,
      direction,
      forceGeneratePockets,
      forceUpdateScrollbarLocation,
      isScrollableHovered,
      onPullDown,
      onReachBottom,
      onRelease,
      pocketState,
      pocketStateChange,
      pullDownEnabled,
      reachBottomEnabled,
      rtlEnabled,
      scrollByThumb,
      scrollLocation,
      scrollLocationChange,
      scrollableOffset,
      showScrollbar,
      topPocketSize
    },
    scrollbarRef,
    start
  } = viewModel;
  return createComponentVNode(2, Scrollbar, {
    "direction": direction,
    "onAnimatorStart": start,
    "onAnimatorCancel": cancel,
    "scrollableOffset": scrollableOffset,
    "contentSize": contentSize,
    "containerSize": containerSize,
    "isScrollableHovered": isScrollableHovered,
    "scrollLocation": scrollLocation,
    "scrollLocationChange": scrollLocationChange,
    "contentTranslateOffsetChange": contentTranslateOffsetChange,
    "scrollByThumb": scrollByThumb,
    "bounceEnabled": bounceEnabled,
    "showScrollbar": showScrollbar,
    "forceUpdateScrollbarLocation": forceUpdateScrollbarLocation,
    "rtlEnabled": rtlEnabled,
    "forceGeneratePockets": forceGeneratePockets,
    "topPocketSize": topPocketSize,
    "bottomPocketSize": bottomPocketSize,
    "onPullDown": onPullDown,
    "onRelease": onRelease,
    "onReachBottom": onReachBottom,
    "pullDownEnabled": pullDownEnabled,
    "reachBottomEnabled": reachBottomEnabled,
    "pocketState": pocketState,
    "pocketStateChange": pocketStateChange
  }, null, scrollbarRef);
};
export var AnimatedScrollbarProps = _extends({}, ScrollbarProps);
var AnimatedScrollbarPropsType = {
  activeStateEnabled: AnimatedScrollbarProps.activeStateEnabled,
  containerSize: AnimatedScrollbarProps.containerSize,
  contentSize: AnimatedScrollbarProps.contentSize,
  topPocketSize: AnimatedScrollbarProps.topPocketSize,
  bottomPocketSize: AnimatedScrollbarProps.bottomPocketSize,
  scrollableOffset: AnimatedScrollbarProps.scrollableOffset,
  isScrollableHovered: AnimatedScrollbarProps.isScrollableHovered,
  forceVisibility: AnimatedScrollbarProps.forceVisibility,
  forceUpdateScrollbarLocation: AnimatedScrollbarProps.forceUpdateScrollbarLocation,
  scrollLocation: AnimatedScrollbarProps.scrollLocation,
  onAnimatorCancel: AnimatedScrollbarProps.onAnimatorCancel,
  onPullDown: AnimatedScrollbarProps.onPullDown,
  onReachBottom: AnimatedScrollbarProps.onReachBottom,
  onRelease: AnimatedScrollbarProps.onRelease,
  defaultPocketState: AnimatedScrollbarProps.defaultPocketState,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  scrollByThumb: ScrollableProps.scrollByThumb,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled
};
import { createRef as infernoCreateRef } from "inferno";
export class AnimatedScrollbar extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.scrollbarRef = infernoCreateRef();
    this.stepAnimationFrame = 0;
    this.finished = true;
    this.stopped = false;
    this.velocity = 0;
    this.animator = "inertia";
    this.state = {
      pocketState: this.props.pocketState !== undefined ? this.props.pocketState : this.props.defaultPocketState
    };
    this.start = this.start.bind(this);
    this.cancel = this.cancel.bind(this);
    this.stepCore = this.stepCore.bind(this);
    this.getStepAnimationFrame = this.getStepAnimationFrame.bind(this);
    this.step = this.step.bind(this);
    this.setupBounce = this.setupBounce.bind(this);
    this.complete = this.complete.bind(this);
    this.stop = this.stop.bind(this);
    this.suppressInertia = this.suppressInertia.bind(this);
    this.crossBoundOnNextStep = this.crossBoundOnNextStep.bind(this);
    this.inBounds = this.inBounds.bind(this);
    this.getMaxOffset = this.getMaxOffset.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.stopComplete = this.stopComplete.bind(this);
    this.scrollComplete = this.scrollComplete.bind(this);
    this.boundLocation = this.boundLocation.bind(this);
    this.getMinOffset = this.getMinOffset.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.isThumb = this.isThumb.bind(this);
    this.reachedMin = this.reachedMin.bind(this);
    this.reachedMax = this.reachedMax.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollByHandler = this.scrollByHandler.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
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

  start(animatorName, receivedVelocity, thumbScrolling, crossThumbScrolling) {
    this.animator = animatorName;

    if (this.isBounceAnimator) {
      var _this$props$onBounce, _this$props2;

      (_this$props$onBounce = (_this$props2 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props2);
      this.setupBounce();
    } else {
      if (!thumbScrolling && crossThumbScrolling) {
        this.velocity = 0;
      } else {
        this.velocity = receivedVelocity || 0;
      }

      this.suppressInertia(thumbScrolling);
    }

    this.stopped = false;
    this.finished = false;
    this.stepCore();
  }

  cancel() {
    this.stopped = true;
    cancelAnimationFrame(this.stepAnimationFrame);
  }

  stepCore() {
    if (this.stopped) {
      this.stop();
      return;
    }

    if (this.isFinished) {
      this.finished = true;
      this.complete();
      return;
    }

    this.step();
    this.stepAnimationFrame = this.getStepAnimationFrame();
  }

  getStepAnimationFrame() {
    return requestAnimationFrame(this.stepCore);
  }

  step() {
    if (!this.props.bounceEnabled && !this.inBounds()) {
      this.velocity = 0;
    }

    this.scrollStep(this.velocity);
    this.velocity *= this.acceleration;
  }

  setupBounce() {
    var bounceDistance = this.boundLocation() - this.props.scrollLocation;
    this.velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  }

  complete() {
    if (this.isBounceAnimator) {
      this.moveTo(this.boundLocation());
    }

    this.scrollComplete();
  }

  get isBounceAnimator() {
    return this.animator === "bounce";
  }

  get isFinished() {
    if (this.isBounceAnimator) {
      return this.crossBoundOnNextStep() || Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
    }

    return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
  }

  get inProgress() {
    return !(this.stopped || this.finished);
  }

  get acceleration() {
    var _this$scrollbarRef;

    if (!isDefined((_this$scrollbarRef = this.scrollbarRef) === null || _this$scrollbarRef === void 0 ? void 0 : _this$scrollbarRef.current)) {
      return 0;
    }

    return this.inBounds() || this.isBounceAnimator ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
  }

  stop() {
    this.stopComplete();
  }

  suppressInertia(thumbScrolling) {
    if (!this.props.inertiaEnabled || thumbScrolling) {
      this.velocity = 0;
    }
  }

  crossBoundOnNextStep() {
    var location = this.props.scrollLocation;
    var nextLocation = location + this.velocity;
    var minOffset = this.getMinOffset();
    var maxOffset = this.getMaxOffset();
    return location < minOffset && nextLocation >= minOffset || location > maxOffset && nextLocation <= maxOffset;
  }

  inBounds() {
    var scrollbar = this.scrollbarRef.current;

    if (!isDefined(scrollbar)) {
      return false;
    }

    return scrollbar.inBounds();
  }

  getMaxOffset() {
    return this.scrollbar.getMaxOffset();
  }

  scrollStep(delta) {
    this.scrollbar.scrollStep(delta);
  }

  moveTo(location) {
    this.scrollbar.moveTo(location);
  }

  stopComplete() {
    this.scrollbar.stopComplete();
  }

  scrollComplete() {
    this.scrollbar.scrollComplete();
  }

  get scrollbar() {
    return this.scrollbarRef.current;
  }

  get restAttributes() {
    var _this$props$pocketSta2 = _extends({}, this.props, {
      pocketState: this.__state_pocketState
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pocketSta2, _excluded);

    return restProps;
  }

  boundLocation(value) {
    return this.scrollbar.boundLocation(value);
  }

  getMinOffset() {
    return this.scrollbar.getMinOffset();
  }

  validateEvent(e) {
    return this.scrollbar.validateEvent(e);
  }

  isThumb(element) {
    return this.scrollbar.isThumb(element);
  }

  reachedMin() {
    return this.scrollbar.reachedMin();
  }

  reachedMax() {
    return this.scrollbar.reachedMax();
  }

  initHandler(e, crossThumbScrolling) {
    this.scrollbar.initHandler(e, crossThumbScrolling);
  }

  startHandler() {
    this.scrollbar.startHandler();
  }

  moveHandler(delta) {
    this.scrollbar.moveHandler(delta);
  }

  endHandler(velocity) {
    this.scrollbar.endHandler(velocity);
  }

  stopHandler() {
    this.scrollbar.stopHandler();
  }

  scrollByHandler(delta) {
    this.scrollbar.scrollByHandler(delta);
  }

  releaseHandler() {
    this.scrollbar.releaseHandler();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pocketState: this.__state_pocketState
      }),
      scrollbarRef: this.scrollbarRef,
      start: this.start,
      cancel: this.cancel,
      stepCore: this.stepCore,
      getStepAnimationFrame: this.getStepAnimationFrame,
      step: this.step,
      setupBounce: this.setupBounce,
      complete: this.complete,
      isBounceAnimator: this.isBounceAnimator,
      isFinished: this.isFinished,
      inProgress: this.inProgress,
      acceleration: this.acceleration,
      stop: this.stop,
      suppressInertia: this.suppressInertia,
      crossBoundOnNextStep: this.crossBoundOnNextStep,
      inBounds: this.inBounds,
      getMaxOffset: this.getMaxOffset,
      scrollStep: this.scrollStep,
      moveTo: this.moveTo,
      stopComplete: this.stopComplete,
      scrollComplete: this.scrollComplete,
      scrollbar: this.scrollbar,
      restAttributes: this.restAttributes
    });
  }

}
AnimatedScrollbar.defaultProps = _extends({}, AnimatedScrollbarPropsType);