import $ from '../../core/renderer';
import { hasWindow } from '../../core/utils/window';
import registerComponent from '../../core/component_registrator';
import { noop } from '../../core/utils/common';
import PullDownStrategy from './ui.scroll_view.native.pull_down';
import SwipeDownStrategy from './ui.scroll_view.native.swipe_down';
import SimulatedStrategy from './ui.scroll_view.simulated';
import Scrollable from './ui.scrollable';
var refreshStrategies = {
  pullDown: PullDownStrategy,
  swipeDown: SwipeDownStrategy,
  simulated: SimulatedStrategy
};
var isServerSide = !hasWindow();
var scrollViewServerConfig = {
  finishLoading: noop,
  release: noop,
  refresh: noop,
  _optionChanged: function _optionChanged(args) {
    if (args.name !== 'onUpdated') {
      return this.callBase.apply(this, arguments);
    }
  }
};
var ScrollView = Scrollable.inherit(isServerSide ? scrollViewServerConfig : {
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
    return $(this.content()).height() > this._$container.height();
  }
});
registerComponent('dxScrollView', ScrollView);
export default ScrollView;