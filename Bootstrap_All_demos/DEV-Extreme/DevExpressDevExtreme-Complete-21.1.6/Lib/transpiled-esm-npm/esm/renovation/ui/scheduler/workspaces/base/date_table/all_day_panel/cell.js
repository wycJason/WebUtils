import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "otherMonth", "startDate", "text", "today"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { DateTableCellBaseProps, DateTableCellBase } from "../cell";
export var viewFunction = viewModel => createComponentVNode(2, DateTableCellBase, {
  "className": "dx-scheduler-all-day-table-cell ".concat(viewModel.props.className),
  "startDate": viewModel.props.startDate,
  "endDate": viewModel.props.endDate,
  "groups": viewModel.props.groups,
  "groupIndex": viewModel.props.groupIndex,
  "allDay": true,
  "isFirstGroupCell": viewModel.props.isFirstGroupCell,
  "isLastGroupCell": viewModel.props.isLastGroupCell,
  "index": viewModel.props.index,
  "dataCellTemplate": viewModel.props.dataCellTemplate
});

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class AllDayPanelCell extends BaseInfernoComponent {
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
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }

}
AllDayPanelCell.defaultProps = _extends({}, DateTableCellBaseProps);