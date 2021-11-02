"use strict";

exports.AllDayPanelLayout = exports.AllDayPanelLayoutProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _combine_classes = require("../../../../../../utils/combine_classes");

var _table = require("../../table");

var _table_body = require("./table_body");

var _layout_props = require("../../layout_props");

var _const = require("../../../const");

var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "className", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData", "visible"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.classes, viewModel.props.visible && (0, _inferno.createComponentVNode)(2, _table.Table, {
    "className": "dx-scheduler-all-day-table",
    "height": viewModel.emptyTableHeight,
    children: (0, _inferno.createComponentVNode)(2, _table_body.AllDayPanelTableBody, {
      "viewData": viewModel.allDayPanelData,
      "leftVirtualCellWidth": viewModel.props.viewData.leftVirtualCellWidth,
      "rightVirtualCellWidth": viewModel.props.viewData.rightVirtualCellWidth,
      "leftVirtualCellCount": viewModel.props.viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewModel.props.viewData.rightVirtualCellCount,
      "dataCellTemplate": viewModel.props.dataCellTemplate
    })
  }), 0, _extends({}, viewModel.restAttributes)));
};

exports.viewFunction = viewFunction;

var AllDayPanelLayoutProps = _extends({}, _layout_props.LayoutProps, {
  className: "",
  visible: true
});

exports.AllDayPanelLayoutProps = AllDayPanelLayoutProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var AllDayPanelLayout = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(AllDayPanelLayout, _InfernoWrapperCompon);

  function AllDayPanelLayout(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = AllDayPanelLayout.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      allDayPanelData: this.allDayPanelData,
      emptyTableHeight: this.emptyTableHeight,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };

  _createClass(AllDayPanelLayout, [{
    key: "allDayPanelData",
    get: function get() {
      return this.props.viewData.groupedData[0].allDayPanel;
    }
  }, {
    key: "emptyTableHeight",
    get: function get() {
      return this.allDayPanelData ? undefined : _const.DefaultSizes.allDayPanelHeight;
    }
  }, {
    key: "classes",
    get: function get() {
      return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-scheduler-all-day-panel": true,
        "dx-hidden": !this.props.visible
      }, this.props.className, !!this.props.className));
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          addDateTableClass = _this$props.addDateTableClass,
          bottomVirtualRowHeight = _this$props.bottomVirtualRowHeight,
          className = _this$props.className,
          dataCellTemplate = _this$props.dataCellTemplate,
          groupOrientation = _this$props.groupOrientation,
          leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
          rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
          topVirtualRowHeight = _this$props.topVirtualRowHeight,
          viewData = _this$props.viewData,
          visible = _this$props.visible,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return AllDayPanelLayout;
}(_vdom.InfernoWrapperComponent);

exports.AllDayPanelLayout = AllDayPanelLayout;
AllDayPanelLayout.defaultProps = _extends({}, AllDayPanelLayoutProps);