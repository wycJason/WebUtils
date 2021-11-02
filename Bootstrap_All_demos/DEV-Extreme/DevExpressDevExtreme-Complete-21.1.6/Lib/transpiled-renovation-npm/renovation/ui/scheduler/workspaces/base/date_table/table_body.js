"use strict";

exports.DateTableBody = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _row = require("../row");

var _utils = require("../../utils");

var _table_body = require("./all_day_panel/table_body");

var _layout_props = require("./layout_props");

var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
      Cell = _ref$props.cellTemplate,
      dataCellTemplate = _ref$props.dataCellTemplate,
      groupOrientation = _ref$props.groupOrientation,
      viewData = _ref$props.viewData;
  return (0, _inferno.createFragment)(viewData.groupedData.map(function (_ref2, index) {
    var allDayPanel = _ref2.allDayPanel,
        dateTable = _ref2.dateTable,
        groupIndex = _ref2.groupIndex;
    return (0, _inferno.createFragment)([(0, _utils.getIsGroupedAllDayPanel)(viewData, index) && (0, _inferno.createComponentVNode)(2, _table_body.AllDayPanelTableBody, {
      "viewData": allDayPanel,
      "dataCellTemplate": dataCellTemplate,
      "isVerticalGroupOrientation": true,
      "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
      "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount
    }), dateTable.map(function (cellsRow) {
      return (0, _inferno.createComponentVNode)(2, _row.Row, {
        "className": "dx-scheduler-date-table-row",
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount,
        children: cellsRow.map(function (_ref3) {
          var endDate = _ref3.endDate,
              firstDayOfMonth = _ref3.firstDayOfMonth,
              cellGroupIndex = _ref3.groupIndex,
              groups = _ref3.groups,
              cellIndex = _ref3.index,
              isFirstGroupCell = _ref3.isFirstGroupCell,
              isLastGroupCell = _ref3.isLastGroupCell,
              key = _ref3.key,
              otherMonth = _ref3.otherMonth,
              startDate = _ref3.startDate,
              text = _ref3.text,
              today = _ref3.today;
          return Cell({
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            startDate: startDate,
            endDate: endDate,
            groups: groups,
            groupIndex: cellGroupIndex,
            index: cellIndex,
            dataCellTemplate: dataCellTemplate,
            key: key,
            text: text,
            today: today,
            otherMonth: otherMonth,
            firstDayOfMonth: firstDayOfMonth
          });
        })
      }, cellsRow[0].key - viewData.leftVirtualCellCount);
    })], 0, (0, _utils.getKeyByGroup)(groupIndex, groupOrientation));
  }), 0);
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var DateTableBody = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateTableBody, _BaseInfernoComponent);

  function DateTableBody(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = DateTableBody.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        cellTemplate: getTemplate(props.cellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  };

  _createClass(DateTableBody, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          addDateTableClass = _this$props.addDateTableClass,
          bottomVirtualRowHeight = _this$props.bottomVirtualRowHeight,
          cellTemplate = _this$props.cellTemplate,
          dataCellTemplate = _this$props.dataCellTemplate,
          groupOrientation = _this$props.groupOrientation,
          leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
          rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
          topVirtualRowHeight = _this$props.topVirtualRowHeight,
          viewData = _this$props.viewData,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return DateTableBody;
}(_vdom.BaseInfernoComponent);

exports.DateTableBody = DateTableBody;
DateTableBody.defaultProps = _extends({}, _layout_props.DateTableLayoutProps);