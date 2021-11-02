"use strict";

exports.Bullet = exports.BulletProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _combine_classes = require("../../utils/combine_classes");

var _resolve_rtl = require("../../utils/resolve_rtl");

var _get_element_offset = _interopRequireDefault(require("../../utils/get_element_offset"));

var _base_props = require("../common/base_props");

var _base_widget = require("../common/base_widget");

var _utils = require("./utils");

var _config_context = require("../../common/config_context");

var _svg_path = require("../common/renderers/svg_path");

var _tooltip = require("../common/tooltip");

var _utils2 = require("../common/utils");

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _index = require("../../../events/utils/index");

var _pointer = _interopRequireDefault(require("../../../events/pointer"));

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _number = _interopRequireDefault(require("../../../core/polyfills/number"));

var _excluded = ["canvas", "canvasChange", "children", "className", "classes", "color", "defaultCanvas", "disabled", "endScaleValue", "margin", "onContentReady", "onTooltipHidden", "onTooltipShown", "pointerEvents", "rtlEnabled", "showTarget", "showZeroLevel", "size", "startScaleValue", "target", "targetColor", "targetWidth", "tooltip", "value"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TARGET_MIN_Y = 0.02;
var TARGET_MAX_Y = 0.98;
var BAR_VALUE_MIN_Y = 0.1;
var BAR_VALUE_MAX_Y = 0.9;
var DEFAULT_CANVAS_WIDTH = 300;
var DEFAULT_CANVAS_HEIGHT = 30;
var DEFAULT_HORIZONTAL_MARGIN = 1;
var DEFAULT_VERTICAL_MARGIN = 2;
var DEFAULT_OFFSET = {
  top: 0,
  left: 0
};
var EVENT_NS = "sparkline-tooltip";
var POINTER_ACTION = (0, _index.addNamespace)([_pointer.default.down, _pointer.default.move], EVENT_NS);

var inCanvas = function inCanvas(canvas, x, y) {
  var height = canvas.height,
      width = canvas.width;
  return (0, _utils2.pointInCanvas)({
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width: width,
    height: height
  }, x, y);
};

var getCssClasses = function getCssClasses(_ref) {
  var classes = _ref.classes;

  var rootClassesMap = _defineProperty({
    dxb: true,
    "dxb-bullet": true
  }, String(classes), !!classes);

  return (0, _combine_classes.combineClasses)(rootClassesMap);
};

var getContainerCssClasses = function getContainerCssClasses(_ref2) {
  var className = _ref2.className;

  var rootClassesMap = _defineProperty({
    "dx-bullet": true
  }, String(className), !!className);

  return (0, _combine_classes.combineClasses)(rootClassesMap);
};

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      color = _viewModel$props.color,
      disabled = _viewModel$props.disabled,
      margin = _viewModel$props.margin,
      onContentReady = _viewModel$props.onContentReady,
      size = _viewModel$props.size,
      targetColor = _viewModel$props.targetColor,
      targetWidth = _viewModel$props.targetWidth;
  var barValueShape = viewModel.barValueShape,
      customizedTooltipProps = viewModel.customizedTooltipProps,
      isValidBulletScale = viewModel.isValidBulletScale,
      isValidTarget = viewModel.isValidTarget,
      isValidZeroLevel = viewModel.isValidZeroLevel,
      targetShape = viewModel.targetShape,
      zeroLevelShape = viewModel.zeroLevelShape;
  return (0, _inferno.createFragment)([(0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _base_widget.BaseWidget, _extends({
    "rootElementRef": viewModel.widgetRootRef,
    "classes": viewModel.cssClasses,
    "className": viewModel.cssClassName,
    "size": size,
    "margin": margin,
    "defaultCanvas": viewModel.defaultCanvas,
    "disabled": disabled,
    "rtlEnabled": viewModel.rtlEnabled,
    "onContentReady": onContentReady,
    "canvasChange": viewModel.onCanvasChange,
    "pointerEvents": "visible"
  }, viewModel.restAttributes, {
    children: isValidBulletScale ? (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _svg_path.PathSvgElement, {
      "type": "line",
      "points": barValueShape,
      "className": "dxb-bar-value",
      "strokeLineCap": "square",
      "fill": color
    }), isValidTarget && (0, _inferno.createComponentVNode)(2, _svg_path.PathSvgElement, {
      "type": "line",
      "points": targetShape,
      "className": "dxb-target",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": targetWidth
    }), isValidZeroLevel && (0, _inferno.createComponentVNode)(2, _svg_path.PathSvgElement, {
      "type": "line",
      "points": zeroLevelShape,
      "className": "dxb-zero-level",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": 1
    })], 0) : undefined
  }), null, viewModel.widgetRef)), customizedTooltipProps.enabled && (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _tooltip.Tooltip, _extends({
    "rootWidget": viewModel.widgetRootRef
  }, customizedTooltipProps, {
    "visible": viewModel.tooltipVisible
  }), null, viewModel.tooltipRef))], 0);
};

exports.viewFunction = viewFunction;

var BulletProps = _extends({}, _base_props.BaseWidgetProps, {
  value: 0,
  color: "#e8c267",
  target: 0,
  targetColor: "#666666",
  targetWidth: 4,
  showTarget: true,
  showZeroLevel: true,
  startScaleValue: 0
});

exports.BulletProps = BulletProps;

var Bullet = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Bullet, _InfernoWrapperCompon);

  function Bullet(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this._currentState = null;
    _this.widgetRef = (0, _inferno.createRef)();
    _this.tooltipRef = (0, _inferno.createRef)();
    _this.widgetRootRef = (0, _inferno.createRef)();
    _this.state = {
      argumentAxis: (0, _utils.createAxis)(true),
      valueAxis: (0, _utils.createAxis)(false),
      canvasState: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      offsetState: DEFAULT_OFFSET,
      tooltipVisible: false,
      canvas: _this.props.canvas !== undefined ? _this.props.canvas : _this.props.defaultCanvas
    };
    _this.tooltipEffect = _this.tooltipEffect.bind(_assertThisInitialized(_this));
    _this.tooltipOutEffect = _this.tooltipOutEffect.bind(_assertThisInitialized(_this));
    _this.onCanvasChange = _this.onCanvasChange.bind(_assertThisInitialized(_this));
    _this.prepareScaleProps = _this.prepareScaleProps.bind(_assertThisInitialized(_this));
    _this.getRange = _this.getRange.bind(_assertThisInitialized(_this));
    _this.getSimpleShape = _this.getSimpleShape.bind(_assertThisInitialized(_this));
    _this.pointerHandler = _this.pointerHandler.bind(_assertThisInitialized(_this));
    _this.pointerOutHandler = _this.pointerOutHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Bullet.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.tooltipEffect, [this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.canvasState, this.offsetState]), new _vdom.InfernoEffect(this.tooltipOutEffect, [this.tooltipVisible, this.canvasState])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.canvasState, this.offsetState]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.tooltipVisible, this.canvasState]);
  };

  _proto.set_argumentAxis = function set_argumentAxis(value) {
    var _this2 = this;

    this.setState(function (state) {
      _this2._currentState = state;
      var newValue = value();
      _this2._currentState = null;
      return {
        argumentAxis: newValue
      };
    });
  };

  _proto.set_valueAxis = function set_valueAxis(value) {
    var _this3 = this;

    this.setState(function (state) {
      _this3._currentState = state;
      var newValue = value();
      _this3._currentState = null;
      return {
        valueAxis: newValue
      };
    });
  };

  _proto.set_canvasState = function set_canvasState(value) {
    var _this4 = this;

    this.setState(function (state) {
      _this4._currentState = state;
      var newValue = value();
      _this4._currentState = null;
      return {
        canvasState: newValue
      };
    });
  };

  _proto.set_offsetState = function set_offsetState(value) {
    var _this5 = this;

    this.setState(function (state) {
      _this5._currentState = state;
      var newValue = value();
      _this5._currentState = null;
      return {
        offsetState: newValue
      };
    });
  };

  _proto.set_tooltipVisible = function set_tooltipVisible(value) {
    var _this6 = this;

    this.setState(function (state) {
      _this6._currentState = state;
      var newValue = value();
      _this6._currentState = null;
      return {
        tooltipVisible: newValue
      };
    });
  };

  _proto.set_canvas = function set_canvas(value) {
    var _this7 = this;

    this.setState(function (state) {
      _this7._currentState = state;
      var newValue = value();

      _this7.props.canvasChange(newValue);

      _this7._currentState = null;
      return {
        canvas: newValue
      };
    });
  };

  _proto.tooltipEffect = function tooltipEffect() {
    var _this8 = this;

    var disabled = this.props.disabled;

    if (!disabled && this.customizedTooltipProps.enabled) {
      var _this$widgetRef$curre;

      var svg = (_this$widgetRef$curre = this.widgetRef.current) === null || _this$widgetRef$curre === void 0 ? void 0 : _this$widgetRef$curre.svg();

      _events_engine.default.on(svg, POINTER_ACTION, this.pointerHandler);

      return function () {
        _events_engine.default.off(svg, POINTER_ACTION, _this8.pointerHandler);
      };
    }

    return undefined;
  };

  _proto.tooltipOutEffect = function tooltipOutEffect() {
    var _this9 = this;

    if (this.tooltipVisible) {
      var document = _dom_adapter.default.getDocument();

      _events_engine.default.on(document, POINTER_ACTION, this.pointerOutHandler);

      return function () {
        _events_engine.default.off(document, POINTER_ACTION, _this9.pointerOutHandler);
      };
    }

    return undefined;
  };

  _proto.onCanvasChange = function onCanvasChange(canvas) {
    var _this$widgetRef$curre2;

    this.set_canvasState(function () {
      return canvas;
    });
    var svgElement = ((_this$widgetRef$curre2 = this.widgetRef.current) === null || _this$widgetRef$curre2 === void 0 ? void 0 : _this$widgetRef$curre2.svg()) || undefined;
    this.set_offsetState(function () {
      var _getElementOffset;

      return (_getElementOffset = (0, _get_element_offset.default)(svgElement)) !== null && _getElementOffset !== void 0 ? _getElementOffset : DEFAULT_OFFSET;
    });
  };

  _proto.prepareScaleProps = function prepareScaleProps() {
    var _this$props = this.props,
        endScaleValue = _this$props.endScaleValue,
        startScaleValue = _this$props.startScaleValue,
        target = _this$props.target,
        value = _this$props.value;
    var tmpProps = {
      inverted: false,
      value: value,
      target: target,
      startScaleValue: startScaleValue === undefined ? Math.min(target, value, 0) : startScaleValue,
      endScaleValue: endScaleValue === undefined ? Math.max(target, value) : endScaleValue
    };

    if (tmpProps.endScaleValue < tmpProps.startScaleValue) {
      var level = tmpProps.endScaleValue;
      tmpProps.endScaleValue = tmpProps.startScaleValue;
      tmpProps.startScaleValue = level;
      tmpProps.inverted = true;
    }

    return tmpProps;
  };

  _proto.getRange = function getRange(scaleProps) {
    var endScaleValue = scaleProps.endScaleValue,
        inverted = scaleProps.inverted,
        startScaleValue = scaleProps.startScaleValue;
    return {
      arg: {
        invert: this.rtlEnabled ? !inverted : inverted,
        min: startScaleValue,
        max: endScaleValue,
        axisType: "continuous",
        dataType: "numeric"
      },
      val: {
        min: 0,
        max: 1,
        axisType: "continuous",
        dataType: "numeric"
      }
    };
  };

  _proto.getSimpleShape = function getSimpleShape(value) {
    var translatorY = this.valueAxis.getTranslator();
    var x = this.argumentAxis.getTranslator().translate(value);
    return [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)];
  };

  _proto.pointerHandler = function pointerHandler() {
    this.set_tooltipVisible(function () {
      return true;
    });
  };

  _proto.pointerOutHandler = function pointerOutHandler(_ref3) {
    var pageX = _ref3.pageX,
        pageY = _ref3.pageY;
    var _this$offsetState = this.offsetState,
        left = _this$offsetState.left,
        top = _this$offsetState.top;
    var x = Math.floor(pageX - left);
    var y = Math.floor(pageY - top);

    if (!inCanvas(this.canvasState, x, y)) {
      this.set_tooltipVisible(function () {
        return false;
      });
    }
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        canvas: this.__state_canvas
      }),
      argumentAxis: this.argumentAxis,
      valueAxis: this.valueAxis,
      canvasState: this.canvasState,
      offsetState: this.offsetState,
      tooltipVisible: this.tooltipVisible,
      widgetRootRef: this.widgetRootRef,
      widgetRef: this.widgetRef,
      tooltipRef: this.tooltipRef,
      config: this.config,
      cssClasses: this.cssClasses,
      cssClassName: this.cssClassName,
      rtlEnabled: this.rtlEnabled,
      tooltipEnabled: this.tooltipEnabled,
      tooltipData: this.tooltipData,
      tooltipCoords: this.tooltipCoords,
      customizedTooltipProps: this.customizedTooltipProps,
      defaultCanvas: this.defaultCanvas,
      scaleProps: this.scaleProps,
      isValidBulletScale: this.isValidBulletScale,
      targetShape: this.targetShape,
      zeroLevelShape: this.zeroLevelShape,
      isValidTarget: this.isValidTarget,
      isValidZeroLevel: this.isValidZeroLevel,
      barValueShape: this.barValueShape,
      onCanvasChange: this.onCanvasChange,
      prepareScaleProps: this.prepareScaleProps,
      getRange: this.getRange,
      getSimpleShape: this.getSimpleShape,
      pointerHandler: this.pointerHandler,
      pointerOutHandler: this.pointerOutHandler,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Bullet, [{
    key: "config",
    get: function get() {
      if ("ConfigContext" in this.context) {
        return this.context.ConfigContext;
      }

      return _config_context.ConfigContext;
    }
  }, {
    key: "argumentAxis",
    get: function get() {
      var state = this._currentState || this.state;
      return state.argumentAxis;
    }
  }, {
    key: "valueAxis",
    get: function get() {
      var state = this._currentState || this.state;
      return state.valueAxis;
    }
  }, {
    key: "canvasState",
    get: function get() {
      var state = this._currentState || this.state;
      return state.canvasState;
    }
  }, {
    key: "offsetState",
    get: function get() {
      var state = this._currentState || this.state;
      return state.offsetState;
    }
  }, {
    key: "tooltipVisible",
    get: function get() {
      var state = this._currentState || this.state;
      return state.tooltipVisible;
    }
  }, {
    key: "__state_canvas",
    get: function get() {
      var state = this._currentState || this.state;
      return this.props.canvas !== undefined ? this.props.canvas : state.canvas;
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var classes = this.props.classes;
      return getCssClasses({
        classes: classes
      });
    }
  }, {
    key: "cssClassName",
    get: function get() {
      var className = this.props.className;
      return getContainerCssClasses({
        className: className
      });
    }
  }, {
    key: "rtlEnabled",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
    }
  }, {
    key: "tooltipEnabled",
    get: function get() {
      return !(this.props.value === undefined && this.props.target === undefined);
    }
  }, {
    key: "tooltipData",
    get: function get() {
      var _this$props2 = this.props,
          target = _this$props2.target,
          tooltip = _this$props2.tooltip,
          value = _this$props2.value;
      var valueText = (0, _utils2.getFormatValue)(value, undefined, {
        format: tooltip === null || tooltip === void 0 ? void 0 : tooltip.format
      });
      var targetText = (0, _utils2.getFormatValue)(target, undefined, {
        format: tooltip === null || tooltip === void 0 ? void 0 : tooltip.format
      });
      return {
        originalValue: value,
        originalTarget: target,
        value: valueText,
        target: targetText,
        valueTexts: ["Actual Value:", valueText, "Target Value:", targetText]
      };
    }
  }, {
    key: "tooltipCoords",
    get: function get() {
      var canvas = this.canvasState;
      var rootOffset = this.offsetState;
      return {
        x: canvas.width / 2 + rootOffset.left,
        y: canvas.height / 2 + rootOffset.top
      };
    }
  }, {
    key: "customizedTooltipProps",
    get: function get() {
      var _this$props3 = this.props,
          onTooltipHidden = _this$props3.onTooltipHidden,
          onTooltipShown = _this$props3.onTooltipShown,
          tooltip = _this$props3.tooltip;

      var customProps = _extends({
        enabled: this.tooltipEnabled,
        eventData: {
          component: this.widgetRef
        },
        onTooltipHidden: onTooltipHidden,
        onTooltipShown: onTooltipShown,
        customizeTooltip: (0, _utils.generateCustomizeTooltipCallback)(tooltip === null || tooltip === void 0 ? void 0 : tooltip.customizeTooltip, tooltip === null || tooltip === void 0 ? void 0 : tooltip.font, this.rtlEnabled),
        data: this.tooltipData
      }, this.tooltipCoords);

      if (!tooltip) {
        return customProps;
      }

      return _extends({}, tooltip, customProps, {
        enabled: tooltip.enabled && this.tooltipEnabled
      });
    }
  }, {
    key: "defaultCanvas",
    get: function get() {
      return {
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT,
        left: DEFAULT_HORIZONTAL_MARGIN,
        right: DEFAULT_HORIZONTAL_MARGIN,
        top: DEFAULT_VERTICAL_MARGIN,
        bottom: DEFAULT_VERTICAL_MARGIN
      };
    }
  }, {
    key: "scaleProps",
    get: function get() {
      var props = this.prepareScaleProps();
      var canvas = this.canvasState;
      var ranges = this.getRange(props);
      this.argumentAxis.update(ranges.arg, canvas, undefined);
      this.valueAxis.update(ranges.val, canvas, undefined);
      return props;
    }
  }, {
    key: "isValidBulletScale",
    get: function get() {
      var _this$props4 = this.props,
          endScaleValue = _this$props4.endScaleValue,
          startScaleValue = _this$props4.startScaleValue,
          target = _this$props4.target,
          value = _this$props4.value;
      var isValidBounds = startScaleValue !== endScaleValue;

      var isValidMin = _number.default.isFinite(startScaleValue);

      var isValidMax = _number.default.isFinite(endScaleValue);

      var isValidValue = _number.default.isFinite(value);

      var isValidTarget = _number.default.isFinite(target);

      return isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue;
    }
  }, {
    key: "targetShape",
    get: function get() {
      return this.getSimpleShape(this.scaleProps.target);
    }
  }, {
    key: "zeroLevelShape",
    get: function get() {
      return this.getSimpleShape(0);
    }
  }, {
    key: "isValidTarget",
    get: function get() {
      var showTarget = this.props.showTarget;
      return !(this.scaleProps.target > this.scaleProps.endScaleValue || this.scaleProps.target < this.scaleProps.startScaleValue || !showTarget);
    }
  }, {
    key: "isValidZeroLevel",
    get: function get() {
      var showZeroLevel = this.props.showZeroLevel;
      return !(this.scaleProps.endScaleValue < 0 || this.scaleProps.startScaleValue > 0 || !showZeroLevel);
    }
  }, {
    key: "barValueShape",
    get: function get() {
      var translatorX = this.argumentAxis.getTranslator();
      var translatorY = this.valueAxis.getTranslator();
      var y2 = translatorY.translate(BAR_VALUE_MIN_Y);
      var y1 = translatorY.translate(BAR_VALUE_MAX_Y);
      var x1;
      var x2;

      if (this.scaleProps.value > 0) {
        x1 = Math.max(0, this.scaleProps.startScaleValue);
        x2 = this.scaleProps.value >= this.scaleProps.endScaleValue ? this.scaleProps.endScaleValue : Math.max(this.scaleProps.value, x1);
      } else {
        x1 = Math.min(0, this.scaleProps.endScaleValue);
        x2 = this.scaleProps.value < this.scaleProps.startScaleValue ? this.scaleProps.startScaleValue : Math.min(this.scaleProps.value, x1);
      }

      x1 = translatorX.translate(x1);
      x2 = translatorX.translate(x2);
      return [x1, y1, x2, y1, x2, y2, x1, y2];
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$canvas = _extends({}, this.props, {
        canvas: this.__state_canvas
      }),
          canvas = _this$props$canvas.canvas,
          canvasChange = _this$props$canvas.canvasChange,
          children = _this$props$canvas.children,
          className = _this$props$canvas.className,
          classes = _this$props$canvas.classes,
          color = _this$props$canvas.color,
          defaultCanvas = _this$props$canvas.defaultCanvas,
          disabled = _this$props$canvas.disabled,
          endScaleValue = _this$props$canvas.endScaleValue,
          margin = _this$props$canvas.margin,
          onContentReady = _this$props$canvas.onContentReady,
          onTooltipHidden = _this$props$canvas.onTooltipHidden,
          onTooltipShown = _this$props$canvas.onTooltipShown,
          pointerEvents = _this$props$canvas.pointerEvents,
          rtlEnabled = _this$props$canvas.rtlEnabled,
          showTarget = _this$props$canvas.showTarget,
          showZeroLevel = _this$props$canvas.showZeroLevel,
          size = _this$props$canvas.size,
          startScaleValue = _this$props$canvas.startScaleValue,
          target = _this$props$canvas.target,
          targetColor = _this$props$canvas.targetColor,
          targetWidth = _this$props$canvas.targetWidth,
          tooltip = _this$props$canvas.tooltip,
          value = _this$props$canvas.value,
          restProps = _objectWithoutProperties(_this$props$canvas, _excluded);

      return restProps;
    }
  }]);

  return Bullet;
}(_vdom.InfernoWrapperComponent);

exports.Bullet = Bullet;
Bullet.defaultProps = _extends({}, BulletProps);