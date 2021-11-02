"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _common = require("../../core/utils/common");

var _window = require("../../core/utils/window");

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _dom_component = _interopRequireDefault(require("../../core/dom_component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCROLLABLE = 'dxScrollable';
var SCROLLABLE_STRATEGY = 'dxScrollableStrategy';
var SCROLLABLE_CLASS = 'dx-scrollable';
var SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
var VERTICAL = 'vertical';
var HORIZONTAL = 'horizontal';

var Scrollable = _dom_component.default.inherit({
  _getWindowDevicePixelRatio: function _getWindowDevicePixelRatio() {
    return (0, _window.hasWindow)() ? (0, _window.getWindow)().devicePixelRatio : 1;
  },
  _dimensionChanged: function _dimensionChanged() {
    this._updateRtlPosition();
  },
  _render: function _render() {
    this._renderDisabledState();

    this.update();
    this.callBase();
    this._rtlConfig = {
      scrollRight: 0,
      clientWidth: this._container().get(0).clientWidth,
      windowPixelRatio: this._getWindowDevicePixelRatio()
    };

    this._updateRtlPosition();
  },
  _isHorizontalAndRtlEnabled: function _isHorizontalAndRtlEnabled() {
    return this.option('rtlEnabled') && this.option('direction') !== VERTICAL;
  },
  _updateRtlPosition: function _updateRtlPosition() {
    var _this = this;

    this._updateBounds();

    if (this._isHorizontalAndRtlEnabled()) {
      (0, _common.deferUpdate)(function () {
        var scrollLeft = _this._getMaxOffset().left - _this._rtlConfig.scrollRight;

        if (scrollLeft <= 0) {
          scrollLeft = 0;
          _this._rtlConfig.scrollRight = _this._getMaxOffset().left;
        }

        (0, _common.deferRender)(function () {
          if (_this.scrollLeft() !== scrollLeft) {
            _this._rtlConfig.skipUpdating = true;

            _this.scrollTo({
              left: scrollLeft
            });

            _this._rtlConfig.skipUpdating = false;
          }
        });
      });
    }
  },
  _getMaxOffset: function _getMaxOffset() {
    var _this$_container$get = this._container().get(0),
        scrollWidth = _this$_container$get.scrollWidth,
        clientWidth = _this$_container$get.clientWidth,
        scrollHeight = _this$_container$get.scrollHeight,
        clientHeight = _this$_container$get.clientHeight;

    return {
      left: scrollWidth - clientWidth,
      top: scrollHeight - clientHeight
    };
  },
  _updateRtlConfig: function _updateRtlConfig() {
    if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
      var _this$_container$get2 = this._container().get(0),
          clientWidth = _this$_container$get2.clientWidth,
          scrollLeft = _this$_container$get2.scrollLeft;

      var windowPixelRatio = this._getWindowDevicePixelRatio();

      if (this._rtlConfig.windowPixelRatio === windowPixelRatio && this._rtlConfig.clientWidth === clientWidth) {
        this._rtlConfig.scrollRight = this._getMaxOffset().left - scrollLeft;
      }

      this._rtlConfig.clientWidth = clientWidth;
      this._rtlConfig.windowPixelRatio = windowPixelRatio;
    }
  },
  _renderStrategy: function _renderStrategy() {
    this.$element().data(SCROLLABLE_STRATEGY, this._strategy);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'onStart':
      case 'onEnd':
      case 'onStop':
      case 'onUpdated':
      case 'onScroll':
      case 'onBounce':
        this._createActions();

        break;

      case 'direction':
        this._resetInactiveDirection();

        this._invalidate();

        break;

      case 'useNative':
        this._setUseSimulatedScrollbar();

        this._invalidate();

        break;

      case 'inertiaEnabled':
      case 'scrollByContent':
      case 'scrollByThumb':
      case 'bounceEnabled':
      case 'useKeyboard':
      case 'showScrollbar':
      case 'useSimulatedScrollbar':
      case 'pushBackValue':
        this._invalidate();

        break;

      case 'disabled':
        this._renderDisabledState();

        this._strategy && this._strategy.disabledChanged();
        break;

      case 'updateManually':
        break;

      case 'width':
        this.callBase(args);

        this._updateRtlPosition();

        break;

      default:
        this.callBase(args);
    }
  },
  scrollBy: function scrollBy(distance) {
    distance = this._normalizeLocation(distance);

    if (!distance.top && !distance.left) {
      return;
    }

    this._updateIfNeed();

    this._strategy.scrollBy(distance);

    this._updateRtlConfig();
  },
  scrollTo: function scrollTo(targetLocation) {
    targetLocation = this._normalizeLocation(targetLocation);

    this._updateIfNeed();

    var location = this._location();

    var distance = this._normalizeLocation({
      left: (0, _common.ensureDefined)(targetLocation.left, location.left) - location.top,
      top: (0, _common.ensureDefined)(targetLocation.top, location.top) - location.left
    });

    if (!distance.top && !distance.left) {
      return;
    }

    this._strategy.scrollBy(distance);

    this._updateRtlConfig();
  },
  scrollToElementTopLeft: function scrollToElementTopLeft(element) {
    var $element = (0, _renderer.default)(element);
    var elementInsideContent = this.$content().find(element).length;
    var elementIsInsideContent = $element.parents('.' + SCROLLABLE_CLASS).length - $element.parents('.' + SCROLLABLE_CONTENT_CLASS).length === 0;

    if (!elementInsideContent || !elementIsInsideContent) {
      return;
    }

    var scrollPosition = {
      top: 0,
      left: 0
    };
    var direction = this.option('direction');

    if (direction !== VERTICAL) {
      var leftPosition = this._elementPositionRelativeToContent($element, 'left');

      scrollPosition.left = this.option('rtlEnabled') === true ? leftPosition + $element.width() - this.clientWidth() : leftPosition;
    }

    if (direction !== HORIZONTAL) {
      scrollPosition.top = this._elementPositionRelativeToContent($element, 'top');
    }

    this.scrollTo(scrollPosition);
  },
  _updateIfNeed: function _updateIfNeed() {
    if (!this.option('updateManually')) {
      this.update();
    }
  },
  _useTemplates: function _useTemplates() {
    return false;
  }
});

(0, _component_registrator.default)(SCROLLABLE, Scrollable);
var _default = Scrollable;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;