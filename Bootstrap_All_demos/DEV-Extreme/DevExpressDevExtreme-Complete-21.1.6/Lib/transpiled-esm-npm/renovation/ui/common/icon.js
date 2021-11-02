"use strict";

exports.Icon = exports.IconProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _icon = require("../../../core/utils/icon");

var _excluded = ["position", "source"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var viewFunction = function viewFunction(_ref) {
  var cssClass = _ref.cssClass,
      source = _ref.props.source,
      sourceType = _ref.sourceType;
  return (0, _inferno.createFragment)([sourceType === "dxIcon" && (0, _inferno.createVNode)(1, "i", "dx-icon dx-icon-".concat(source, " ").concat(cssClass)), sourceType === "fontIcon" && (0, _inferno.createVNode)(1, "i", "dx-icon ".concat(source, " ").concat(cssClass)), sourceType === "image" && (0, _inferno.createVNode)(1, "img", "dx-icon ".concat(cssClass), null, 1, {
    "alt": "",
    "src": source
  }), sourceType === "svg" && (0, _inferno.createVNode)(1, "i", "dx-icon dx-svg-icon ".concat(cssClass), source, 0)], 0);
};

exports.viewFunction = viewFunction;
var IconProps = {
  position: "left",
  source: ""
};
exports.IconProps = IconProps;

var Icon = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Icon, _BaseInfernoComponent);

  function Icon(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      sourceType: this.sourceType,
      cssClass: this.cssClass,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Icon, [{
    key: "sourceType",
    get: function get() {
      return (0, _icon.getImageSourceType)(this.props.source);
    }
  }, {
    key: "cssClass",
    get: function get() {
      return this.props.position !== "left" ? "dx-icon-right" : "";
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          position = _this$props.position,
          source = _this$props.source,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return Icon;
}(_vdom.BaseInfernoComponent);

exports.Icon = Icon;
Icon.defaultProps = _extends({}, IconProps);