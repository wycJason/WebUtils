import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["baseColSpan", "className", "columnCountPerGroup", "groupByDate", "groupOrientation", "groups", "groupsRenderData", "height", "resourceCellTemplate", "styles"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Fragment } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { Row } from "./row";
import { GroupPanelLayoutProps } from "../group_panel_layout_props";
export var viewFunction = _ref => {
  var {
    groupsRenderData,
    props: {
      resourceCellTemplate
    }
  } = _ref;
  return createFragment(groupsRenderData.map(group => createComponentVNode(2, Row, {
    "groupItems": group,
    "cellTemplate": resourceCellTemplate
  }, group[0].key)), 0);
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class GroupPanelHorizontalLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get groupsRenderData() {
    var {
      baseColSpan,
      groupsRenderData
    } = this.props;
    var colSpans = groupsRenderData.reduceRight((currentColSpans, groupsRow, index) => {
      var nextColSpans = currentColSpans;
      var currentLevelGroupCount = groupsRow.length;
      var previousColSpan = index === groupsRenderData.length - 1 ? baseColSpan : currentColSpans[index + 1];
      var previousLevelGroupCount = index === groupsRenderData.length - 1 ? currentLevelGroupCount : groupsRenderData[index + 1].length;
      var groupCountDiff = previousLevelGroupCount / currentLevelGroupCount;
      nextColSpans[index] = groupCountDiff * previousColSpan;
      return nextColSpans;
    }, [...new Array(groupsRenderData.length)]);
    return groupsRenderData.map((groupsRenderRow, index) => {
      var colSpan = colSpans[index];
      return groupsRenderRow.map(groupItem => _extends({}, groupItem, {
        colSpan
      }));
    });
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
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      groupsRenderData: this.groupsRenderData,
      restAttributes: this.restAttributes
    });
  }

}
GroupPanelHorizontalLayout.defaultProps = _extends({}, GroupPanelLayoutProps);