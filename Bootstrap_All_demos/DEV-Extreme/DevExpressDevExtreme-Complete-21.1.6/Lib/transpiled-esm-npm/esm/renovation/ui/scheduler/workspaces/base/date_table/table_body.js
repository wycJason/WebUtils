import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Fragment } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { Row } from "../row";
import { getKeyByGroup, getIsGroupedAllDayPanel } from "../../utils";
import { AllDayPanelTableBody } from "./all_day_panel/table_body";
import { DateTableLayoutProps } from "./layout_props";
export var viewFunction = _ref => {
  var {
    props: {
      cellTemplate: Cell,
      dataCellTemplate,
      groupOrientation,
      viewData
    }
  } = _ref;
  return createFragment(viewData.groupedData.map((_ref2, index) => {
    var {
      allDayPanel,
      dateTable,
      groupIndex
    } = _ref2;
    return createFragment([getIsGroupedAllDayPanel(viewData, index) && createComponentVNode(2, AllDayPanelTableBody, {
      "viewData": allDayPanel,
      "dataCellTemplate": dataCellTemplate,
      "isVerticalGroupOrientation": true,
      "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
      "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount
    }), dateTable.map(cellsRow => createComponentVNode(2, Row, {
      "className": "dx-scheduler-date-table-row",
      "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
      "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount,
      children: cellsRow.map(_ref3 => {
        var {
          endDate,
          firstDayOfMonth,
          groupIndex: cellGroupIndex,
          groups,
          index: cellIndex,
          isFirstGroupCell,
          isLastGroupCell,
          key,
          otherMonth,
          startDate,
          text,
          today
        } = _ref3;
        return Cell({
          isFirstGroupCell: isFirstGroupCell,
          isLastGroupCell: isLastGroupCell,
          startDate: startDate,
          endDate: endDate,
          groups: groups,
          groupIndex: cellGroupIndex,
          index: cellIndex,
          dataCellTemplate: dataCellTemplate,
          key: key,
          text: text,
          today: today,
          otherMonth: otherMonth,
          firstDayOfMonth: firstDayOfMonth
        });
      })
    }, cellsRow[0].key - viewData.leftVirtualCellCount))], 0, getKeyByGroup(groupIndex, groupOrientation));
  }), 0);
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DateTableBody extends BaseInfernoComponent {
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
        cellTemplate: getTemplate(props.cellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }

}
DateTableBody.defaultProps = _extends({}, DateTableLayoutProps);