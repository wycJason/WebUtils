"use strict";

exports.TimePanelCell = exports.TimePanelCellProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _cell = require("../cell");

var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text", "timeCellTemplate"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
    "isFirstGroupCell": viewModel.props.isFirstGroupCell,
    "isLastGroupCell": viewModel.props.isLastGroupCell,
    "contentTemplate": viewModel.props.timeCellTemplate,
    "contentTemplateProps": viewModel.timeCellTemplateProps,
    "className": "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(viewModel.props.className),
    children: (0, _inferno.createVNode)(1, "div", null, viewModel.props.text, 0)
  });
};

exports.viewFunction = viewFunction;

var TimePanelCellProps = _extends({}, _cell.CellBaseProps);

exports.TimePanelCellProps = TimePanelCellProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var TimePanelCell = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TimePanelCell, _BaseInfernoComponent);

  function TimePanelCell(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = TimePanelCell.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      timeCellTemplateProps: this.timeCellTemplateProps,
      restAttributes: this.restAttributes
    });
  };

  _createClass(TimePanelCell, [{
    key: "timeCellTemplateProps",
    get: function get() {
      var _this$props = this.props,
          groupIndex = _this$props.groupIndex,
          groups = _this$props.groups,
          index = _this$props.index,
          startDate = _this$props.startDate,
          text = _this$props.text;
      return {
        data: {
          date: startDate,
          groups: groups,
          groupIndex: groupIndex,
          text: text
        },
        index: index
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          allDay = _this$props2.allDay,
          children = _this$props2.children,
          className = _this$props2.className,
          contentTemplate = _this$props2.contentTemplate,
          contentTemplateProps = _this$props2.contentTemplateProps,
          endDate = _this$props2.endDate,
          groupIndex = _this$props2.groupIndex,
          groups = _this$props2.groups,
          index = _this$props2.index,
          isFirstGroupCell = _this$props2.isFirstGroupCell,
          isLastGroupCell = _this$props2.isLastGroupCell,
          startDate = _this$props2.startDate,
          text = _this$props2.text,
          timeCellTemplate = _this$props2.timeCellTemplate,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return TimePanelCell;
}(_vdom.BaseInfernoComponent);

exports.TimePanelCell = TimePanelCell;
TimePanelCell.defaultProps = _extends({}, TimePanelCellProps);