"use strict";

exports.SelectBox = exports.SelectBoxProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _widget = require("./common/widget");

var _select_box = _interopRequireDefault(require("../../ui/select_box"));

var _dom_component_wrapper = require("./common/dom_component_wrapper");

var _excluded = ["rootElementRef"],
    _excluded2 = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "value", "valueChange", "valueExpr", "visible", "width"];

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
    "componentType": _select_box.default,
    "componentProps": componentProps
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var SelectBoxProps = _extends({}, _widget.WidgetProps, {
  focusStateEnabled: true,
  hoverStateEnabled: true,
  defaultValue: null
});

exports.SelectBoxProps = SelectBoxProps;

var SelectBox = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(SelectBox, _BaseInfernoComponent);

  function SelectBox(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    return _this;
  }

  var _proto = SelectBox.prototype;

  _proto.set_value = function set_value(value) {
    var _this2 = this;

    this.setState(function (state) {
      var _this2$props$valueCha, _this2$props;

      _this2._currentState = state;
      var newValue = value();
      (_this2$props$valueCha = (_this2$props = _this2.props).valueChange) === null || _this2$props$valueCha === void 0 ? void 0 : _this2$props$valueCha.call(_this2$props, newValue);
      _this2._currentState = null;
      return {
        value: newValue
      };
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.__state_value
      }),
      restAttributes: this.restAttributes
    });
  };

  _createClass(SelectBox, [{
    key: "__state_value",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.value !== undefined ? this.props.value : state.value;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$value = _extends({}, this.props, {
        value: this.__state_value
      }),
          _feedbackHideTimeout = _this$props$value._feedbackHideTimeout,
          _feedbackShowTimeout = _this$props$value._feedbackShowTimeout,
          accessKey = _this$props$value.accessKey,
          activeStateEnabled = _this$props$value.activeStateEnabled,
          activeStateUnit = _this$props$value.activeStateUnit,
          aria = _this$props$value.aria,
          children = _this$props$value.children,
          className = _this$props$value.className,
          classes = _this$props$value.classes,
          dataSource = _this$props$value.dataSource,
          defaultValue = _this$props$value.defaultValue,
          disabled = _this$props$value.disabled,
          displayExpr = _this$props$value.displayExpr,
          focusStateEnabled = _this$props$value.focusStateEnabled,
          height = _this$props$value.height,
          hint = _this$props$value.hint,
          hoverStateEnabled = _this$props$value.hoverStateEnabled,
          name = _this$props$value.name,
          onActive = _this$props$value.onActive,
          onClick = _this$props$value.onClick,
          onContentReady = _this$props$value.onContentReady,
          onDimensionChanged = _this$props$value.onDimensionChanged,
          onFocusIn = _this$props$value.onFocusIn,
          onFocusOut = _this$props$value.onFocusOut,
          onHoverEnd = _this$props$value.onHoverEnd,
          onHoverStart = _this$props$value.onHoverStart,
          onInactive = _this$props$value.onInactive,
          onKeyDown = _this$props$value.onKeyDown,
          onKeyboardHandled = _this$props$value.onKeyboardHandled,
          onVisibilityChange = _this$props$value.onVisibilityChange,
          rootElementRef = _this$props$value.rootElementRef,
          rtlEnabled = _this$props$value.rtlEnabled,
          tabIndex = _this$props$value.tabIndex,
          value = _this$props$value.value,
          valueChange = _this$props$value.valueChange,
          valueExpr = _this$props$value.valueExpr,
          visible = _this$props$value.visible,
          width = _this$props$value.width,
          restProps = _objectWithoutProperties(_this$props$value, _excluded2);

      return restProps;
    }
  }]);

  return SelectBox;
}(_vdom.BaseInfernoComponent);

exports.SelectBox = SelectBox;
SelectBox.defaultProps = _extends({}, SelectBoxProps);