"use strict";

exports.AnimatedScrollbar = exports.AnimatedScrollbarProps = exports.viewFunction = exports.BOUNCE_ACCELERATION_SUM = exports.BOUNCE_MIN_VELOCITY_LIMIT = exports.MIN_VELOCITY_LIMIT = exports.ACCELERATION = exports.OUT_BOUNDS_ACCELERATION = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _type = require("../../../core/utils/type");

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _scrollbar = require("./scrollbar");

var _frame = require("../../../animation/frame");

var _scrollbar_props = require("./scrollbar_props");

var _scrollable_simulated_props = require("./scrollable_simulated_props");

var _scrollable_props = require("./scrollable_props");

var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "defaultPocketState", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "inertiaEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onBounce", "onPullDown", "onReachBottom", "onRelease", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var OUT_BOUNDS_ACCELERATION = 0.5;
exports.OUT_BOUNDS_ACCELERATION = OUT_BOUNDS_ACCELERATION;
var isSluggishPlatform = _devices.default.real().platform === "android";
var ACCELERATION = isSluggishPlatform ? 0.95 : 0.92;
exports.ACCELERATION = ACCELERATION;
var MIN_VELOCITY_LIMIT = 1;
exports.MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT;
var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
exports.BOUNCE_MIN_VELOCITY_LIMIT = BOUNCE_MIN_VELOCITY_LIMIT;
var FRAME_DURATION = 17;
var BOUNCE_DURATION = isSluggishPlatform ? 300 : 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
var BOUNCE_ACCELERATION_SUM = (1 - Math.pow(ACCELERATION, BOUNCE_FRAMES)) / (1 - ACCELERATION);
exports.BOUNCE_ACCELERATION_SUM = BOUNCE_ACCELERATION_SUM;

var viewFunction = function viewFunction(viewModel) {
  var cancel = viewModel.cancel,
      _viewModel$props = viewModel.props,
      bottomPocketSize = _viewModel$props.bottomPocketSize,
      bounceEnabled = _viewModel$props.bounceEnabled,
      containerSize = _viewModel$props.containerSize,
      contentSize = _viewModel$props.contentSize,
      contentTranslateOffsetChange = _viewModel$props.contentTranslateOffsetChange,
      direction = _viewModel$props.direction,
      forceGeneratePockets = _viewModel$props.forceGeneratePockets,
      forceUpdateScrollbarLocation = _viewModel$props.forceUpdateScrollbarLocation,
      isScrollableHovered = _viewModel$props.isScrollableHovered,
      onPullDown = _viewModel$props.onPullDown,
      onReachBottom = _viewModel$props.onReachBottom,
      onRelease = _viewModel$props.onRelease,
      pocketState = _viewModel$props.pocketState,
      pocketStateChange = _viewModel$props.pocketStateChange,
      pullDownEnabled = _viewModel$props.pullDownEnabled,
      reachBottomEnabled = _viewModel$props.reachBottomEnabled,
      rtlEnabled = _viewModel$props.rtlEnabled,
      scrollByThumb = _viewModel$props.scrollByThumb,
      scrollLocation = _viewModel$props.scrollLocation,
      scrollLocationChange = _viewModel$props.scrollLocationChange,
      scrollableOffset = _viewModel$props.scrollableOffset,
      showScrollbar = _viewModel$props.showScrollbar,
      topPocketSize = _viewModel$props.topPocketSize,
      scrollbarRef = viewModel.scrollbarRef,
      start = viewModel.start;
  return (0, _inferno.createComponentVNode)(2, _scrollbar.Scrollbar, {
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

exports.viewFunction = viewFunction;

var AnimatedScrollbarProps = _extends({}, _scrollbar_props.ScrollbarProps);

exports.AnimatedScrollbarProps = AnimatedScrollbarProps;
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
  direction: _scrollable_props.ScrollableProps.direction,
  showScrollbar: _scrollable_props.ScrollableProps.showScrollbar,
  scrollByThumb: _scrollable_props.ScrollableProps.scrollByThumb,
  pullDownEnabled: _scrollable_props.ScrollableProps.pullDownEnabled,
  reachBottomEnabled: _scrollable_props.ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: _scrollable_props.ScrollableProps.forceGeneratePockets,
  inertiaEnabled: _scrollable_simulated_props.ScrollableSimulatedProps.inertiaEnabled,
  bounceEnabled: _scrollable_simulated_props.ScrollableSimulatedProps.bounceEnabled
};

var AnimatedScrollbar = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AnimatedScrollbar, _BaseInfernoComponent);

  function AnimatedScrollbar(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.scrollbarRef = (0, _inferno.createRef)();
    _this.stepAnimationFrame = 0;
    _this.finished = true;
    _this.stopped = false;
    _this.velocity = 0;
    _this.animator = "inertia";
    _this.state = {
      pocketState: _this.props.pocketState !== undefined ? _this.props.pocketState : _this.props.defaultPocketState
    };
    _this.start = _this.start.bind(_assertThisInitialized(_this));
    _this.cancel = _this.cancel.bind(_assertThisInitialized(_this));
    _this.stepCore = _this.stepCore.bind(_assertThisInitialized(_this));
    _this.getStepAnimationFrame = _this.getStepAnimationFrame.bind(_assertThisInitialized(_this));
    _this.step = _this.step.bind(_assertThisInitialized(_this));
    _this.setupBounce = _this.setupBounce.bind(_assertThisInitialized(_this));
    _this.complete = _this.complete.bind(_assertThisInitialized(_this));
    _this.stop = _this.stop.bind(_assertThisInitialized(_this));
    _this.suppressInertia = _this.suppressInertia.bind(_assertThisInitialized(_this));
    _this.crossBoundOnNextStep = _this.crossBoundOnNextStep.bind(_assertThisInitialized(_this));
    _this.inBounds = _this.inBounds.bind(_assertThisInitialized(_this));
    _this.getMaxOffset = _this.getMaxOffset.bind(_assertThisInitialized(_this));
    _this.scrollStep = _this.scrollStep.bind(_assertThisInitialized(_this));
    _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_this));
    _this.stopComplete = _this.stopComplete.bind(_assertThisInitialized(_this));
    _this.scrollComplete = _this.scrollComplete.bind(_assertThisInitialized(_this));
    _this.boundLocation = _this.boundLocation.bind(_assertThisInitialized(_this));
    _this.getMinOffset = _this.getMinOffset.bind(_assertThisInitialized(_this));
    _this.validateEvent = _this.validateEvent.bind(_assertThisInitialized(_this));
    _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
    _this.reachedMin = _this.reachedMin.bind(_assertThisInitialized(_this));
    _this.reachedMax = _this.reachedMax.bind(_assertThisInitialized(_this));
    _this.initHandler = _this.initHandler.bind(_assertThisInitialized(_this));
    _this.startHandler = _this.startHandler.bind(_assertThisInitialized(_this));
    _this.moveHandler = _this.moveHandler.bind(_assertThisInitialized(_this));
    _this.endHandler = _this.endHandler.bind(_assertThisInitialized(_this));
    _this.stopHandler = _this.stopHandler.bind(_assertThisInitialized(_this));
    _this.scrollByHandler = _this.scrollByHandler.bind(_assertThisInitialized(_this));
    _this.releaseHandler = _this.releaseHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AnimatedScrollbar.prototype;

  _proto.set_pocketState = function set_pocketState(value) {
    var _this2 = this;

    this.setState(function (state) {
      var _this2$props$pocketSt, _this2$props;

      _this2._currentState = state;
      var newValue = value();
      (_this2$props$pocketSt = (_this2$props = _this2.props).pocketStateChange) === null || _this2$props$pocketSt === void 0 ? void 0 : _this2$props$pocketSt.call(_this2$props, newValue);
      _this2._currentState = null;
      return {
        pocketState: newValue
      };
    });
  };

  _proto.start = function start(animatorName, receivedVelocity, thumbScrolling, crossThumbScrolling) {
    this.animator = animatorName;

    if (this.isBounceAnimator) {
      var _this$props$onBounce, _this$props;

      (_this$props$onBounce = (_this$props = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props);
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
  };

  _proto.cancel = function cancel() {
    this.stopped = true;
    (0, _frame.cancelAnimationFrame)(this.stepAnimationFrame);
  };

  _proto.stepCore = function stepCore() {
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
  };

  _proto.getStepAnimationFrame = function getStepAnimationFrame() {
    return (0, _frame.requestAnimationFrame)(this.stepCore);
  };

  _proto.step = function step() {
    if (!this.props.bounceEnabled && !this.inBounds()) {
      this.velocity = 0;
    }

    this.scrollStep(this.velocity);
    this.velocity *= this.acceleration;
  };

  _proto.setupBounce = function setupBounce() {
    var bounceDistance = this.boundLocation() - this.props.scrollLocation;
    this.velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  };

  _proto.complete = function complete() {
    if (this.isBounceAnimator) {
      this.moveTo(this.boundLocation());
    }

    this.scrollComplete();
  };

  _proto.stop = function stop() {
    this.stopComplete();
  };

  _proto.suppressInertia = function suppressInertia(thumbScrolling) {
    if (!this.props.inertiaEnabled || thumbScrolling) {
      this.velocity = 0;
    }
  };

  _proto.crossBoundOnNextStep = function crossBoundOnNextStep() {
    var location = this.props.scrollLocation;
    var nextLocation = location + this.velocity;
    var minOffset = this.getMinOffset();
    var maxOffset = this.getMaxOffset();
    return location < minOffset && nextLocation >= minOffset || location > maxOffset && nextLocation <= maxOffset;
  };

  _proto.inBounds = function inBounds() {
    var scrollbar = this.scrollbarRef.current;

    if (!(0, _type.isDefined)(scrollbar)) {
      return false;
    }

    return scrollbar.inBounds();
  };

  _proto.getMaxOffset = function getMaxOffset() {
    return this.scrollbar.getMaxOffset();
  };

  _proto.scrollStep = function scrollStep(delta) {
    this.scrollbar.scrollStep(delta);
  };

  _proto.moveTo = function moveTo(location) {
    this.scrollbar.moveTo(location);
  };

  _proto.stopComplete = function stopComplete() {
    this.scrollbar.stopComplete();
  };

  _proto.scrollComplete = function scrollComplete() {
    this.scrollbar.scrollComplete();
  };

  _proto.boundLocation = function boundLocation(value) {
    return this.scrollbar.boundLocation(value);
  };

  _proto.getMinOffset = function getMinOffset() {
    return this.scrollbar.getMinOffset();
  };

  _proto.validateEvent = function validateEvent(e) {
    return this.scrollbar.validateEvent(e);
  };

  _proto.isThumb = function isThumb(element) {
    return this.scrollbar.isThumb(element);
  };

  _proto.reachedMin = function reachedMin() {
    return this.scrollbar.reachedMin();
  };

  _proto.reachedMax = function reachedMax() {
    return this.scrollbar.reachedMax();
  };

  _proto.initHandler = function initHandler(e, crossThumbScrolling) {
    this.scrollbar.initHandler(e, crossThumbScrolling);
  };

  _proto.startHandler = function startHandler() {
    this.scrollbar.startHandler();
  };

  _proto.moveHandler = function moveHandler(delta) {
    this.scrollbar.moveHandler(delta);
  };

  _proto.endHandler = function endHandler(velocity) {
    this.scrollbar.endHandler(velocity);
  };

  _proto.stopHandler = function stopHandler() {
    this.scrollbar.stopHandler();
  };

  _proto.scrollByHandler = function scrollByHandler(delta) {
    this.scrollbar.scrollByHandler(delta);
  };

  _proto.releaseHandler = function releaseHandler() {
    this.scrollbar.releaseHandler();
  };

  _proto.render = function render() {
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
  };

  _createClass(AnimatedScrollbar, [{
    key: "__state_pocketState",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pocketState !== undefined ? this.props.pocketState : state.pocketState;
    }
  }, {
    key: "isBounceAnimator",
    get: function get() {
      return this.animator === "bounce";
    }
  }, {
    key: "isFinished",
    get: function get() {
      if (this.isBounceAnimator) {
        return this.crossBoundOnNextStep() || Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
      }

      return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
    }
  }, {
    key: "inProgress",
    get: function get() {
      return !(this.stopped || this.finished);
    }
  }, {
    key: "acceleration",
    get: function get() {
      var _this$scrollbarRef;

      if (!(0, _type.isDefined)((_this$scrollbarRef = this.scrollbarRef) === null || _this$scrollbarRef === void 0 ? void 0 : _this$scrollbarRef.current)) {
        return 0;
      }

      return this.inBounds() || this.isBounceAnimator ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
    }
  }, {
    key: "scrollbar",
    get: function get() {
      return this.scrollbarRef.current;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$pocketSta = _extends({}, this.props, {
        pocketState: this.__state_pocketState
      }),
          activeStateEnabled = _this$props$pocketSta.activeStateEnabled,
          bottomPocketSize = _this$props$pocketSta.bottomPocketSize,
          bounceEnabled = _this$props$pocketSta.bounceEnabled,
          containerSize = _this$props$pocketSta.containerSize,
          contentSize = _this$props$pocketSta.contentSize,
          contentTranslateOffsetChange = _this$props$pocketSta.contentTranslateOffsetChange,
          defaultPocketState = _this$props$pocketSta.defaultPocketState,
          direction = _this$props$pocketSta.direction,
          forceGeneratePockets = _this$props$pocketSta.forceGeneratePockets,
          forceUpdateScrollbarLocation = _this$props$pocketSta.forceUpdateScrollbarLocation,
          forceVisibility = _this$props$pocketSta.forceVisibility,
          hoverStateEnabled = _this$props$pocketSta.hoverStateEnabled,
          inertiaEnabled = _this$props$pocketSta.inertiaEnabled,
          isScrollableHovered = _this$props$pocketSta.isScrollableHovered,
          onAnimatorCancel = _this$props$pocketSta.onAnimatorCancel,
          onAnimatorStart = _this$props$pocketSta.onAnimatorStart,
          onBounce = _this$props$pocketSta.onBounce,
          onPullDown = _this$props$pocketSta.onPullDown,
          onReachBottom = _this$props$pocketSta.onReachBottom,
          onRelease = _this$props$pocketSta.onRelease,
          pocketState = _this$props$pocketSta.pocketState,
          pocketStateChange = _this$props$pocketSta.pocketStateChange,
          pullDownEnabled = _this$props$pocketSta.pullDownEnabled,
          reachBottomEnabled = _this$props$pocketSta.reachBottomEnabled,
          rtlEnabled = _this$props$pocketSta.rtlEnabled,
          scrollByThumb = _this$props$pocketSta.scrollByThumb,
          scrollLocation = _this$props$pocketSta.scrollLocation,
          scrollLocationChange = _this$props$pocketSta.scrollLocationChange,
          scrollableOffset = _this$props$pocketSta.scrollableOffset,
          showScrollbar = _this$props$pocketSta.showScrollbar,
          topPocketSize = _this$props$pocketSta.topPocketSize,
          restProps = _objectWithoutProperties(_this$props$pocketSta, _excluded);

      return restProps;
    }
  }]);

  return AnimatedScrollbar;
}(_vdom.BaseInfernoComponent);

exports.AnimatedScrollbar = AnimatedScrollbar;
AnimatedScrollbar.defaultProps = _extends({}, AnimatedScrollbarPropsType);