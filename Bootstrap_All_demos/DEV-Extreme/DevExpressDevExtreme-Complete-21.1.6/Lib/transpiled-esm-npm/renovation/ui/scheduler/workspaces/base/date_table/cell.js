"use strict";

exports.DateTableCellBase = exports.DateTableCellBaseProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _cell = require("../cell");

var _combine_classes = require("../../../../../utils/combine_classes");

var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "otherMonth", "startDate", "text", "today"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
    "isFirstGroupCell": viewModel.props.isFirstGroupCell,
    "isLastGroupCell": viewModel.props.isLastGroupCell,
    "contentTemplate": viewModel.props.dataCellTemplate,
    "contentTemplateProps": viewModel.dataCellTemplateProps,
    "className": viewModel.classes,
    children: viewModel.props.children
  });
};

exports.viewFunction = viewFunction;

var DateTableCellBaseProps = _extends({}, _cell.CellBaseProps, {
  otherMonth: false,
  today: false,
  firstDayOfMonth: false
});

exports.DateTableCellBaseProps = DateTableCellBaseProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var DateTableCellBase = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateTableCellBase, _BaseInfernoComponent);

  function DateTableCellBase(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = DateTableCellBase.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      classes: this.classes,
      dataCellTemplateProps: this.dataCellTemplateProps,
      restAttributes: this.restAttributes
    });
  };

  _createClass(DateTableCellBase, [{
    key: "classes",
    get: function get() {
      var _this$props = this.props,
          allDay = _this$props.allDay,
          className = _this$props.className;
      return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-scheduler-cell-sizes-horizontal": true,
        "dx-scheduler-cell-sizes-vertical": !allDay,
        "dx-scheduler-date-table-cell": !allDay
      }, className, true));
    }
  }, {
    key: "dataCellTemplateProps",
    get: function get() {
      var _this$props2 = this.props,
          allDay = _this$props2.allDay,
          contentTemplateProps = _this$props2.contentTemplateProps,
          endDate = _this$props2.endDate,
          groupIndex = _this$props2.groupIndex,
          groups = _this$props2.groups,
          index = _this$props2.index,
          startDate = _this$props2.startDate;
      return {
        data: _extends({
          startDate: startDate,
          endDate: endDate,
          groups: groups,
          groupIndex: groups ? groupIndex : undefined,
          text: "",
          allDay: allDay || undefined
        }, contentTemplateProps.data),
        index: index
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props3 = this.props,
          allDay = _this$props3.allDay,
          children = _this$props3.children,
          className = _this$props3.className,
          contentTemplate = _this$props3.contentTemplate,
          contentTemplateProps = _this$props3.contentTemplateProps,
          dataCellTemplate = _this$props3.dataCellTemplate,
          endDate = _this$props3.endDate,
          firstDayOfMonth = _this$props3.firstDayOfMonth,
          groupIndex = _this$props3.groupIndex,
          groups = _this$props3.groups,
          index = _this$props3.index,
          isFirstGroupCell = _this$props3.isFirstGroupCell,
          isLastGroupCell = _this$props3.isLastGroupCell,
          otherMonth = _this$props3.otherMonth,
          startDate = _this$props3.startDate,
          text = _this$props3.text,
          today = _this$props3.today,
          restProps = _objectWithoutProperties(_this$props3, _excluded);

      return restProps;
    }
  }]);

  return DateTableCellBase;
}(_vdom.BaseInfernoComponent);

exports.DateTableCellBase = DateTableCellBase;
DateTableCellBase.defaultProps = _extends({}, DateTableCellBaseProps);