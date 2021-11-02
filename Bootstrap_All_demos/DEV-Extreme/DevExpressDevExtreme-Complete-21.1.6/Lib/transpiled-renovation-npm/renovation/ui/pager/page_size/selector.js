"use strict";

exports.PageSizeSelector = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _small = require("./small");

var _large = require("./large");

var _pager_props = require("../common/pager_props");

var _message = _interopRequireDefault(require("../../../../localization/message"));

var _consts = require("../common/consts");

var _excluded = ["defaultPageSize", "isLargeDisplayMode", "pageSize", "pageSizeChange", "pageSizes", "rootElementRef"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var viewFunction = function viewFunction(_ref) {
  var htmlRef = _ref.htmlRef,
      normalizedPageSizes = _ref.normalizedPageSizes,
      _ref$props = _ref.props,
      isLargeDisplayMode = _ref$props.isLargeDisplayMode,
      pageSize = _ref$props.pageSize,
      pageSizeChange = _ref$props.pageSizeChange;
  return (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGE_SIZES_CLASS, [isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PageSizeLarge, {
    "pageSizes": normalizedPageSizes,
    "pageSize": pageSize,
    "pageSizeChange": pageSizeChange
  }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PageSizeSmall, {
    "parentRef": htmlRef,
    "pageSizes": normalizedPageSizes,
    "pageSize": pageSize,
    "pageSizeChange": pageSizeChange
  })], 0, null, null, htmlRef);
};

exports.viewFunction = viewFunction;

function getAllText() {
  return _message.default.getFormatter("dxPager-pageSizesAllText")();
}

var PageSizeSelectorProps = {
  isLargeDisplayMode: true
};
var PageSizeSelectorPropsType = {
  pageSizes: _pager_props.PagerProps.pageSizes,
  isLargeDisplayMode: PageSizeSelectorProps.isLargeDisplayMode,
  defaultPageSize: _pager_props.PagerProps.pageSize
};

var PageSizeSelector = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(PageSizeSelector, _InfernoComponent);

  function PageSizeSelector(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.htmlRef = (0, _inferno.createRef)();
    _this.state = {
      pageSize: _this.props.pageSize !== undefined ? _this.props.pageSize : _this.props.defaultPageSize
    };
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PageSizeSelector.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.setRootElementRef, [])];
  };

  _proto.updateEffects = function updateEffects() {};

  _proto.set_pageSize = function set_pageSize(value) {
    var _this2 = this;

    this.setState(function (state) {
      var _this2$props$pageSize, _this2$props;

      _this2._currentState = state;
      var newValue = value();
      (_this2$props$pageSize = (_this2$props = _this2.props).pageSizeChange) === null || _this2$props$pageSize === void 0 ? void 0 : _this2$props$pageSize.call(_this2$props, newValue);
      _this2._currentState = null;
      return {
        pageSize: newValue
      };
    });
  };

  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;

    if (rootElementRef) {
      rootElementRef.current = this.htmlRef.current;
    }
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageSize: this.__state_pageSize
      }),
      htmlRef: this.htmlRef,
      normalizedPageSizes: this.normalizedPageSizes,
      restAttributes: this.restAttributes
    });
  };

  _createClass(PageSizeSelector, [{
    key: "__state_pageSize",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageSize !== undefined ? this.props.pageSize : state.pageSize;
    }
  }, {
    key: "normalizedPageSizes",
    get: function get() {
      var pageSizes = this.props.pageSizes;
      return pageSizes.map(function (p) {
        return p === "all" || p === 0 ? {
          text: getAllText(),
          value: 0
        } : {
          text: String(p),
          value: p
        };
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$pageSize = _extends({}, this.props, {
        pageSize: this.__state_pageSize
      }),
          defaultPageSize = _this$props$pageSize.defaultPageSize,
          isLargeDisplayMode = _this$props$pageSize.isLargeDisplayMode,
          pageSize = _this$props$pageSize.pageSize,
          pageSizeChange = _this$props$pageSize.pageSizeChange,
          pageSizes = _this$props$pageSize.pageSizes,
          rootElementRef = _this$props$pageSize.rootElementRef,
          restProps = _objectWithoutProperties(_this$props$pageSize, _excluded);

      return restProps;
    }
  }]);

  return PageSizeSelector;
}(_vdom.InfernoComponent);

exports.PageSizeSelector = PageSizeSelector;
PageSizeSelector.defaultProps = _extends({}, PageSizeSelectorPropsType);