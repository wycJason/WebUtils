"use strict";

exports.LayoutManager = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _combine_classes = require("../../utils/combine_classes");

var _widget = require("../common/widget");

var _layout_manager_props = require("./layout_manager_props");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  var cssClasses = viewModel.cssClasses,
      restAttributes = viewModel.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "classes": cssClasses
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var LayoutManager = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(LayoutManager, _BaseInfernoComponent);

  function LayoutManager(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = LayoutManager.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      cssClasses: this.cssClasses,
      restAttributes: this.restAttributes
    });
  };

  _createClass(LayoutManager, [{
    key: "cssClasses",
    get: function get() {
      return (0, _combine_classes.combineClasses)({
        "dx-layout-manager": true
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var restProps = _extends({}, this.props);

      return restProps;
    }
  }]);

  return LayoutManager;
}(_vdom.BaseInfernoComponent);

exports.LayoutManager = LayoutManager;
LayoutManager.defaultProps = _extends({}, _layout_manager_props.LayoutManagerProps);