"use strict";

exports.Overlay = exports.OverlayProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _widget = require("./common/widget");

var _ui = _interopRequireDefault(require("../../ui/overlay/ui.overlay"));

var _dom_component_wrapper = require("./common/dom_component_wrapper");

var _excluded = ["rootElementRef"],
    _excluded2 = ["_checkParentVisibility", "_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "animation", "aria", "children", "className", "classes", "closeOnOutsideClick", "closeOnTargetScroll", "container", "contentTemplate", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "position", "propagateOutsideClick", "rootElementRef", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var componentProps = _ref.componentProps,
      rootElementRef = _ref.props.rootElementRef,
      restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "rootElementRef": rootElementRef,
    "componentType": _ui.default,
    "componentProps": componentProps
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var OverlayProps = _extends({}, _widget.WidgetProps, {
  integrationOptions: {},
  templatesRenderAsynchronously: false,
  shading: true,
  closeOnOutsideClick: false,
  closeOnTargetScroll: false,
  animation: {
    type: "pop",
    duration: 300,
    to: {
      opacity: 0,
      scale: 0.55
    },
    from: {
      opacity: 1,
      scale: 1
    }
  },
  visible: false,
  propagateOutsideClick: true,
  _checkParentVisibility: false,
  rtlEnabled: false,
  contentTemplate: "content",
  maxWidth: null
});

exports.OverlayProps = OverlayProps;

var Overlay = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Overlay, _BaseInfernoComponent);

  function Overlay(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Overlay.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Overlay, [{
    key: "componentProps",
    get: function get() {
      var _this$props = this.props,
          rootElementRef = _this$props.rootElementRef,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          _checkParentVisibility = _this$props2._checkParentVisibility,
          _feedbackHideTimeout = _this$props2._feedbackHideTimeout,
          _feedbackShowTimeout = _this$props2._feedbackShowTimeout,
          accessKey = _this$props2.accessKey,
          activeStateEnabled = _this$props2.activeStateEnabled,
          activeStateUnit = _this$props2.activeStateUnit,
          animation = _this$props2.animation,
          aria = _this$props2.aria,
          children = _this$props2.children,
          className = _this$props2.className,
          classes = _this$props2.classes,
          closeOnOutsideClick = _this$props2.closeOnOutsideClick,
          closeOnTargetScroll = _this$props2.closeOnTargetScroll,
          container = _this$props2.container,
          contentTemplate = _this$props2.contentTemplate,
          disabled = _this$props2.disabled,
          focusStateEnabled = _this$props2.focusStateEnabled,
          height = _this$props2.height,
          hint = _this$props2.hint,
          hoverStateEnabled = _this$props2.hoverStateEnabled,
          integrationOptions = _this$props2.integrationOptions,
          maxWidth = _this$props2.maxWidth,
          name = _this$props2.name,
          onActive = _this$props2.onActive,
          onClick = _this$props2.onClick,
          onContentReady = _this$props2.onContentReady,
          onDimensionChanged = _this$props2.onDimensionChanged,
          onFocusIn = _this$props2.onFocusIn,
          onFocusOut = _this$props2.onFocusOut,
          onHoverEnd = _this$props2.onHoverEnd,
          onHoverStart = _this$props2.onHoverStart,
          onInactive = _this$props2.onInactive,
          onKeyDown = _this$props2.onKeyDown,
          onKeyboardHandled = _this$props2.onKeyboardHandled,
          onVisibilityChange = _this$props2.onVisibilityChange,
          position = _this$props2.position,
          propagateOutsideClick = _this$props2.propagateOutsideClick,
          rootElementRef = _this$props2.rootElementRef,
          rtlEnabled = _this$props2.rtlEnabled,
          shading = _this$props2.shading,
          tabIndex = _this$props2.tabIndex,
          templatesRenderAsynchronously = _this$props2.templatesRenderAsynchronously,
          visible = _this$props2.visible,
          width = _this$props2.width,
          restProps = _objectWithoutProperties(_this$props2, _excluded2);

      return restProps;
    }
  }]);

  return Overlay;
}(_vdom.BaseInfernoComponent);

exports.Overlay = Overlay;
Overlay.defaultProps = _extends({}, OverlayProps);