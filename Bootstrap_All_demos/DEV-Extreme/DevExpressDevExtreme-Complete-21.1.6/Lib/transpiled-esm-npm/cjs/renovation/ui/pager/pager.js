"use strict";

exports.Pager = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _resizable_container = require("./resizable_container");

var _pager_props = require("./common/pager_props");

var _content = require("./content");

var _combine_classes = require("../../utils/combine_classes");

var _excluded = ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var pagerProps = _ref.pagerProps,
      restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _resizable_container.ResizableContainer, _extends({
    "contentTemplate": _content.PagerContent,
    "pagerProps": pagerProps
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var Pager = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Pager, _InfernoWrapperCompon);

  function Pager(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      pageIndex: _this.props.pageIndex !== undefined ? _this.props.pageIndex : _this.props.defaultPageIndex,
      pageSize: _this.props.pageSize !== undefined ? _this.props.pageSize : _this.props.defaultPageSize
    };
    _this.pageIndexChange = _this.pageIndexChange.bind(_assertThisInitialized(_this));
    _this.pageSizeChange = _this.pageSizeChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Pager.prototype;

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

  _proto.set_pageSize = function set_pageSize(value) {
    var _this3 = this;

    this.setState(function (state) {
      var _this3$props$pageSize, _this3$props;

      _this3._currentState = state;
      var newValue = value();
      (_this3$props$pageSize = (_this3$props = _this3.props).pageSizeChange) === null || _this3$props$pageSize === void 0 ? void 0 : _this3$props$pageSize.call(_this3$props, newValue);
      _this3._currentState = null;
      return {
        pageSize: newValue
      };
    });
  };

  _proto.pageIndexChange = function pageIndexChange(newPageIndex) {
    if (this.props.gridCompatibility) {
      this.set_pageIndex(function () {
        return newPageIndex + 1;
      });
    } else {
      this.set_pageIndex(function () {
        return newPageIndex;
      });
    }
  };

  _proto.pageSizeChange = function pageSizeChange(newPageSize) {
    this.set_pageSize(function () {
      return newPageSize;
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex,
        pageSize: this.__state_pageSize
      }),
      pageIndexChange: this.pageIndexChange,
      pageIndex: this.pageIndex,
      pageSizeChange: this.pageSizeChange,
      className: this.className,
      pagerProps: this.pagerProps,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Pager, [{
    key: "__state_pageIndex",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageIndex !== undefined ? this.props.pageIndex : state.pageIndex;
    }
  }, {
    key: "__state_pageSize",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageSize !== undefined ? this.props.pageSize : state.pageSize;
    }
  }, {
    key: "pageIndex",
    get: function get() {
      if (this.props.gridCompatibility) {
        return this.__state_pageIndex - 1;
      }

      return this.__state_pageIndex;
    }
  }, {
    key: "className",
    get: function get() {
      if (this.props.gridCompatibility) {
        return (0, _combine_classes.combineClasses)(_defineProperty({
          "dx-datagrid-pager": true
        }, "".concat(this.props.className), !!this.props.className));
      }

      return this.props.className;
    }
  }, {
    key: "pagerProps",
    get: function get() {
      var _this4 = this;

      return _extends({}, _extends({}, this.props, {
        pageIndex: this.__state_pageIndex,
        pageSize: this.__state_pageSize
      }), {
        className: this.className,
        pageIndex: this.pageIndex,
        pageIndexChange: function pageIndexChange(pageIndex) {
          return _this4.pageIndexChange(pageIndex);
        },
        pageSizeChange: function pageSizeChange(pageSize) {
          return _this4.pageSizeChange(pageSize);
        }
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$pageIndex = _extends({}, this.props, {
        pageIndex: this.__state_pageIndex,
        pageSize: this.__state_pageSize
      }),
          className = _this$props$pageIndex.className,
          defaultPageIndex = _this$props$pageIndex.defaultPageIndex,
          defaultPageSize = _this$props$pageIndex.defaultPageSize,
          displayMode = _this$props$pageIndex.displayMode,
          gridCompatibility = _this$props$pageIndex.gridCompatibility,
          hasKnownLastPage = _this$props$pageIndex.hasKnownLastPage,
          infoText = _this$props$pageIndex.infoText,
          lightModeEnabled = _this$props$pageIndex.lightModeEnabled,
          maxPagesCount = _this$props$pageIndex.maxPagesCount,
          onKeyDown = _this$props$pageIndex.onKeyDown,
          pageCount = _this$props$pageIndex.pageCount,
          pageIndex = _this$props$pageIndex.pageIndex,
          pageIndexChange = _this$props$pageIndex.pageIndexChange,
          pageSize = _this$props$pageIndex.pageSize,
          pageSizeChange = _this$props$pageIndex.pageSizeChange,
          pageSizes = _this$props$pageIndex.pageSizes,
          pagesCountText = _this$props$pageIndex.pagesCountText,
          pagesNavigatorVisible = _this$props$pageIndex.pagesNavigatorVisible,
          rtlEnabled = _this$props$pageIndex.rtlEnabled,
          showInfo = _this$props$pageIndex.showInfo,
          showNavigationButtons = _this$props$pageIndex.showNavigationButtons,
          showPageSizes = _this$props$pageIndex.showPageSizes,
          totalCount = _this$props$pageIndex.totalCount,
          visible = _this$props$pageIndex.visible,
          restProps = _objectWithoutProperties(_this$props$pageIndex, _excluded);

      return restProps;
    }
  }]);

  return Pager;
}(_vdom.InfernoWrapperComponent);

exports.Pager = Pager;
Pager.defaultProps = _extends({}, _pager_props.PagerProps);