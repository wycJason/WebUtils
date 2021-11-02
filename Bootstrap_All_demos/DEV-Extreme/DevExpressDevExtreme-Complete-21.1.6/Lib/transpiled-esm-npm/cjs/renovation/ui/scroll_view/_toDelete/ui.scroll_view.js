"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _window = require("../../core/utils/window");

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _common = require("../../core/utils/common");

var _uiScroll_viewNative = _interopRequireDefault(require("./ui.scroll_view.native.pull_down"));

var _uiScroll_viewNative2 = _interopRequireDefault(require("./ui.scroll_view.native.swipe_down"));

var _uiScroll_view = _interopRequireDefault(require("./ui.scroll_view.simulated"));

var _ui = _interopRequireDefault(require("./ui.scrollable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refreshStrategies = {
  pullDown: _uiScroll_viewNative.default,
  swipeDown: _uiScroll_viewNative2.default,
  simulated: _uiScroll_view.default
};
var isServerSide = !(0, _window.hasWindow)();
var scrollViewServerConfig = {
  finishLoading: _common.noop,
  release: _common.noop,
  refresh: _common.noop,
  _optionChanged: function _optionChanged(args) {
    if (args.name !== 'onUpdated') {
      return this.callBase.apply(this, arguments);
    }
  }
};

var ScrollView = _ui.default.inherit(isServerSide ? scrollViewServerConfig : {
  _createStrategy: function _createStrategy() {
    var strategyName = this.option('useNative') ? this.option('refreshStrategy') : 'simulated'; // eslint-disable-next-line no-undef

    var strategyClass = refreshStrategies[strategyName];

    if (!strategyClass) {
      throw Error('E1030', this.option('refreshStrategy'));
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'onPullDown':
      case 'onReachBottom':
        this._createActions();

        break;

      case 'pullingDownText':
      case 'pulledDownText':
      case 'refreshingText':
      case 'refreshStrategy':
        this._invalidate();

        break;

      case 'reachBottomText':
        this._updateReachBottomText();

        break;

      default:
        this.callBase(args);
    }
  },
  release: function release(preventReachBottom) {
    if (preventReachBottom !== undefined) {
      this.toggleLoading(!preventReachBottom);
    }

    return this._strategy.release();
  },

  /**
  * @name dxScrollView.toggleLoading
  * @publicName toggleLoading(showOrHide)
  * @param1 showOrHide:boolean
  * @hidden
  */
  toggleLoading: function toggleLoading(showOrHide) {
    this._reachBottomEnable(showOrHide);
  },

  /**
  * @name dxScrollView.isFull
  * @publicName isFull()
  * @return boolean
  * @hidden
  */
  isFull: function isFull() {
    return (0, _renderer.default)(this.content()).height() > this._$container.height();
  }
});

(0, _component_registrator.default)('dxScrollView', ScrollView);
var _default = ScrollView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;