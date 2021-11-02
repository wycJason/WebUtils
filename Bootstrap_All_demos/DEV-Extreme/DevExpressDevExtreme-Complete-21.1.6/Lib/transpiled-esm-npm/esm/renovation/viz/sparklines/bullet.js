import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["canvas", "canvasChange", "children", "className", "classes", "color", "defaultCanvas", "disabled", "endScaleValue", "margin", "onContentReady", "onTooltipHidden", "onTooltipShown", "pointerEvents", "rtlEnabled", "showTarget", "showZeroLevel", "size", "startScaleValue", "target", "targetColor", "targetWidth", "tooltip", "value"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Fragment } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from "@devextreme/vdom";
import { combineClasses } from "../../utils/combine_classes";
import { resolveRtlEnabled } from "../../utils/resolve_rtl";
import getElementOffset from "../../utils/get_element_offset";
import { BaseWidgetProps } from "../common/base_props";
import { BaseWidget } from "../common/base_widget";
import { createAxis, generateCustomizeTooltipCallback } from "./utils";
import { ConfigContext } from "../../common/config_context";
import { PathSvgElement } from "../common/renderers/svg_path";
import { Tooltip as TooltipComponent } from "../common/tooltip";
import { getFormatValue, pointInCanvas } from "../common/utils";
import eventsEngine from "../../../events/core/events_engine";
import { addNamespace } from "../../../events/utils/index";
import pointerEvents from "../../../events/pointer";
import domAdapter from "../../../core/dom_adapter";
import Number from "../../../core/polyfills/number";
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
var POINTER_ACTION = addNamespace([pointerEvents.down, pointerEvents.move], EVENT_NS);

var inCanvas = (canvas, x, y) => {
  var {
    height,
    width
  } = canvas;
  return pointInCanvas({
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height
  }, x, y);
};

var getCssClasses = _ref => {
  var {
    classes
  } = _ref;
  var rootClassesMap = {
    dxb: true,
    "dxb-bullet": true,
    [String(classes)]: !!classes
  };
  return combineClasses(rootClassesMap);
};

var getContainerCssClasses = _ref2 => {
  var {
    className
  } = _ref2;
  var rootClassesMap = {
    "dx-bullet": true,
    [String(className)]: !!className
  };
  return combineClasses(rootClassesMap);
};

export var viewFunction = viewModel => {
  var {
    color,
    disabled,
    margin,
    onContentReady,
    size,
    targetColor,
    targetWidth
  } = viewModel.props;
  var {
    barValueShape,
    customizedTooltipProps,
    isValidBulletScale,
    isValidTarget,
    isValidZeroLevel,
    targetShape,
    zeroLevelShape
  } = viewModel;
  return createFragment([normalizeProps(createComponentVNode(2, BaseWidget, _extends({
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
    children: isValidBulletScale ? createFragment([createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": barValueShape,
      "className": "dxb-bar-value",
      "strokeLineCap": "square",
      "fill": color
    }), isValidTarget && createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": targetShape,
      "className": "dxb-target",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": targetWidth
    }), isValidZeroLevel && createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": zeroLevelShape,
      "className": "dxb-zero-level",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": 1
    })], 0) : undefined
  }), null, viewModel.widgetRef)), customizedTooltipProps.enabled && normalizeProps(createComponentVNode(2, TooltipComponent, _extends({
    "rootWidget": viewModel.widgetRootRef
  }, customizedTooltipProps, {
    "visible": viewModel.tooltipVisible
  }), null, viewModel.tooltipRef))], 0);
};
export var BulletProps = _extends({}, BaseWidgetProps, {
  value: 0,
  color: "#e8c267",
  target: 0,
  targetColor: "#666666",
  targetWidth: 4,
  showTarget: true,
  showZeroLevel: true,
  startScaleValue: 0
});
import { createRef as infernoCreateRef } from "inferno";
export class Bullet extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.widgetRef = infernoCreateRef();
    this.tooltipRef = infernoCreateRef();
    this.widgetRootRef = infernoCreateRef();
    this.state = {
      argumentAxis: createAxis(true),
      valueAxis: createAxis(false),
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
      canvas: this.props.canvas !== undefined ? this.props.canvas : this.props.defaultCanvas
    };
    this.tooltipEffect = this.tooltipEffect.bind(this);
    this.tooltipOutEffect = this.tooltipOutEffect.bind(this);
    this.onCanvasChange = this.onCanvasChange.bind(this);
    this.prepareScaleProps = this.prepareScaleProps.bind(this);
    this.getRange = this.getRange.bind(this);
    this.getSimpleShape = this.getSimpleShape.bind(this);
    this.pointerHandler = this.pointerHandler.bind(this);
    this.pointerOutHandler = this.pointerOutHandler.bind(this);
  }

  get config() {
    if ("ConfigContext" in this.context) {
      return this.context.ConfigContext;
    }

    return ConfigContext;
  }

  createEffects() {
    return [new InfernoEffect(this.tooltipEffect, [this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.canvasState, this.offsetState]), new InfernoEffect(this.tooltipOutEffect, [this.tooltipVisible, this.canvasState])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.canvasState, this.offsetState]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.tooltipVisible, this.canvasState]);
  }

  get argumentAxis() {
    var state = this._currentState || this.state;
    return state.argumentAxis;
  }

  set_argumentAxis(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        argumentAxis: newValue
      };
    });
  }

  get valueAxis() {
    var state = this._currentState || this.state;
    return state.valueAxis;
  }

  set_valueAxis(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        valueAxis: newValue
      };
    });
  }

  get canvasState() {
    var state = this._currentState || this.state;
    return state.canvasState;
  }

  set_canvasState(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        canvasState: newValue
      };
    });
  }

  get offsetState() {
    var state = this._currentState || this.state;
    return state.offsetState;
  }

  set_offsetState(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        offsetState: newValue
      };
    });
  }

  get tooltipVisible() {
    var state = this._currentState || this.state;
    return state.tooltipVisible;
  }

  set_tooltipVisible(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        tooltipVisible: newValue
      };
    });
  }

  get __state_canvas() {
    var state = this._currentState || this.state;
    return this.props.canvas !== undefined ? this.props.canvas : state.canvas;
  }

  set_canvas(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.canvasChange(newValue);
      this._currentState = null;
      return {
        canvas: newValue
      };
    });
  }

  tooltipEffect() {
    var {
      disabled
    } = this.props;

    if (!disabled && this.customizedTooltipProps.enabled) {
      var _this$widgetRef$curre;

      var svg = (_this$widgetRef$curre = this.widgetRef.current) === null || _this$widgetRef$curre === void 0 ? void 0 : _this$widgetRef$curre.svg();
      eventsEngine.on(svg, POINTER_ACTION, this.pointerHandler);
      return () => {
        eventsEngine.off(svg, POINTER_ACTION, this.pointerHandler);
      };
    }

    return undefined;
  }

  tooltipOutEffect() {
    if (this.tooltipVisible) {
      var document = domAdapter.getDocument();
      eventsEngine.on(document, POINTER_ACTION, this.pointerOutHandler);
      return () => {
        eventsEngine.off(document, POINTER_ACTION, this.pointerOutHandler);
      };
    }

    return undefined;
  }

  get cssClasses() {
    var {
      classes
    } = this.props;
    return getCssClasses({
      classes
    });
  }

  get cssClassName() {
    var {
      className
    } = this.props;
    return getContainerCssClasses({
      className
    });
  }

  get rtlEnabled() {
    var {
      rtlEnabled
    } = this.props;
    return resolveRtlEnabled(rtlEnabled, this.config);
  }

  get tooltipEnabled() {
    return !(this.props.value === undefined && this.props.target === undefined);
  }

  get tooltipData() {
    var {
      target,
      tooltip,
      value
    } = this.props;
    var valueText = getFormatValue(value, undefined, {
      format: tooltip === null || tooltip === void 0 ? void 0 : tooltip.format
    });
    var targetText = getFormatValue(target, undefined, {
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

  get tooltipCoords() {
    var canvas = this.canvasState;
    var rootOffset = this.offsetState;
    return {
      x: canvas.width / 2 + rootOffset.left,
      y: canvas.height / 2 + rootOffset.top
    };
  }

  get customizedTooltipProps() {
    var {
      onTooltipHidden,
      onTooltipShown,
      tooltip
    } = this.props;

    var customProps = _extends({
      enabled: this.tooltipEnabled,
      eventData: {
        component: this.widgetRef
      },
      onTooltipHidden,
      onTooltipShown,
      customizeTooltip: generateCustomizeTooltipCallback(tooltip === null || tooltip === void 0 ? void 0 : tooltip.customizeTooltip, tooltip === null || tooltip === void 0 ? void 0 : tooltip.font, this.rtlEnabled),
      data: this.tooltipData
    }, this.tooltipCoords);

    if (!tooltip) {
      return customProps;
    }

    return _extends({}, tooltip, customProps, {
      enabled: tooltip.enabled && this.tooltipEnabled
    });
  }

  get defaultCanvas() {
    return {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
      left: DEFAULT_HORIZONTAL_MARGIN,
      right: DEFAULT_HORIZONTAL_MARGIN,
      top: DEFAULT_VERTICAL_MARGIN,
      bottom: DEFAULT_VERTICAL_MARGIN
    };
  }

  get scaleProps() {
    var props = this.prepareScaleProps();
    var canvas = this.canvasState;
    var ranges = this.getRange(props);
    this.argumentAxis.update(ranges.arg, canvas, undefined);
    this.valueAxis.update(ranges.val, canvas, undefined);
    return props;
  }

  get isValidBulletScale() {
    var {
      endScaleValue,
      startScaleValue,
      target,
      value
    } = this.props;
    var isValidBounds = startScaleValue !== endScaleValue;
    var isValidMin = Number.isFinite(startScaleValue);
    var isValidMax = Number.isFinite(endScaleValue);
    var isValidValue = Number.isFinite(value);
    var isValidTarget = Number.isFinite(target);
    return isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue;
  }

  get targetShape() {
    return this.getSimpleShape(this.scaleProps.target);
  }

  get zeroLevelShape() {
    return this.getSimpleShape(0);
  }

  get isValidTarget() {
    var {
      showTarget
    } = this.props;
    return !(this.scaleProps.target > this.scaleProps.endScaleValue || this.scaleProps.target < this.scaleProps.startScaleValue || !showTarget);
  }

  get isValidZeroLevel() {
    var {
      showZeroLevel
    } = this.props;
    return !(this.scaleProps.endScaleValue < 0 || this.scaleProps.startScaleValue > 0 || !showZeroLevel);
  }

  get barValueShape() {
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

  onCanvasChange(canvas) {
    var _this$widgetRef$curre2;

    this.set_canvasState(() => canvas);
    var svgElement = ((_this$widgetRef$curre2 = this.widgetRef.current) === null || _this$widgetRef$curre2 === void 0 ? void 0 : _this$widgetRef$curre2.svg()) || undefined;
    this.set_offsetState(() => {
      var _getElementOffset;

      return (_getElementOffset = getElementOffset(svgElement)) !== null && _getElementOffset !== void 0 ? _getElementOffset : DEFAULT_OFFSET;
    });
  }

  prepareScaleProps() {
    var {
      endScaleValue,
      startScaleValue,
      target,
      value
    } = this.props;
    var tmpProps = {
      inverted: false,
      value,
      target,
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
  }

  getRange(scaleProps) {
    var {
      endScaleValue,
      inverted,
      startScaleValue
    } = scaleProps;
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
  }

  getSimpleShape(value) {
    var translatorY = this.valueAxis.getTranslator();
    var x = this.argumentAxis.getTranslator().translate(value);
    return [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)];
  }

  pointerHandler() {
    this.set_tooltipVisible(() => true);
  }

  pointerOutHandler(_ref3) {
    var {
      pageX,
      pageY
    } = _ref3;
    var {
      left,
      top
    } = this.offsetState;
    var x = Math.floor(pageX - left);
    var y = Math.floor(pageY - top);

    if (!inCanvas(this.canvasState, x, y)) {
      this.set_tooltipVisible(() => false);
    }
  }

  get restAttributes() {
    var _this$props$canvas = _extends({}, this.props, {
      canvas: this.__state_canvas
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$canvas, _excluded);

    return restProps;
  }

  render() {
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
  }

}
Bullet.defaultProps = _extends({}, BulletProps);