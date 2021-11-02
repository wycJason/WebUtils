"use strict";

exports.GridBaseViews = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _combine_classes = require("../../../utils/combine_classes");

var _grid_base_view_wrapper = require("./grid_base_view_wrapper");

var _data_grid_props = require("../data_grid/common/data_grid_props");

var _excluded = ["className", "role", "showBorders", "views"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GRIDBASE_CONTAINER_CLASS = "dx-gridbase-container";
var BORDERS_CLASS = "borders";

var viewFunction = function viewFunction(_ref) {
  var className = _ref.className,
      _ref$props = _ref.props,
      role = _ref$props.role,
      views = _ref$props.views;
  return (0, _inferno.createVNode)(1, "div", className, views.map(function (_ref2) {
    var name = _ref2.name,
        view = _ref2.view;
    return (0, _inferno.createComponentVNode)(2, _grid_base_view_wrapper.GridBaseViewWrapper, {
      "view": view
    }, name);
  }), 0, {
    "role": role
  });
};

exports.viewFunction = viewFunction;
var GridBaseViewPropsType = {
  showBorders: _data_grid_props.DataGridProps.showBorders
};

var GridBaseViews = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(GridBaseViews, _BaseInfernoComponent);

  function GridBaseViews(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = GridBaseViews.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      className: this.className,
      restAttributes: this.restAttributes
    });
  };

  _createClass(GridBaseViews, [{
    key: "className",
    get: function get() {
      var _combineClasses;

      var showBorders = this.props.showBorders;
      return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, GRIDBASE_CONTAINER_CLASS, true), _defineProperty(_combineClasses, "".concat(this.props.className), !!this.props.className), _defineProperty(_combineClasses, "".concat(this.props.className, "-").concat(BORDERS_CLASS), !!showBorders), _combineClasses));
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          className = _this$props.className,
          role = _this$props.role,
          showBorders = _this$props.showBorders,
          views = _this$props.views,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return GridBaseViews;
}(_vdom.BaseInfernoComponent);

exports.GridBaseViews = GridBaseViews;
GridBaseViews.defaultProps = _extends({}, GridBaseViewPropsType);