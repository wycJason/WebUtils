"use strict";

exports.InfoText = exports.InfoTextProps = exports.viewFunction = exports.PAGER_INFO_CLASS = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _string = require("../../../core/utils/string");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _pager_props = require("./common/pager_props");

var _excluded = ["defaultPageIndex", "infoText", "pageCount", "pageIndex", "pageIndexChange", "rootElementRef", "totalCount"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PAGER_INFO_CLASS = "dx-info";
exports.PAGER_INFO_CLASS = PAGER_INFO_CLASS;

var viewFunction = function viewFunction(_ref) {
  var rootElementRef = _ref.props.rootElementRef,
      text = _ref.text;
  return (0, _inferno.createVNode)(1, "div", PAGER_INFO_CLASS, text, 0, null, null, rootElementRef);
};

exports.viewFunction = viewFunction;
var InfoTextProps = {};
exports.InfoTextProps = InfoTextProps;
var InfoTextPropsType = {
  pageCount: _pager_props.PagerProps.pageCount,
  totalCount: _pager_props.PagerProps.totalCount,
  defaultPageIndex: _pager_props.PagerProps.pageIndex,
  pageIndexChange: function pageIndexChange() {}
};

var InfoText = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(InfoText, _BaseInfernoComponent);

  function InfoText(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      pageIndex: _this.props.pageIndex !== undefined ? _this.props.pageIndex : _this.props.defaultPageIndex
    };
    return _this;
  }

  var _proto = InfoText.prototype;

  _proto.set_pageIndex = function set_pageIndex(value) {
    var _this2 = this;

    this.setState(function (state) {
      _this2._currentState = state;
      var newValue = value();

      _this2.props.pageIndexChange(newValue);

      _this2._currentState = null;
      return {
        pageIndex: newValue
      };
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex
      }),
      infoText: this.infoText,
      text: this.text,
      restAttributes: this.restAttributes
    });
  };

  _createClass(InfoText, [{
    key: "__state_pageIndex",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.pageIndex !== undefined ? this.props.pageIndex : state.pageIndex;
    }
  }, {
    key: "infoText",
    get: function get() {
      return this.props.infoText || _message.default.getFormatter("dxPager-infoText")();
    }
  }, {
    key: "text",
    get: function get() {
      var _this$props = this.props,
          pageCount = _this$props.pageCount,
          totalCount = _this$props.totalCount;
      return (0, _string.format)(this.infoText, (this.__state_pageIndex + 1).toString(), pageCount.toString(), totalCount.toString());
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$pageIndex = _extends({}, this.props, {
        pageIndex: this.__state_pageIndex
      }),
          defaultPageIndex = _this$props$pageIndex.defaultPageIndex,
          infoText = _this$props$pageIndex.infoText,
          pageCount = _this$props$pageIndex.pageCount,
          pageIndex = _this$props$pageIndex.pageIndex,
          pageIndexChange = _this$props$pageIndex.pageIndexChange,
          rootElementRef = _this$props$pageIndex.rootElementRef,
          totalCount = _this$props$pageIndex.totalCount,
          restProps = _objectWithoutProperties(_this$props$pageIndex, _excluded);

      return restProps;
    }
  }]);

  return InfoText;
}(_vdom.BaseInfernoComponent);

exports.InfoText = InfoText;
InfoText.defaultProps = _extends({}, InfoTextPropsType);