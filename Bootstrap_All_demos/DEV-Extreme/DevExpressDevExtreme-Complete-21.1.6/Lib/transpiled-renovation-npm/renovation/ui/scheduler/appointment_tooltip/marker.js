"use strict";

exports.Marker = exports.MarkerProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _excluded = ["className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createVNode)(1, "div", "dx-tooltip-appointment-item-marker ".concat(viewModel.props.className), (0, _inferno.createVNode)(1, "div", "dx-tooltip-appointment-item-marker-body", null, 1, {
    "style": (0, _vdom.normalizeStyles)(viewModel.style)
  }), 2);
};

exports.viewFunction = viewFunction;
var MarkerProps = {
  className: ""
};
exports.MarkerProps = MarkerProps;

var Marker = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Marker, _BaseInfernoComponent);

  function Marker(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.state = {
      appointmentColor: undefined
    };
    return _this;
  }

  var _proto = Marker.prototype;

  _proto.set_appointmentColor = function set_appointmentColor(value) {
    var _this2 = this;

    this.setState(function (state) {
      _this2._currentState = state;
      var newValue = value();
      _this2._currentState = null;
      return {
        appointmentColor: newValue
      };
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      appointmentColor: this.appointmentColor,
      style: this.style,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Marker, [{
    key: "appointmentColor",
    get: function get() {
      var state = this._currentState || this.state;
      return state.appointmentColor;
    }
  }, {
    key: "style",
    get: function get() {
      return {
        background: this.appointmentColor
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          className = _this$props.className,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return Marker;
}(_vdom.BaseInfernoComponent);

exports.Marker = Marker;
Marker.defaultProps = _extends({}, MarkerProps);