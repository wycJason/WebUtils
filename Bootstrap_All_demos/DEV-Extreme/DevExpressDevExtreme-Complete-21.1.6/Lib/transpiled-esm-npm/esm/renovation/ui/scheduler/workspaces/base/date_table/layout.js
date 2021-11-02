import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "cellTemplate", "className", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { Table } from "../table";
import { DateTableBody } from "./table_body";
import { DateTableLayoutProps } from "./layout_props";
export var viewFunction = _ref => {
  var {
    bottomVirtualRowHeight,
    classes,
    leftVirtualCellWidth,
    props: {
      cellTemplate,
      dataCellTemplate,
      groupOrientation,
      viewData
    },
    restAttributes,
    rightVirtualCellWidth,
    topVirtualRowHeight,
    virtualCellsCount
  } = _ref;
  return normalizeProps(createComponentVNode(2, Table, _extends({}, restAttributes, {
    "topVirtualRowHeight": topVirtualRowHeight,
    "bottomVirtualRowHeight": bottomVirtualRowHeight,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": viewData.leftVirtualCellCount,
    "rightVirtualCellCount": viewData.rightVirtualCellCount,
    "virtualCellsCount": virtualCellsCount,
    "className": classes,
    children: createComponentVNode(2, DateTableBody, {
      "cellTemplate": cellTemplate,
      "viewData": viewData,
      "dataCellTemplate": dataCellTemplate,
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "groupOrientation": groupOrientation
    })
  })));
};
export var DateTableLayoutBaseProps = _extends({}, DateTableLayoutProps);

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DateTableLayoutBase extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get classes() {
    var {
      addDateTableClass
    } = this.props;
    return addDateTableClass ? "dx-scheduler-date-table" : undefined;
  }

  get topVirtualRowHeight() {
    return this.props.viewData.topVirtualRowHeight || 0;
  }

  get bottomVirtualRowHeight() {
    return this.props.viewData.bottomVirtualRowHeight || 0;
  }

  get leftVirtualCellWidth() {
    return this.props.viewData.leftVirtualCellWidth || 0;
  }

  get rightVirtualCellWidth() {
    return this.props.viewData.rightVirtualCellWidth || 0;
  }

  get virtualCellsCount() {
    return this.props.viewData.groupedData[0].dateTable[0].length;
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
        cellTemplate: getTemplate(props.cellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      classes: this.classes,
      topVirtualRowHeight: this.topVirtualRowHeight,
      bottomVirtualRowHeight: this.bottomVirtualRowHeight,
      leftVirtualCellWidth: this.leftVirtualCellWidth,
      rightVirtualCellWidth: this.rightVirtualCellWidth,
      virtualCellsCount: this.virtualCellsCount,
      restAttributes: this.restAttributes
    });
  }

}
DateTableLayoutBase.defaultProps = _extends({}, DateTableLayoutBaseProps);