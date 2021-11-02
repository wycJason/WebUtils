"use strict";

exports.LayoutBase = exports.LayoutBaseProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _layout_props = require("./layout_props");

var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "dataCellTemplate", "dateTableTemplate", "groupOrientation", "headerPanelTemplate", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", null, [viewModel.props.headerPanelTemplate({
    viewCellsData: viewModel.props.viewData.groupedData[0].dateTable
  }), viewModel.props.dateTableTemplate({
    viewData: viewModel.props.viewData
  })], 0, _extends({}, viewModel.restAttributes)));
};

exports.viewFunction = viewFunction;

var LayoutBaseProps = _extends({}, _layout_props.LayoutProps);

exports.LayoutBaseProps = LayoutBaseProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var LayoutBase = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(LayoutBase, _BaseInfernoComponent);

  function LayoutBase(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = LayoutBase.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  };

  _createClass(LayoutBase, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          addDateTableClass = _this$props.addDateTableClass,
          bottomVirtualRowHeight = _this$props.bottomVirtualRowHeight,
          dataCellTemplate = _this$props.dataCellTemplate,
          dateTableTemplate = _this$props.dateTableTemplate,
          groupOrientation = _this$props.groupOrientation,
          headerPanelTemplate = _this$props.headerPanelTemplate,
          leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
          rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
          topVirtualRowHeight = _this$props.topVirtualRowHeight,
          viewData = _this$props.viewData,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return LayoutBase;
}(_vdom.BaseInfernoComponent);

exports.LayoutBase = LayoutBase;
LayoutBase.defaultProps = _extends({}, LayoutBaseProps);