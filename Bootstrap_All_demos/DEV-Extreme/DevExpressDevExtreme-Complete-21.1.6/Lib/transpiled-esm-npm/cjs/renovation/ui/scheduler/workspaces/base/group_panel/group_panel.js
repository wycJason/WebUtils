"use strict";

exports.GroupPanel = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _utils = require("../../utils");

var _group_panel_props = require("./group_panel_props");

var _layout = require("./vertical/layout");

var _layout2 = require("./horizontal/layout");

var _utils2 = require("./utils");

var _excluded = ["baseColSpan", "className", "columnCountPerGroup", "groupByDate", "groupOrientation", "groups", "height", "resourceCellTemplate"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var groupsRenderData = _ref.groupsRenderData,
      Layout = _ref.layout,
      _ref$props = _ref.props,
      baseColSpan = _ref$props.baseColSpan,
      className = _ref$props.className,
      groupByDate = _ref$props.groupByDate,
      groups = _ref$props.groups,
      height = _ref$props.height,
      resourceCellTemplate = _ref$props.resourceCellTemplate,
      restAttributes = _ref.restAttributes;
  return (0, _inferno.createComponentVNode)(2, Layout, {
    "groups": groups,
    "height": height,
    "resourceCellTemplate": resourceCellTemplate,
    "groupByDate": groupByDate,
    "className": className,
    "groupsRenderData": groupsRenderData,
    "baseColSpan": baseColSpan,
    "styles": restAttributes.style
  });
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var GroupPanel = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(GroupPanel, _InfernoWrapperCompon);

  function GroupPanel(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = GroupPanel.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      layout: this.layout,
      groupsRenderData: this.groupsRenderData,
      restAttributes: this.restAttributes
    });
  };

  _createClass(GroupPanel, [{
    key: "layout",
    get: function get() {
      var groupOrientation = this.props.groupOrientation;
      return (0, _utils.isVerticalGroupOrientation)(groupOrientation) ? _layout.GroupPanelVerticalLayout : _layout2.GroupPanelHorizontalLayout;
    }
  }, {
    key: "groupsRenderData",
    get: function get() {
      var _this$props = this.props,
          columnCountPerGroup = _this$props.columnCountPerGroup,
          groupByDate = _this$props.groupByDate,
          groups = _this$props.groups;
      return (0, _utils2.getGroupsRenderData)(groups, columnCountPerGroup, groupByDate);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          baseColSpan = _this$props2.baseColSpan,
          className = _this$props2.className,
          columnCountPerGroup = _this$props2.columnCountPerGroup,
          groupByDate = _this$props2.groupByDate,
          groupOrientation = _this$props2.groupOrientation,
          groups = _this$props2.groups,
          height = _this$props2.height,
          resourceCellTemplate = _this$props2.resourceCellTemplate,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return GroupPanel;
}(_vdom.InfernoWrapperComponent);

exports.GroupPanel = GroupPanel;
GroupPanel.defaultProps = _extends({}, _group_panel_props.GroupPanelProps);