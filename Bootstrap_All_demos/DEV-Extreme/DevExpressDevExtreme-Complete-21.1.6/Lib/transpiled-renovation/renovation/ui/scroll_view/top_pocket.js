"use strict";

exports.TopPocket = exports.TopPocketPropsType = exports.TopPocketProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _load_indicator = require("../load_indicator");

var _type = require("../../../core/utils/type");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _base_props = require("../common/base_props");

var _combine_classes = require("../../utils/combine_classes");

var _consts = require("./common/consts");

var _excluded = ["pocketState", "pocketTop", "pullDownIconAngle", "pullDownOpacity", "pullDownTop", "pullDownTranslateTop", "pulledDownText", "pullingDownText", "refreshStrategy", "refreshingText", "topPocketRef", "topPocketTranslateTop", "visible"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      refreshStrategy = _viewModel$props.refreshStrategy,
      topPocketRef = _viewModel$props.topPocketRef,
      pullDownClasses = viewModel.pullDownClasses,
      pullDownIconStyles = viewModel.pullDownIconStyles,
      pullDownRef = viewModel.pullDownRef,
      pullDownStyles = viewModel.pullDownStyles,
      pulledDownText = viewModel.pulledDownText,
      pullingDownText = viewModel.pullingDownText,
      readyVisibleClass = viewModel.readyVisibleClass,
      refreshVisibleClass = viewModel.refreshVisibleClass,
      refreshingText = viewModel.refreshingText,
      releaseVisibleClass = viewModel.releaseVisibleClass,
      topPocketStyles = viewModel.topPocketStyles;
  return (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_TOP_POCKET_CLASS, (0, _inferno.createVNode)(1, "div", pullDownClasses, [refreshStrategy !== "swipeDown" && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_IMAGE_CLASS), refreshStrategy === "swipeDown" && (0, _inferno.createVNode)(1, "div", _consts.PULLDOWN_ICON_CLASS, null, 1, {
    "style": (0, _vdom.normalizeStyles)(pullDownIconStyles)
  }), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), refreshStrategy !== "swipeDown" && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_TEXT_CLASS, [(0, _inferno.createVNode)(1, "div", releaseVisibleClass, pullingDownText, 0), (0, _inferno.createVNode)(1, "div", readyVisibleClass, pulledDownText, 0), (0, _inferno.createVNode)(1, "div", refreshVisibleClass, refreshingText, 0)], 4)], 0, {
    "style": (0, _vdom.normalizeStyles)(pullDownStyles)
  }, null, pullDownRef), 2, {
    "style": (0, _vdom.normalizeStyles)(topPocketStyles)
  }, null, topPocketRef);
};

exports.viewFunction = viewFunction;
var TopPocketProps = {
  pocketState: _consts.TopPocketState.STATE_RELEASED,
  pullDownTop: 0,
  pullDownTranslateTop: 0,
  pullDownIconAngle: 0,
  pullDownOpacity: 0,
  pocketTop: 0,
  topPocketTranslateTop: 0
};
exports.TopPocketProps = TopPocketProps;
var TopPocketPropsType = {
  pocketState: TopPocketProps.pocketState,
  pullDownTop: TopPocketProps.pullDownTop,
  pullDownTranslateTop: TopPocketProps.pullDownTranslateTop,
  pullDownIconAngle: TopPocketProps.pullDownIconAngle,
  pullDownOpacity: TopPocketProps.pullDownOpacity,
  pocketTop: TopPocketProps.pocketTop,
  topPocketTranslateTop: TopPocketProps.topPocketTranslateTop,
  visible: _base_props.BaseWidgetProps.visible
};
exports.TopPocketPropsType = TopPocketPropsType;

var TopPocket = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TopPocket, _BaseInfernoComponent);

  function TopPocket(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.pullDownRef = (0, _inferno.createRef)();
    return _this;
  }

  var _proto = TopPocket.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pullDownRef: this.pullDownRef,
      releaseVisibleClass: this.releaseVisibleClass,
      readyVisibleClass: this.readyVisibleClass,
      refreshVisibleClass: this.refreshVisibleClass,
      pullingDownText: this.pullingDownText,
      pulledDownText: this.pulledDownText,
      refreshingText: this.refreshingText,
      pullDownClasses: this.pullDownClasses,
      pullDownStyles: this.pullDownStyles,
      topPocketStyles: this.topPocketStyles,
      pullDownIconStyles: this.pullDownIconStyles,
      restAttributes: this.restAttributes
    });
  };

  _createClass(TopPocket, [{
    key: "releaseVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_RELEASED ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "readyVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_READY ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "refreshVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_REFRESHING ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "pullingDownText",
    get: function get() {
      var pullingDownText = this.props.pullingDownText;

      if ((0, _type.isDefined)(pullingDownText)) {
        return pullingDownText;
      }

      return _message.default.format("dxScrollView-pullingDownText");
    }
  }, {
    key: "pulledDownText",
    get: function get() {
      var pulledDownText = this.props.pulledDownText;

      if ((0, _type.isDefined)(pulledDownText)) {
        return pulledDownText;
      }

      return _message.default.format("dxScrollView-pulledDownText");
    }
  }, {
    key: "refreshingText",
    get: function get() {
      var refreshingText = this.props.refreshingText;

      if ((0, _type.isDefined)(refreshingText)) {
        return refreshingText;
      }

      return _message.default.format("dxScrollView-refreshingText");
    }
  }, {
    key: "pullDownClasses",
    get: function get() {
      var _classesMap;

      var _this$props = this.props,
          pocketState = _this$props.pocketState,
          visible = _this$props.visible;
      var classesMap = (_classesMap = {}, _defineProperty(_classesMap, _consts.SCROLLVIEW_PULLDOWN, true), _defineProperty(_classesMap, _consts.SCROLLVIEW_PULLDOWN_READY_CLASS, pocketState === _consts.TopPocketState.STATE_READY), _defineProperty(_classesMap, _consts.SCROLLVIEW_PULLDOWN_LOADING_CLASS, pocketState === _consts.TopPocketState.STATE_REFRESHING), _defineProperty(_classesMap, "dx-state-invisible", !visible), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "pullDownStyles",
    get: function get() {
      if (this.props.refreshStrategy === "swipeDown") {
        return {
          opacity: this.props.pullDownOpacity,
          transform: "translate(0px, ".concat(this.props.pullDownTranslateTop, "px)")
        };
      }

      return undefined;
    }
  }, {
    key: "topPocketStyles",
    get: function get() {
      if (this.props.refreshStrategy === "pullDown") {
        return {
          top: "".concat(this.props.pocketTop, "px"),
          transform: "translate(0px, ".concat(this.props.topPocketTranslateTop, "px)")
        };
      }

      return undefined;
    }
  }, {
    key: "pullDownIconStyles",
    get: function get() {
      return {
        transform: "rotate(".concat(this.props.pullDownIconAngle, "deg)")
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          pocketState = _this$props2.pocketState,
          pocketTop = _this$props2.pocketTop,
          pullDownIconAngle = _this$props2.pullDownIconAngle,
          pullDownOpacity = _this$props2.pullDownOpacity,
          pullDownTop = _this$props2.pullDownTop,
          pullDownTranslateTop = _this$props2.pullDownTranslateTop,
          pulledDownText = _this$props2.pulledDownText,
          pullingDownText = _this$props2.pullingDownText,
          refreshStrategy = _this$props2.refreshStrategy,
          refreshingText = _this$props2.refreshingText,
          topPocketRef = _this$props2.topPocketRef,
          topPocketTranslateTop = _this$props2.topPocketTranslateTop,
          visible = _this$props2.visible,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return TopPocket;
}(_vdom.BaseInfernoComponent);

exports.TopPocket = TopPocket;
TopPocket.defaultProps = _extends({}, TopPocketPropsType);