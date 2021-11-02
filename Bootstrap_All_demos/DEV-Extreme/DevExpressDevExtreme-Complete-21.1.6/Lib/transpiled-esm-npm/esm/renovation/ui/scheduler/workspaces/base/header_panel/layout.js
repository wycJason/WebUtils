import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["baseColSpan", "className", "columnCountPerGroup", "dateCellTemplate", "dateHeaderData", "dateHeaderTemplate", "groupByDate", "groupOrientation", "groupPanelCellBaseColSpan", "groups", "height", "isRenderDateHeader", "resourceCellTemplate", "timeCellTemplate"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { isHorizontalGroupOrientation } from "../../utils";
import { GroupPanel } from "../group_panel/group_panel";
import { GroupPanelProps } from "../group_panel/group_panel_props";
import { DateHeaderLayout } from "./date_header/layout";
export var viewFunction = _ref => {
  var {
    isHorizontalGrouping,
    props: {
      columnCountPerGroup,
      dateCellTemplate,
      dateHeaderData,
      dateHeaderTemplate: DateHeader,
      groupByDate,
      groupOrientation,
      groupPanelCellBaseColSpan,
      groups,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate
    }
  } = _ref;
  return createVNode(1, "thead", null, [isHorizontalGrouping && !groupByDate && createComponentVNode(2, GroupPanel, {
    "groups": groups,
    "groupByDate": groupByDate,
    "groupOrientation": groupOrientation,
    "baseColSpan": groupPanelCellBaseColSpan,
    "columnCountPerGroup": columnCountPerGroup,
    "resourceCellTemplate": resourceCellTemplate
  }), isRenderDateHeader && DateHeader({
    groupByDate: groupByDate,
    dateHeaderData: dateHeaderData,
    groupOrientation: groupOrientation,
    groups: groups,
    dateCellTemplate: dateCellTemplate,
    timeCellTemplate: timeCellTemplate
  }), groupByDate && createComponentVNode(2, GroupPanel, {
    "groups": groups,
    "groupByDate": groupByDate,
    "groupOrientation": groupOrientation,
    "baseColSpan": groupPanelCellBaseColSpan,
    "columnCountPerGroup": columnCountPerGroup,
    "resourceCellTemplate": resourceCellTemplate
  })], 0);
};
export var HeaderPanelLayoutProps = _extends({}, GroupPanelProps, {
  isRenderDateHeader: true,
  groupPanelCellBaseColSpan: 1,
  dateHeaderTemplate: DateHeaderLayout
});

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class HeaderPanelLayout extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get isHorizontalGrouping() {
    var {
      groupOrientation,
      groups
    } = this.props;
    return isHorizontalGroupOrientation(groups, groupOrientation);
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        dateHeaderTemplate: getTemplate(props.dateHeaderTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      isHorizontalGrouping: this.isHorizontalGrouping,
      restAttributes: this.restAttributes
    });
  }

}
HeaderPanelLayout.defaultProps = _extends({}, HeaderPanelLayoutProps);