import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["baseColSpan", "className", "columnCountPerGroup", "groupByDate", "groupOrientation", "groups", "groupsRenderData", "height", "resourceCellTemplate", "styles"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { Row } from "./row";
import { addHeightToStyle } from "../../../utils";
import { GroupPanelLayoutProps } from "../group_panel_layout_props";
export var viewFunction = _ref => {
  var {
    props: {
      className,
      groupsRenderData,
      resourceCellTemplate
    },
    restAttributes,
    style
  } = _ref;
  return normalizeProps(createVNode(1, "div", className, createVNode(1, "div", "dx-scheduler-group-flex-container", groupsRenderData.map(group => createComponentVNode(2, Row, {
    "groupItems": group,
    "cellTemplate": resourceCellTemplate
  }, group[0].key)), 0), 2, _extends({}, restAttributes, {
    "style": normalizeStyles(style)
  })));
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class GroupPanelVerticalLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get style() {
    var {
      height,
      styles
    } = this.props;
    return addHeightToStyle(height, styles);
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
      style: this.style,
      restAttributes: this.restAttributes
    });
  }

}
GroupPanelVerticalLayout.defaultProps = _extends({}, GroupPanelLayoutProps);