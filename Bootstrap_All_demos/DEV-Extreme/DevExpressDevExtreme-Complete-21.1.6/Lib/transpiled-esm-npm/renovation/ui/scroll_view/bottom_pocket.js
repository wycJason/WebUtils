"use strict";

exports.BottomPocket = exports.BottomPocketPropsType = exports.BottomPocketProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _load_indicator = require("../load_indicator");

var _type = require("../../../core/utils/type");

var _consts = require("./common/consts");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _base_props = require("../common/base_props");

var _combine_classes = require("../../utils/combine_classes");

var _excluded = ["bottomPocketRef", "reachBottomText", "visible"];

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
  var bottomPocketRef = viewModel.props.bottomPocketRef,
      reachBottomClasses = viewModel.reachBottomClasses,
      reachBottomText = viewModel.reachBottomText;
  return (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_BOTTOM_POCKET_CLASS, (0, _inferno.createVNode)(1, "div", reachBottomClasses, [(0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS, (0, _inferno.createVNode)(1, "div", null, reachBottomText, 0), 2)], 4), 2, null, null, bottomPocketRef);
};

exports.viewFunction = viewFunction;
var BottomPocketProps = {};
exports.BottomPocketProps = BottomPocketProps;
var BottomPocketPropsType = {
  visible: _base_props.BaseWidgetProps.visible
};
exports.BottomPocketPropsType = BottomPocketPropsType;

var BottomPocket = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(BottomPocket, _BaseInfernoComponent);

  function BottomPocket(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = BottomPocket.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      reachBottomText: this.reachBottomText,
      reachBottomClasses: this.reachBottomClasses,
      restAttributes: this.restAttributes
    });
  };

  _createClass(BottomPocket, [{
    key: "reachBottomText",
    get: function get() {
      var reachBottomText = this.props.reachBottomText;

      if ((0, _type.isDefined)(reachBottomText)) {
        return reachBottomText;
      }

      return _message.default.format("dxScrollView-reachBottomText");
    }
  }, {
    key: "reachBottomClasses",
    get: function get() {
      var _classesMap;

      var visible = this.props.visible;
      var classesMap = (_classesMap = {}, _defineProperty(_classesMap, _consts.SCROLLVIEW_REACHBOTTOM_CLASS, true), _defineProperty(_classesMap, "dx-state-invisible", !visible), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          bottomPocketRef = _this$props.bottomPocketRef,
          reachBottomText = _this$props.reachBottomText,
          visible = _this$props.visible,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return BottomPocket;
}(_vdom.BaseInfernoComponent);

exports.BottomPocket = BottomPocket;
BottomPocket.defaultProps = _extends({}, BottomPocketPropsType);