import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "dataCellTemplate", "dateTableTemplate", "groupOrientation", "headerPanelTemplate", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { LayoutProps } from "./layout_props";
export var viewFunction = viewModel => normalizeProps(createVNode(1, "div", null, [viewModel.props.headerPanelTemplate({
  viewCellsData: viewModel.props.viewData.groupedData[0].dateTable
}), viewModel.props.dateTableTemplate({
  viewData: viewModel.props.viewData
})], 0, _extends({}, viewModel.restAttributes)));
export var LayoutBaseProps = _extends({}, LayoutProps);

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class LayoutBase extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }

}
LayoutBase.defaultProps = _extends({}, LayoutBaseProps);