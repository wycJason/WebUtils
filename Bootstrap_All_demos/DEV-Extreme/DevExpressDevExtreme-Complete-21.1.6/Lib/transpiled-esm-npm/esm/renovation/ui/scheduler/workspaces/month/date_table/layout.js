import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { DateTableLayoutBase } from "../../base/date_table/layout";
import { LayoutProps } from "../../base/layout_props";
import { MonthDateTableCell } from "./cell";
export var viewFunction = _ref => {
  var {
    props: {
      addDateTableClass,
      dataCellTemplate,
      groupOrientation,
      viewData
    },
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DateTableLayoutBase, _extends({
    "viewData": viewData,
    "groupOrientation": groupOrientation,
    "addDateTableClass": addDateTableClass,
    "dataCellTemplate": dataCellTemplate,
    "cellTemplate": MonthDateTableCell
  }, restAttributes)));
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class MonthDateTableLayout extends InfernoWrapperComponent {
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
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }

}
MonthDateTableLayout.defaultProps = _extends({}, LayoutProps);