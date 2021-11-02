"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _check_box = _interopRequireDefault(require("../component_wrapper/check_box"));

var _check_box2 = require("./check_box");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CheckBox = /*#__PURE__*/function (_BaseComponent) {
  _inheritsLoose(CheckBox, _BaseComponent);

  function CheckBox() {
    return _BaseComponent.apply(this, arguments) || this;
  }

  var _proto = CheckBox.prototype;

  _proto.getProps = function getProps() {
    var props = _BaseComponent.prototype.getProps.call(this);

    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  };

  _proto.focus = function focus() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus();
  };

  _proto._getActionConfigs = function _getActionConfigs() {
    return {
      onFocusIn: {},
      onClick: {},
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  };

  _createClass(CheckBox, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [["value", false, "valueChange"]],
        allowNull: ["validationError", "validationErrors", "defaultValue", "value"],
        elements: [],
        templates: [],
        props: ["activeStateEnabled", "hoverStateEnabled", "validationError", "validationErrors", "text", "validationMessageMode", "validationStatus", "name", "readOnly", "isValid", "useInkRipple", "onFocusIn", "saveValueChangeEvent", "defaultValue", "valueChange", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onClick", "onContentReady", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "value"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _check_box2.CheckBox;
    }
  }]);

  return CheckBox;
}(_check_box.default);

exports.default = CheckBox;
(0, _component_registrator.default)("dxCheckBox", CheckBox);
module.exports = exports.default;
module.exports.default = exports.default;