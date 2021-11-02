"use strict";

exports.PageIndexSelector = exports.PageIndexSelectorProps = exports.viewFunction = exports.PAGER_BUTTON_DISABLE_CLASS = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _light_button = require("../common/light_button");

var _large = require("./large");

var _small = require("./small");

var _pager_props = require("../common/pager_props");

var _config_context = require("../../../common/config_context");

var _excluded = ["defaultPageIndex", "hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PAGER_NAVIGATE_BUTTON = "dx-navigate-button";
var PAGER_PREV_BUTTON_CLASS = "dx-prev-button";
var PAGER_NEXT_BUTTON_CLASS = "dx-next-button";
var PAGER_BUTTON_DISABLE_CLASS = "dx-button-disable";
exports.PAGER_BUTTON_DISABLE_CLASS = PAGER_BUTTON_DISABLE_CLASS;
var nextButtonClassName = "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS);
var prevButtonClassName = "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS);
var nextButtonDisabledClassName = "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS);
var prevButtonDisabledClassName = "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS);

var viewFunction = function viewFunction(_ref) {
  var navigateToNextPage = _ref.navigateToNextPage,
      navigateToPrevPage = _ref.navigateToPrevPage,
      nextClassName = _ref.nextClassName,
      pageIndexChange = _ref.pageIndexChange,
      prevClassName = _ref.prevClassName,
      _ref$props = _ref.props,
      isLargeDisplayMode = _ref$props.isLargeDisplayMode,
      maxPagesCount = _ref$props.maxPagesCount,
      pageCount = _ref$props.pageCount,
      pageIndex = _ref$props.pageIndex,
      pagesCountText = _ref$props.pagesCountText,
      renderNextButton = _ref.renderNextButton,
      renderPrevButton = _ref.renderPrevButton;
  return (0, _inferno.createFragment)([renderPrevButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
    "className": prevClassName,
    "label": "Previous page",
    "onClick": navigateToPrevPage
  }), isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PagesLarge, {
    "maxPagesCount": maxPagesCount,
    "pageCount": pageCount,
    "pageIndex": pageIndex,
    "pageIndexChange": pageIndexChange
  }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PagesSmall, {
    "pageCount": pageCount,
    "pageIndex": pageIndex,
    "pageIndexChange": pageIndexChange,
    "pagesCountText": pagesCountText
  }), renderNextButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
    "className": nextClassName,
    "label": "Next page",
    "onClick": navigateToNextPage
  })], 0);
};

exports.viewFunction = viewFunction;

function getIncrement(direction) {
  return direction === "next" ? +1 : -1;
}

var PageIndexSelectorProps = {
  isLargeDisplayMode: true
};
exports.PageIndexSelectorProps = PageIndexSelectorProps;
var PageIndexSelectorPropsType = {
  maxPagesCount: _pager_props.PagerProps.maxPagesCount,
  pageCount: _pager_props.PagerProps.pageCount,
  hasKnownLastPage: _pager_props.PagerProps.hasKnownLastPage,
  showNavigationButtons: _pager_props.PagerProps.showNavigationButtons,
  totalCount: _pager_props.PagerProps.totalCount,
  isLargeDisplayMode: PageIndexSelectorProps.isLargeDisplayMode,
  defaultPageIndex: _pager_props.PagerProps.pageIndex
};

var PageIndexSelector = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PageIndexSelector, _BaseInfernoComponent);

  function PageIndexSelector(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      pageIndex: _this.props.pageIndex !== undefined ? _this.props.pageIndex : _this.props.defaultPageIndex
    };
    _this.getNextDirection = _this.getNextDirection.bind(_assertThisInitialized(_this));
    _this.getPrevDirection = _this.getPrevDirection.bind(_assertThisInitialized(_this));
    _this.canNavigateToPage = _this.canNavigateToPage.bind(_assertThisInitialized(_this));
    _this.getNextPageIndex = _this.getNextPageIndex.bind(_assertThisInitialized(_this));
    _this.canNavigateTo = _this.canNavigateTo.bind(_assertThisInitialized(_this));
    _this.navigateToPage = _this.navigateToPage.bind(_assertThisInitialized(_this));
    _this.pageIndexChange = _this.pageIndexChange.bind(_assertThisInitialized(_this));
    _this.navigateToNextPage = _this.navigateToNextPage.bind(_assertThisInitialized(_this));
    _this.navigateToPrevPage = _this.navigateToPrevPage.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PageIndexSelector.prototype;

  _proto.set_pageIndex = function set_pageIndex(value) {
    var _this2 = this;

    this.setState(function (state) {
      var _this2$props$pageInde, _this2$props;

      _this2._currentState = state;
      var newValue = value();
      (_this2$props$pageInde = (_this2$props = _this2.props).pageIndexChange) === null || _this2$props$pageInde === void 0 ? void 0 : _this2$props$pageInde.call(_this2$props, newValue);
      _this2._currentState = null;
      return {
        pageIndex: newValue
      };
    });
  };

  _proto.getNextDirection = function getNextDirection() {
    var _this$config;

    return !((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled) ? "next" : "prev";
  };

  _proto.getPrevDirection = function getPrevDirection() {
    var _this$config2;

    return !((_this$config2 = this.config) !== null && _this$config2 !== void 0 && _this$config2.rtlEnabled) ? "prev" : "next";
  };

  _proto.canNavigateToPage = function canNavigateToPage(pageIndex) {
    if (!this.props.hasKnownLastPage) {
      return pageIndex >= 0;
    }

    return pageIndex >= 0 && pageIndex <= this.props.pageCount - 1;
  };

  _proto.getNextPageIndex = function getNextPageIndex(direction) {
    return this.__state_pageIndex + getIncrement(direction);
  };

  _proto.canNavigateTo = function canNavigateTo(direction) {
    return this.canNavigateToPage(this.getNextPageIndex(direction));
  };

  _proto.navigateToPage = function navigateToPage(direction) {
    this.pageIndexChange(this.getNextPageIndex(direction));
  };

  _proto.pageIndexChange = function pageIndexChange(pageIndex) {
    if (this.canNavigateToPage(pageIndex)) {
      this.set_pageIndex(function () {
        return pageIndex;
      });
    }
  };

  _proto.navigateToNextPage = function navigateToNextPage() {
    this.navigateToPage(this.getNextDirection());
  };

  _proto.navigateToPrevPage = function navigateToPrevPage() {
    this.navigateToPage(this.getPrevDirection());
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex
      }),
      config: this.config,
      renderPrevButton: this.renderPrevButton,
      renderNextButton: this.renderNextButton,
      nextClassName: this.nextClassName,
      prevClassName: this.prevClassName,
      pageIndexChange: this.pageIndexChange,
      navigateToNextPage: this.navigateToNextPage,
      navigateToPrevPage: this.navigateToPrevPage,
      restAttributes: this.restAttributes
    });
  };

  _createClass(PageIndexSelector, [{
    key: "config",
    get: function get() {
      if ("ConfigContext" in this.context) {
        return this.context.ConfigContext;
      }

      return _config_context.ConfigContext;
    }
  }, {
    key: "__state_pageIndex",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageIndex !== undefined ? this.props.pageIndex : state.pageIndex;
    }
  }, {
    key: "renderPrevButton",
    get: function get() {
      var _this$props = this.props,
          isLargeDisplayMode = _this$props.isLargeDisplayMode,
          showNavigationButtons = _this$props.showNavigationButtons;
      return !isLargeDisplayMode || showNavigationButtons;
    }
  }, {
    key: "renderNextButton",
    get: function get() {
      return this.renderPrevButton || !this.props.hasKnownLastPage;
    }
  }, {
    key: "nextClassName",
    get: function get() {
      var direction = this.getNextDirection();
      var canNavigate = this.canNavigateTo(direction);
      return canNavigate ? nextButtonClassName : nextButtonDisabledClassName;
    }
  }, {
    key: "prevClassName",
    get: function get() {
      var direction = this.getPrevDirection();
      var canNavigate = this.canNavigateTo(direction);
      return canNavigate ? prevButtonClassName : prevButtonDisabledClassName;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$pageIndex = _extends({}, this.props, {
        pageIndex: this.__state_pageIndex
      }),
          defaultPageIndex = _this$props$pageIndex.defaultPageIndex,
          hasKnownLastPage = _this$props$pageIndex.hasKnownLastPage,
          isLargeDisplayMode = _this$props$pageIndex.isLargeDisplayMode,
          maxPagesCount = _this$props$pageIndex.maxPagesCount,
          pageCount = _this$props$pageIndex.pageCount,
          pageIndex = _this$props$pageIndex.pageIndex,
          pageIndexChange = _this$props$pageIndex.pageIndexChange,
          pagesCountText = _this$props$pageIndex.pagesCountText,
          showNavigationButtons = _this$props$pageIndex.showNavigationButtons,
          totalCount = _this$props$pageIndex.totalCount,
          restProps = _objectWithoutProperties(_this$props$pageIndex, _excluded);

      return restProps;
    }
  }]);

  return PageIndexSelector;
}(_vdom.BaseInfernoComponent);

exports.PageIndexSelector = PageIndexSelector;
PageIndexSelector.defaultProps = _extends({}, PageIndexSelectorPropsType);