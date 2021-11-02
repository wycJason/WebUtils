"use strict";

exports.AllDayPanelCell = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _cell = require("../cell");

var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "otherMonth", "startDate", "text", "today"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createComponentVNode)(2, _cell.DateTableCellBase, {
    "className": "dx-scheduler-all-day-table-cell ".concat(viewModel.props.className),
    "startDate": viewModel.props.startDate,
    "endDate": viewModel.props.endDate,
    "groups": viewModel.props.groups,
    "groupIndex": viewModel.props.groupIndex,
    "allDay": true,
    "isFirstGroupCell": viewModel.props.isFirstGroupCell,
    "isLastGroupCell": viewModel.props.isLastGroupCell,
    "index": viewModel.props.index,
    "dataCellTemplate": viewModel.props.dataCellTemplate
  });
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var AllDayPanelCell = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AllDayPanelCell, _BaseInfernoComponent);

  function AllDayPanelCell(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = AllDayPanelCell.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      restAttributes: this.restAttributes
    });
  };

  _createClass(AllDayPanelCell, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          allDay = _this$props.allDay,
          children = _this$props.children,
          className = _this$props.className,
          contentTemplate = _this$props.contentTemplate,
          contentTemplateProps = _this$props.contentTemplateProps,
          dataCellTemplate = _this$props.dataCellTemplate,
          endDate = _this$props.endDate,
          firstDayOfMonth = _this$props.firstDayOfMonth,
          groupIndex = _this$props.groupIndex,
          groups = _this$props.groups,
          index = _this$props.index,
          isFirstGroupCell = _this$props.isFirstGroupCell,
          isLastGroupCell = _this$props.isLastGroupCell,
          otherMonth = _this$props.otherMonth,
          startDate = _this$props.startDate,
          text = _this$props.text,
          today = _this$props.today,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return AllDayPanelCell;
}(_vdom.BaseInfernoComponent);

exports.AllDayPanelCell = AllDayPanelCell;
AllDayPanelCell.defaultProps = _extends({}, _cell.DateTableCellBaseProps);