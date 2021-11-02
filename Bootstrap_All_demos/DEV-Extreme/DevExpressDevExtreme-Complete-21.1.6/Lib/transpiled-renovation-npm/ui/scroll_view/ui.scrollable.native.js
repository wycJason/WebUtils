"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _index = require("../../events/utils/index");

var _common = require("../../core/utils/common");

var _iterator = require("../../core/utils/iterator");

var _devices = _interopRequireDefault(require("../../core/devices"));

var _class = _interopRequireDefault(require("../../core/class"));

var _ui = _interopRequireDefault(require("./ui.scrollbar"));

var _scroll_rtl_behavior = _interopRequireDefault(require("../../core/utils/scroll_rtl_behavior"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCROLLABLE_NATIVE = 'dxNativeScrollable';
var SCROLLABLE_NATIVE_CLASS = 'dx-scrollable-native';
var SCROLLABLE_SCROLLBAR_SIMULATED = 'dx-scrollable-scrollbar-simulated';
var SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
var VERTICAL = 'vertical';
var HORIZONTAL = 'horizontal';
var HIDE_SCROLLBAR_TIMEOUT = 500;

var NativeStrategy = _class.default.inherit({
  ctor: function ctor(scrollable) {
    this._init(scrollable);
  },
  _init: function _init(scrollable) {
    this._component = scrollable;
    this._$element = scrollable.$element();
    this._$container = (0, _renderer.default)(scrollable.container());
    this._$content = scrollable.$content();
    this._direction = scrollable.option('direction');
    this._useSimulatedScrollbar = scrollable.option('useSimulatedScrollbar');
    this.option = scrollable.option.bind(scrollable);
    this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
    this._isLocked = scrollable._isLocked.bind(scrollable);
    this._isDirection = scrollable._isDirection.bind(scrollable);
    this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
    this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
    this._isScrollInverted = scrollable._isScrollInverted.bind(scrollable);
  },
  render: function render() {
    var device = _devices.default.real();

    var deviceType = device.platform;

    this._$element.addClass(SCROLLABLE_NATIVE_CLASS).addClass(SCROLLABLE_NATIVE_CLASS + '-' + deviceType).toggleClass(SCROLLABLE_SCROLLBARS_HIDDEN, !this._isScrollbarVisible());

    if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
      this._renderScrollbars();
    }
  },
  updateRtlPosition: function updateRtlPosition(isFirstRender) {
    if (isFirstRender && this.option('rtlEnabled')) {
      if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
        this._moveScrollbars();
      }
    }
  },
  _renderScrollbars: function _renderScrollbars() {
    this._scrollbars = {};
    this._hideScrollbarTimeout = 0;

    this._$element.addClass(SCROLLABLE_SCROLLBAR_SIMULATED);

    this._renderScrollbar(VERTICAL);

    this._renderScrollbar(HORIZONTAL);
  },
  _renderScrollbar: function _renderScrollbar(direction) {
    if (!this._isDirection(direction)) {
      return;
    }

    this._scrollbars[direction] = new _ui.default((0, _renderer.default)('<div>').appendTo(this._$element), {
      direction: direction,
      expandable: this._component.option('scrollByThumb')
    });
  },
  handleInit: _common.noop,
  handleStart: _common.noop,
  handleMove: function handleMove(e) {
    if (this._isLocked()) {
      e.cancel = true;
      return;
    }

    if (this._allowedDirection()) {
      e.originalEvent.isScrollingEvent = true;
    }
  },
  handleEnd: _common.noop,
  handleCancel: _common.noop,
  handleStop: _common.noop,
  _eachScrollbar: function _eachScrollbar(callback) {
    callback = callback.bind(this);
    (0, _iterator.each)(this._scrollbars || {}, function (direction, scrollbar) {
      callback(scrollbar, direction);
    });
  },
  createActions: function createActions() {
    this._scrollAction = this._createActionByOption('onScroll');
    this._updateAction = this._createActionByOption('onUpdated');
  },
  _createActionArgs: function _createActionArgs() {
    var _this$location = this.location(),
        left = _this$location.left,
        top = _this$location.top;

    return {
      event: this._eventForUserAction,
      scrollOffset: this._getScrollOffset(),
      reachedLeft: this._isScrollInverted() ? this._isReachedRight(-left) : this._isReachedLeft(left),
      reachedRight: this._isScrollInverted() ? this._isReachedLeft(-Math.abs(left)) : this._isReachedRight(left),
      reachedTop: this._isDirection(VERTICAL) ? top >= 0 : undefined,
      reachedBottom: this._isDirection(VERTICAL) ? Math.abs(top) >= this._getMaxOffset().top : undefined
    };
  },
  _getScrollOffset: function _getScrollOffset() {
    var _this$location2 = this.location(),
        top = _this$location2.top,
        left = _this$location2.left;

    return {
      top: -top,
      left: this._normalizeOffsetLeft(-left)
    };
  },
  _normalizeOffsetLeft: function _normalizeOffsetLeft(scrollLeft) {
    if (this._isScrollInverted()) {
      if ((0, _scroll_rtl_behavior.default)().positive) {
        // for ie11 support
        return this._getMaxOffset().left - scrollLeft;
      }

      return this._getMaxOffset().left + scrollLeft;
    }

    return scrollLeft;
  },
  _isReachedLeft: function _isReachedLeft(left) {
    return this._isDirection(HORIZONTAL) ? left >= 0 : undefined;
  },
  _isReachedRight: function _isReachedRight(left) {
    return this._isDirection(HORIZONTAL) ? Math.abs(left) >= this._getMaxOffset().left : undefined;
  },
  _isScrollbarVisible: function _isScrollbarVisible() {
    var _this$option = this.option(),
        showScrollbar = _this$option.showScrollbar;

    return showScrollbar !== 'never' && showScrollbar !== false;
  },
  handleScroll: function handleScroll(e) {
    this._eventForUserAction = e;

    this._moveScrollbars();

    this._scrollAction(this._createActionArgs());
  },
  _moveScrollbars: function _moveScrollbars() {
    var _this$_getScrollOffse = this._getScrollOffset(),
        top = _this$_getScrollOffse.top,
        left = _this$_getScrollOffse.left;

    this._eachScrollbar(function (scrollbar) {
      scrollbar.moveTo({
        top: -top,
        left: -left
      });
      scrollbar.option('visible', true);
    });

    this._hideScrollbars();
  },
  _hideScrollbars: function _hideScrollbars() {
    clearTimeout(this._hideScrollbarTimeout);
    this._hideScrollbarTimeout = setTimeout(function () {
      this._eachScrollbar(function (scrollbar) {
        scrollbar.option('visible', false);
      });
    }.bind(this), HIDE_SCROLLBAR_TIMEOUT);
  },
  location: function location() {
    return {
      left: -this._$container.scrollLeft(),
      top: -this._$container.scrollTop()
    };
  },
  disabledChanged: _common.noop,
  update: function update() {
    this._update();

    this._updateAction(this._createActionArgs());
  },
  _update: function _update() {
    this._updateDimensions();

    this._updateScrollbars();
  },
  _updateDimensions: function _updateDimensions() {
    this._containerSize = {
      height: this._$container.height(),
      width: this._$container.width()
    };
    this._componentContentSize = {
      height: this._component.$content().height(),
      width: this._component.$content().width()
    };
    this._contentSize = {
      height: this._$content.height(),
      width: this._$content.width()
    };
  },
  _updateScrollbars: function _updateScrollbars() {
    this._eachScrollbar(function (scrollbar, direction) {
      var dimension = direction === VERTICAL ? 'height' : 'width';
      scrollbar.option({
        containerSize: this._containerSize[dimension],
        contentSize: this._componentContentSize[dimension]
      });
      scrollbar.update();
    });
  },
  _allowedDirections: function _allowedDirections() {
    return {
      vertical: this._isDirection(VERTICAL) && this._contentSize.height > this._containerSize.height,
      horizontal: this._isDirection(HORIZONTAL) && this._contentSize.width > this._containerSize.width
    };
  },
  dispose: function dispose() {
    var className = this._$element.get(0).className;

    var scrollableNativeRegexp = new RegExp(SCROLLABLE_NATIVE_CLASS + '\\S*', 'g');

    if (scrollableNativeRegexp.test(className)) {
      this._$element.removeClass(className.match(scrollableNativeRegexp).join(' '));
    }

    _events_engine.default.off(this._$element, '.' + SCROLLABLE_NATIVE);

    _events_engine.default.off(this._$container, '.' + SCROLLABLE_NATIVE);

    this._removeScrollbars();

    clearTimeout(this._hideScrollbarTimeout);
  },
  _removeScrollbars: function _removeScrollbars() {
    this._eachScrollbar(function (scrollbar) {
      scrollbar.$element().remove();
    });
  },
  scrollBy: function scrollBy(distance) {
    var location = this.location();

    this._$container.scrollTop(Math.round(-location.top - distance.top));

    this._$container.scrollLeft(Math.round(-location.left - this._getScrollSign() * distance.left));
  },
  _getScrollSign: function _getScrollSign() {
    return this._isScrollInverted() && (0, _scroll_rtl_behavior.default)().positive ? -1 : 1;
  },
  validate: function validate(e) {
    if (this.option('disabled')) {
      return false;
    }

    if ((0, _index.isDxMouseWheelEvent)(e) && this._isScrolledInMaxDirection(e)) {
      return false;
    }

    return !!this._allowedDirection();
  },
  // TODO: rtl
  // TODO: horizontal scroll when shift is pressed
  _isScrolledInMaxDirection: function _isScrolledInMaxDirection(e) {
    var container = this._$container.get(0);

    var result;

    if (e.delta > 0) {
      result = e.shiftKey ? !container.scrollLeft : !container.scrollTop;
    } else {
      if (e.shiftKey) {
        result = container.scrollLeft >= this._getMaxOffset().left;
      } else {
        result = container.scrollTop >= this._getMaxOffset().top;
      }
    }

    return result;
  },
  getDirection: function getDirection() {
    return this._allowedDirection();
  }
});

var _default = NativeStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;