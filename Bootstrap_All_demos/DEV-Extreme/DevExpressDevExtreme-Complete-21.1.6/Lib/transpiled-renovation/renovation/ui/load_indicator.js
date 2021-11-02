"use strict";

exports.LoadIndicator = exports.LoadIndicatorProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _load_indicator = _interopRequireDefault(require("../../ui/load_indicator"));

var _widget = require("./common/widget");

var _dom_component_wrapper = require("./common/dom_component_wrapper");

var _excluded = ["rootElementRef"],
    _excluded2 = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "indicatorSrc", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
      rootElementRef = _ref$props.rootElementRef,
      componentProps = _objectWithoutProperties(_ref$props, _excluded),
      restAttributes = _ref.restAttributes;

  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "rootElementRef": rootElementRef,
    "componentType": _load_indicator.default,
    "componentProps": componentProps
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var LoadIndicatorProps = _extends({}, _widget.WidgetProps);

exports.LoadIndicatorProps = LoadIndicatorProps;

var LoadIndicator = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(LoadIndicator, _BaseInfernoComponent);

  function LoadIndicator(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = LoadIndicator.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  };

  _createClass(LoadIndicator, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          _feedbackHideTimeout = _this$props._feedbackHideTimeout,
          _feedbackShowTimeout = _this$props._feedbackShowTimeout,
          accessKey = _this$props.accessKey,
          activeStateEnabled = _this$props.activeStateEnabled,
          activeStateUnit = _this$props.activeStateUnit,
          aria = _this$props.aria,
          children = _this$props.children,
          className = _this$props.className,
          classes = _this$props.classes,
          disabled = _this$props.disabled,
          focusStateEnabled = _this$props.focusStateEnabled,
          height = _this$props.height,
          hint = _this$props.hint,
          hoverStateEnabled = _this$props.hoverStateEnabled,
          indicatorSrc = _this$props.indicatorSrc,
          name = _this$props.name,
          onActive = _this$props.onActive,
          onClick = _this$props.onClick,
          onContentReady = _this$props.onContentReady,
          onDimensionChanged = _this$props.onDimensionChanged,
          onFocusIn = _this$props.onFocusIn,
          onFocusOut = _this$props.onFocusOut,
          onHoverEnd = _this$props.onHoverEnd,
          onHoverStart = _this$props.onHoverStart,
          onInactive = _this$props.onInactive,
          onKeyDown = _this$props.onKeyDown,
          onKeyboardHandled = _this$props.onKeyboardHandled,
          onVisibilityChange = _this$props.onVisibilityChange,
          rootElementRef = _this$props.rootElementRef,
          rtlEnabled = _this$props.rtlEnabled,
          tabIndex = _this$props.tabIndex,
          visible = _this$props.visible,
          width = _this$props.width,
          restProps = _objectWithoutProperties(_this$props, _excluded2);

      return restProps;
    }
  }]);

  return LoadIndicator;
}(_vdom.BaseInfernoComponent);

exports.LoadIndicator = LoadIndicator;
LoadIndicator.defaultProps = _extends({}, LoadIndicatorProps);