"use strict";

exports.AllDayPanelTitle = exports.AllDayPanelTitleProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _message = _interopRequireDefault(require("../../../../../../../localization/message"));

var _combine_classes = require("../../../../../../utils/combine_classes");

var _excluded = ["className", "visible"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.classes, viewModel.text, 0, _extends({}, viewModel.restAttributes)));
};

exports.viewFunction = viewFunction;
var AllDayPanelTitleProps = {
  className: "",
  visible: true
};
exports.AllDayPanelTitleProps = AllDayPanelTitleProps;

var AllDayPanelTitle = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(AllDayPanelTitle, _InfernoWrapperCompon);

  function AllDayPanelTitle(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = AllDayPanelTitle.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      text: this.text,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };

  _createClass(AllDayPanelTitle, [{
    key: "text",
    get: function get() {
      return _message.default.format("dxScheduler-allDay");
    }
  }, {
    key: "classes",
    get: function get() {
      return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-scheduler-all-day-title": true,
        "dx-scheduler-all-day-title-hidden": !this.props.visible
      }, this.props.className, !!this.props.className));
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          className = _this$props.className,
          visible = _this$props.visible,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return AllDayPanelTitle;
}(_vdom.InfernoWrapperComponent);

exports.AllDayPanelTitle = AllDayPanelTitle;
AllDayPanelTitle.defaultProps = _extends({}, AllDayPanelTitleProps);