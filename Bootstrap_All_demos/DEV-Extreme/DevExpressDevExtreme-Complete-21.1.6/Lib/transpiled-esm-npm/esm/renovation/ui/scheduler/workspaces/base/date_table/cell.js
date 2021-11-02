import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "otherMonth", "startDate", "text", "today"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { CellBase as Cell, CellBaseProps } from "../cell";
import { combineClasses } from "../../../../../utils/combine_classes";
export var viewFunction = viewModel => createComponentVNode(2, Cell, {
  "isFirstGroupCell": viewModel.props.isFirstGroupCell,
  "isLastGroupCell": viewModel.props.isLastGroupCell,
  "contentTemplate": viewModel.props.dataCellTemplate,
  "contentTemplateProps": viewModel.dataCellTemplateProps,
  "className": viewModel.classes,
  children: viewModel.props.children
});
export var DateTableCellBaseProps = _extends({}, CellBaseProps, {
  otherMonth: false,
  today: false,
  firstDayOfMonth: false
});

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DateTableCellBase extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get classes() {
    var {
      allDay,
      className
    } = this.props;
    return combineClasses({
      "dx-scheduler-cell-sizes-horizontal": true,
      "dx-scheduler-cell-sizes-vertical": !allDay,
      "dx-scheduler-date-table-cell": !allDay,
      [className]: true
    });
  }

  get dataCellTemplateProps() {
    var {
      allDay,
      contentTemplateProps,
      endDate,
      groupIndex,
      groups,
      index,
      startDate
    } = this.props;
    return {
      data: _extends({
        startDate,
        endDate,
        groups,
        groupIndex: groups ? groupIndex : undefined,
        text: "",
        allDay: allDay || undefined
      }, contentTemplateProps.data),
      index
    };
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
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      classes: this.classes,
      dataCellTemplateProps: this.dataCellTemplateProps,
      restAttributes: this.restAttributes
    });
  }

}
DateTableCellBase.defaultProps = _extends({}, DateTableCellBaseProps);