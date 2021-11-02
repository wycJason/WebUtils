"use strict";

exports.GroupPanelHorizontalLayout = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _row = require("./row");

var _group_panel_layout_props = require("../group_panel_layout_props");

var _excluded = ["baseColSpan", "className", "columnCountPerGroup", "groupByDate", "groupOrientation", "groups", "groupsRenderData", "height", "resourceCellTemplate", "styles"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var groupsRenderData = _ref.groupsRenderData,
      resourceCellTemplate = _ref.props.resourceCellTemplate;
  return (0, _inferno.createFragment)(groupsRenderData.map(function (group) {
    return (0, _inferno.createComponentVNode)(2, _row.Row, {
      "groupItems": group,
      "cellTemplate": resourceCellTemplate
    }, group[0].key);
  }), 0);
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var GroupPanelHorizontalLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(GroupPanelHorizontalLayout, _BaseInfernoComponent);

  function GroupPanelHorizontalLayout(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = GroupPanelHorizontalLayout.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      groupsRenderData: this.groupsRenderData,
      restAttributes: this.restAttributes
    });
  };

  _createClass(GroupPanelHorizontalLayout, [{
    key: "groupsRenderData",
    get: function get() {
      var _this$props = this.props,
          baseColSpan = _this$props.baseColSpan,
          groupsRenderData = _this$props.groupsRenderData;
      var colSpans = groupsRenderData.reduceRight(function (currentColSpans, groupsRow, index) {
        var nextColSpans = currentColSpans;
        var currentLevelGroupCount = groupsRow.length;
        var previousColSpan = index === groupsRenderData.length - 1 ? baseColSpan : currentColSpans[index + 1];
        var previousLevelGroupCount = index === groupsRenderData.length - 1 ? currentLevelGroupCount : groupsRenderData[index + 1].length;
        var groupCountDiff = previousLevelGroupCount / currentLevelGroupCount;
        nextColSpans[index] = groupCountDiff * previousColSpan;
        return nextColSpans;
      }, _toConsumableArray(new Array(groupsRenderData.length)));
      return groupsRenderData.map(function (groupsRenderRow, index) {
        var colSpan = colSpans[index];
        return groupsRenderRow.map(function (groupItem) {
          return _extends({}, groupItem, {
            colSpan: colSpan
          });
        });
      });
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
          groupsRenderData = _this$props2.groupsRenderData,
          height = _this$props2.height,
          resourceCellTemplate = _this$props2.resourceCellTemplate,
          styles = _this$props2.styles,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return GroupPanelHorizontalLayout;
}(_vdom.BaseInfernoComponent);

exports.GroupPanelHorizontalLayout = GroupPanelHorizontalLayout;
GroupPanelHorizontalLayout.defaultProps = _extends({}, _group_panel_layout_props.GroupPanelLayoutProps);