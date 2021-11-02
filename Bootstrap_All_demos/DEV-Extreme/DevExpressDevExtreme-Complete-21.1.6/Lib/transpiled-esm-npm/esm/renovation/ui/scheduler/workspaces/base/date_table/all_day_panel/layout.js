import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "className", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData", "visible"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { combineClasses } from "../../../../../../utils/combine_classes";
import { Table } from "../../table";
import { AllDayPanelTableBody } from "./table_body";
import { LayoutProps } from "../../layout_props";
import { DefaultSizes } from "../../../const";
export var viewFunction = viewModel => normalizeProps(createVNode(1, "div", viewModel.classes, viewModel.props.visible && createComponentVNode(2, Table, {
  "className": "dx-scheduler-all-day-table",
  "height": viewModel.emptyTableHeight,
  children: createComponentVNode(2, AllDayPanelTableBody, {
    "viewData": viewModel.allDayPanelData,
    "leftVirtualCellWidth": viewModel.props.viewData.leftVirtualCellWidth,
    "rightVirtualCellWidth": viewModel.props.viewData.rightVirtualCellWidth,
    "leftVirtualCellCount": viewModel.props.viewData.leftVirtualCellCount,
    "rightVirtualCellCount": viewModel.props.viewData.rightVirtualCellCount,
    "dataCellTemplate": viewModel.props.dataCellTemplate
  })
}), 0, _extends({}, viewModel.restAttributes)));
export var AllDayPanelLayoutProps = _extends({}, LayoutProps, {
  className: "",
  visible: true
});

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class AllDayPanelLayout extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get allDayPanelData() {
    return this.props.viewData.groupedData[0].allDayPanel;
  }

  get emptyTableHeight() {
    return this.allDayPanelData ? undefined : DefaultSizes.allDayPanelHeight;
  }

  get classes() {
    return combineClasses({
      "dx-scheduler-all-day-panel": true,
      "dx-hidden": !this.props.visible,
      [this.props.className]: !!this.props.className
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
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      allDayPanelData: this.allDayPanelData,
      emptyTableHeight: this.emptyTableHeight,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  }

}
AllDayPanelLayout.defaultProps = _extends({}, AllDayPanelLayoutProps);