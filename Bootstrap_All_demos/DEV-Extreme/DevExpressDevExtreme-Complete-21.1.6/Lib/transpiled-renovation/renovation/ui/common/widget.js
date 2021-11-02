"use strict";

exports.Widget = exports.WidgetProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

require("../../../events/click");

require("../../../events/hover");

var _short = require("../../../events/short");

var _combine_classes = require("../../utils/combine_classes");

var _extend = require("../../../core/utils/extend");

var _selectors = require("../../../ui/widget/selectors");

var _style = require("../../../core/utils/style");

var _base_props = require("./base_props");

var _config_context = require("../../common/config_context");

var _config_provider = require("../../common/config_provider");

var _resolve_rtl = require("../../utils/resolve_rtl");

var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));

var _excluded = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getAria = function getAria(args) {
  return Object.keys(args).reduce(function (r, key) {
    if (args[key]) {
      return _extends({}, r, _defineProperty({}, key === "role" || key === "id" ? key : "aria-".concat(key), String(args[key])));
    }

    return r;
  }, {});
};

var getCssClasses = function getCssClasses(model) {
  var _classesMap;

  var isFocusable = !!model.focusStateEnabled && !model.disabled;
  var isHoverable = !!model.hoverStateEnabled && !model.disabled;
  var canBeActive = !!model.activeStateEnabled && !model.disabled;
  var classesMap = (_classesMap = {
    "dx-widget": true
  }, _defineProperty(_classesMap, String(model.classes), !!model.classes), _defineProperty(_classesMap, String(model.className), !!model.className), _defineProperty(_classesMap, "dx-state-disabled", !!model.disabled), _defineProperty(_classesMap, "dx-state-invisible", !model.visible), _defineProperty(_classesMap, "dx-state-focused", !!model.focused && isFocusable), _defineProperty(_classesMap, "dx-state-active", !!model.active && canBeActive), _defineProperty(_classesMap, "dx-state-hover", !!model.hovered && isHoverable && !model.active), _defineProperty(_classesMap, "dx-rtl", !!model.rtlEnabled), _defineProperty(_classesMap, "dx-visibility-change-handler", !!model.onVisibilityChange), _classesMap);
  return (0, _combine_classes.combineClasses)(classesMap);
};

var viewFunction = function viewFunction(viewModel) {
  var widget = (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.cssClasses, viewModel.props.children, 0, _extends({}, viewModel.attributes, {
    "tabIndex": viewModel.tabIndex,
    "title": viewModel.props.hint,
    "hidden": !viewModel.props.visible,
    "style": (0, _vdom.normalizeStyles)(viewModel.styles)
  }), null, viewModel.widgetRef));
  return viewModel.shouldRenderConfigProvider ? (0, _inferno.createComponentVNode)(2, _config_provider.ConfigProvider, {
    "rtlEnabled": viewModel.rtlEnabled,
    children: widget
  }) : widget;
};

exports.viewFunction = viewFunction;

var WidgetProps = _extends({}, _base_props.BaseWidgetProps, {
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  aria: {},
  classes: "",
  className: "",
  name: ""
});

exports.WidgetProps = WidgetProps;

var Widget = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Widget, _InfernoWrapperCompon);

  function Widget(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this._currentState = null;
    _this.widgetRef = (0, _inferno.createRef)();
    _this.state = {
      active: false,
      focused: false,
      hovered: false
    };
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.activeEffect = _this.activeEffect.bind(_assertThisInitialized(_this));
    _this.clickEffect = _this.clickEffect.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.focusEffect = _this.focusEffect.bind(_assertThisInitialized(_this));
    _this.hoverEffect = _this.hoverEffect.bind(_assertThisInitialized(_this));
    _this.keyboardEffect = _this.keyboardEffect.bind(_assertThisInitialized(_this));
    _this.resizeEffect = _this.resizeEffect.bind(_assertThisInitialized(_this));
    _this.windowResizeEffect = _this.windowResizeEffect.bind(_assertThisInitialized(_this));
    _this.visibilityEffect = _this.visibilityEffect.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Widget.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.setRootElementRef, []), new _vdom.InfernoEffect(this.activeEffect, [this.props._feedbackHideTimeout, this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive, this.props.onInactive]), new _vdom.InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new _vdom.InfernoEffect(this.focusEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn, this.props.onFocusOut]), new _vdom.InfernoEffect(this.hoverEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverEnd, this.props.onHoverStart, this.active]), new _vdom.InfernoEffect(this.keyboardEffect, [this.props.onKeyDown]), new _vdom.InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new _vdom.InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new _vdom.InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props._feedbackHideTimeout, this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive, this.props.onInactive]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.disabled, this.props.name, this.props.onClick]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn, this.props.onFocusOut]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverEnd, this.props.onHoverStart, this.active]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.onKeyDown]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.name, this.props.onDimensionChanged]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.onDimensionChanged]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.name, this.props.onVisibilityChange]);
  };

  _proto.set_active = function set_active(value) {
    var _this2 = this;

    this.setState(function (state) {
      _this2._currentState = state;
      var newValue = value();
      _this2._currentState = null;
      return {
        active: newValue
      };
    });
  };

  _proto.set_focused = function set_focused(value) {
    var _this3 = this;

    this.setState(function (state) {
      _this3._currentState = state;
      var newValue = value();
      _this3._currentState = null;
      return {
        focused: newValue
      };
    });
  };

  _proto.set_hovered = function set_hovered(value) {
    var _this4 = this;

    this.setState(function (state) {
      _this4._currentState = state;
      var newValue = value();
      _this4._currentState = null;
      return {
        hovered: newValue
      };
    });
  };

  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;

    if (rootElementRef) {
      rootElementRef.current = this.widgetRef.current;
    }
  };

  _proto.activeEffect = function activeEffect() {
    var _this5 = this;

    var _this$props = this.props,
        _feedbackHideTimeout = _this$props._feedbackHideTimeout,
        _feedbackShowTimeout = _this$props._feedbackShowTimeout,
        activeStateEnabled = _this$props.activeStateEnabled,
        activeStateUnit = _this$props.activeStateUnit,
        disabled = _this$props.disabled,
        onActive = _this$props.onActive,
        onInactive = _this$props.onInactive;
    var selector = activeStateUnit;
    var namespace = "UIFeedback";

    if (activeStateEnabled && !disabled) {
      _short.active.on(this.widgetRef.current, function (_ref) {
        var event = _ref.event;

        _this5.set_active(function () {
          return true;
        });

        onActive === null || onActive === void 0 ? void 0 : onActive(event);
      }, function (_ref2) {
        var event = _ref2.event;

        _this5.set_active(function () {
          return false;
        });

        onInactive === null || onInactive === void 0 ? void 0 : onInactive(event);
      }, {
        hideTimeout: _feedbackHideTimeout,
        namespace: namespace,
        selector: selector,
        showTimeout: _feedbackShowTimeout
      });

      return function () {
        return _short.active.off(_this5.widgetRef.current, {
          selector: selector,
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.clickEffect = function clickEffect() {
    var _this6 = this;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        name = _this$props2.name,
        onClick = _this$props2.onClick;
    var namespace = name;

    if (onClick && !disabled) {
      _short.dxClick.on(this.widgetRef.current, onClick, {
        namespace: namespace
      });

      return function () {
        return _short.dxClick.off(_this6.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.focusEffect = function focusEffect() {
    var _this7 = this;

    var _this$props3 = this.props,
        disabled = _this$props3.disabled,
        focusStateEnabled = _this$props3.focusStateEnabled,
        name = _this$props3.name,
        onFocusIn = _this$props3.onFocusIn,
        onFocusOut = _this$props3.onFocusOut;
    var namespace = "".concat(name, "Focus");
    var isFocusable = focusStateEnabled && !disabled;

    if (isFocusable) {
      _short.focus.on(this.widgetRef.current, function (e) {
        if (!e.isDefaultPrevented()) {
          _this7.set_focused(function () {
            return true;
          });

          onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(e);
        }
      }, function (e) {
        if (!e.isDefaultPrevented()) {
          _this7.set_focused(function () {
            return false;
          });

          onFocusOut === null || onFocusOut === void 0 ? void 0 : onFocusOut(e);
        }
      }, {
        isFocusable: _selectors.focusable,
        namespace: namespace
      });

      return function () {
        return _short.focus.off(_this7.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.hoverEffect = function hoverEffect() {
    var _this8 = this;

    var namespace = "UIFeedback";
    var _this$props4 = this.props,
        activeStateUnit = _this$props4.activeStateUnit,
        disabled = _this$props4.disabled,
        hoverStateEnabled = _this$props4.hoverStateEnabled,
        onHoverEnd = _this$props4.onHoverEnd,
        onHoverStart = _this$props4.onHoverStart;
    var selector = activeStateUnit;
    var isHoverable = hoverStateEnabled && !disabled;

    if (isHoverable) {
      _short.hover.on(this.widgetRef.current, function (_ref3) {
        var event = _ref3.event;
        !_this8.active && _this8.set_hovered(function () {
          return true;
        });
        onHoverStart === null || onHoverStart === void 0 ? void 0 : onHoverStart(event);
      }, function (_ref4) {
        var event = _ref4.event;

        _this8.set_hovered(function () {
          return false;
        });

        onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd(event);
      }, {
        selector: selector,
        namespace: namespace
      });

      return function () {
        return _short.hover.off(_this8.widgetRef.current, {
          selector: selector,
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.keyboardEffect = function keyboardEffect() {
    var onKeyDown = this.props.onKeyDown;

    if (onKeyDown) {
      var id = _short.keyboard.on(this.widgetRef.current, this.widgetRef.current, function (e) {
        return onKeyDown(e);
      });

      return function () {
        return _short.keyboard.off(id);
      };
    }

    return undefined;
  };

  _proto.resizeEffect = function resizeEffect() {
    var _this9 = this;

    var namespace = "".concat(this.props.name, "VisibilityChange");
    var onDimensionChanged = this.props.onDimensionChanged;

    if (onDimensionChanged) {
      _short.resize.on(this.widgetRef.current, onDimensionChanged, {
        namespace: namespace
      });

      return function () {
        return _short.resize.off(_this9.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.windowResizeEffect = function windowResizeEffect() {
    var onDimensionChanged = this.props.onDimensionChanged;

    if (onDimensionChanged) {
      _resize_callbacks.default.add(onDimensionChanged);

      return function () {
        _resize_callbacks.default.remove(onDimensionChanged);
      };
    }

    return undefined;
  };

  _proto.visibilityEffect = function visibilityEffect() {
    var _this10 = this;

    var _this$props5 = this.props,
        name = _this$props5.name,
        onVisibilityChange = _this$props5.onVisibilityChange;
    var namespace = "".concat(name, "VisibilityChange");

    if (onVisibilityChange) {
      _short.visibility.on(this.widgetRef.current, function () {
        return onVisibilityChange(true);
      }, function () {
        return onVisibilityChange(false);
      }, {
        namespace: namespace
      });

      return function () {
        return _short.visibility.off(_this10.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.focus = function focus() {
    _short.focus.trigger(this.widgetRef.current);
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      active: this.active,
      focused: this.focused,
      hovered: this.hovered,
      widgetRef: this.widgetRef,
      config: this.config,
      shouldRenderConfigProvider: this.shouldRenderConfigProvider,
      rtlEnabled: this.rtlEnabled,
      attributes: this.attributes,
      styles: this.styles,
      cssClasses: this.cssClasses,
      tabIndex: this.tabIndex,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Widget, [{
    key: "config",
    get: function get() {
      if ("ConfigContext" in this.context) {
        return this.context.ConfigContext;
      }

      return _config_context.ConfigContext;
    }
  }, {
    key: "active",
    get: function get() {
      var state = this._currentState || this.state;
      return state.active;
    }
  }, {
    key: "focused",
    get: function get() {
      var state = this._currentState || this.state;
      return state.focused;
    }
  }, {
    key: "hovered",
    get: function get() {
      var state = this._currentState || this.state;
      return state.hovered;
    }
  }, {
    key: "shouldRenderConfigProvider",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabledDefinition)(rtlEnabled, this.config);
    }
  }, {
    key: "rtlEnabled",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
    }
  }, {
    key: "attributes",
    get: function get() {
      var _this$props6 = this.props,
          aria = _this$props6.aria,
          disabled = _this$props6.disabled,
          focusStateEnabled = _this$props6.focusStateEnabled,
          visible = _this$props6.visible;
      var accessKey = focusStateEnabled && !disabled && this.props.accessKey;
      return _extends({}, (0, _extend.extend)({}, this.restAttributes, accessKey && {
        accessKey: accessKey
      }), getAria(_extends({}, aria, {
        disabled: disabled,
        hidden: !visible
      })));
    }
  }, {
    key: "styles",
    get: function get() {
      var _this$props7 = this.props,
          height = _this$props7.height,
          width = _this$props7.width;
      var style = this.restAttributes.style || {};
      var computedWidth = (0, _style.normalizeStyleProp)("width", typeof width === "function" ? width() : width);
      var computedHeight = (0, _style.normalizeStyleProp)("height", typeof height === "function" ? height() : height);
      return _extends({}, style, {
        height: computedHeight !== null && computedHeight !== void 0 ? computedHeight : style.height,
        width: computedWidth !== null && computedWidth !== void 0 ? computedWidth : style.width
      });
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _this$props8 = this.props,
          activeStateEnabled = _this$props8.activeStateEnabled,
          className = _this$props8.className,
          classes = _this$props8.classes,
          disabled = _this$props8.disabled,
          focusStateEnabled = _this$props8.focusStateEnabled,
          hoverStateEnabled = _this$props8.hoverStateEnabled,
          onVisibilityChange = _this$props8.onVisibilityChange,
          visible = _this$props8.visible;
      return getCssClasses({
        active: this.active,
        focused: this.focused,
        hovered: this.hovered,
        className: className,
        classes: classes,
        disabled: disabled,
        activeStateEnabled: activeStateEnabled,
        focusStateEnabled: focusStateEnabled,
        hoverStateEnabled: hoverStateEnabled,
        onVisibilityChange: onVisibilityChange,
        rtlEnabled: this.rtlEnabled,
        visible: visible
      });
    }
  }, {
    key: "tabIndex",
    get: function get() {
      var _this$props9 = this.props,
          disabled = _this$props9.disabled,
          focusStateEnabled = _this$props9.focusStateEnabled,
          tabIndex = _this$props9.tabIndex;
      var isFocusable = focusStateEnabled && !disabled;
      return isFocusable ? tabIndex : undefined;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props10 = this.props,
          _feedbackHideTimeout = _this$props10._feedbackHideTimeout,
          _feedbackShowTimeout = _this$props10._feedbackShowTimeout,
          accessKey = _this$props10.accessKey,
          activeStateEnabled = _this$props10.activeStateEnabled,
          activeStateUnit = _this$props10.activeStateUnit,
          aria = _this$props10.aria,
          children = _this$props10.children,
          className = _this$props10.className,
          classes = _this$props10.classes,
          disabled = _this$props10.disabled,
          focusStateEnabled = _this$props10.focusStateEnabled,
          height = _this$props10.height,
          hint = _this$props10.hint,
          hoverStateEnabled = _this$props10.hoverStateEnabled,
          name = _this$props10.name,
          onActive = _this$props10.onActive,
          onClick = _this$props10.onClick,
          onContentReady = _this$props10.onContentReady,
          onDimensionChanged = _this$props10.onDimensionChanged,
          onFocusIn = _this$props10.onFocusIn,
          onFocusOut = _this$props10.onFocusOut,
          onHoverEnd = _this$props10.onHoverEnd,
          onHoverStart = _this$props10.onHoverStart,
          onInactive = _this$props10.onInactive,
          onKeyDown = _this$props10.onKeyDown,
          onKeyboardHandled = _this$props10.onKeyboardHandled,
          onVisibilityChange = _this$props10.onVisibilityChange,
          rootElementRef = _this$props10.rootElementRef,
          rtlEnabled = _this$props10.rtlEnabled,
          tabIndex = _this$props10.tabIndex,
          visible = _this$props10.visible,
          width = _this$props10.width,
          restProps = _objectWithoutProperties(_this$props10, _excluded);

      return restProps;
    }
  }]);

  return Widget;
}(_vdom.InfernoWrapperComponent);

exports.Widget = Widget;
Widget.defaultProps = _extends({}, WidgetProps);