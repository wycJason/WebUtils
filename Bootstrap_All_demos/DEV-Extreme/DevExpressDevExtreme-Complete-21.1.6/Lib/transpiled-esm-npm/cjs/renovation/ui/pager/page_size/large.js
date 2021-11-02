"use strict";

exports.PageSizeLarge = exports.PageSizeLargeProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _light_button = require("../common/light_button");

var _pager_props = require("../common/pager_props");

var _consts = require("../common/consts");

var _excluded = ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var viewFunction = function viewFunction(_ref) {
  var pageSizesText = _ref.pageSizesText;
  return (0, _inferno.createFragment)(pageSizesText.map(function (_ref2) {
    var className = _ref2.className,
        click = _ref2.click,
        label = _ref2.label,
        text = _ref2.text;
    return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
      "className": className,
      "label": label,
      "onClick": click,
      children: text
    }, text);
  }), 0);
};

exports.viewFunction = viewFunction;
var PageSizeLargeProps = {};
exports.PageSizeLargeProps = PageSizeLargeProps;
var PageSizeLargePropsType = {
  defaultPageSize: _pager_props.PagerProps.pageSize
};

var PageSizeLarge = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PageSizeLarge, _BaseInfernoComponent);

  function PageSizeLarge(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      pageSize: _this.props.pageSize !== undefined ? _this.props.pageSize : _this.props.defaultPageSize
    };
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PageSizeLarge.prototype;

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

  _proto.onPageSizeChange = function onPageSizeChange(processedPageSize) {
    var _this3 = this;

    return function () {
      _this3.set_pageSize(function () {
        return processedPageSize;
      });
    };
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageSize: this.__state_pageSize
      }),
      pageSizesText: this.pageSizesText,
      restAttributes: this.restAttributes
    });
  };

  _createClass(PageSizeLarge, [{
    key: "__state_pageSize",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageSize !== undefined ? this.props.pageSize : state.pageSize;
    }
  }, {
    key: "pageSizesText",
    get: function get() {
      var _this4 = this;

      var pageSizes = this.props.pageSizes;
      return pageSizes.map(function (_ref3) {
        var text = _ref3.text,
            processedPageSize = _ref3.value;
        var selected = processedPageSize === _this4.__state_pageSize;
        var className = selected ? _consts.PAGER_SELECTED_PAGE_SIZE_CLASS : _consts.PAGER_PAGE_SIZE_CLASS;
        return {
          className: className,
          click: _this4.onPageSizeChange(processedPageSize),
          label: "Display ".concat(processedPageSize, " items on page"),
          text: text
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
          pageSize = _this$props$pageSize.pageSize,
          pageSizeChange = _this$props$pageSize.pageSizeChange,
          pageSizes = _this$props$pageSize.pageSizes,
          restProps = _objectWithoutProperties(_this$props$pageSize, _excluded);

      return restProps;
    }
  }]);

  return PageSizeLarge;
}(_vdom.BaseInfernoComponent);

exports.PageSizeLarge = PageSizeLarge;
PageSizeLarge.defaultProps = _extends({}, PageSizeLargePropsType);