import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["cellsCount", "children", "className", "height", "isHeaderRow", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "styles"];
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { addHeightToStyle } from "../utils";
import { RowProps, Row } from "./row";
import { VirtualCell } from "./virtual_cell";
export var viewFunction = _ref => {
  var {
    classes,
    props: {
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth
    },
    style,
    virtualCells
  } = _ref;
  return createComponentVNode(2, Row, {
    "styles": style,
    "className": classes,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellCount": rightVirtualCellCount,
    children: virtualCells.map((_, index) => createComponentVNode(2, VirtualCell, null, index.toString()))
  });
};
export var VirtualRowProps = _extends({}, RowProps, {
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  cellsCount: 1
});
export class VirtualRow extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get style() {
    var {
      height
    } = this.props;
    var {
      style
    } = this.restAttributes;
    return addHeightToStyle(height, style);
  }

  get classes() {
    var {
      className
    } = this.props;
    return "dx-scheduler-virtual-row ".concat(className);
  }

  get virtualCells() {
    var {
      cellsCount
    } = this.props;
    return [...Array(cellsCount)];
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      style: this.style,
      classes: this.classes,
      virtualCells: this.virtualCells,
      restAttributes: this.restAttributes
    });
  }

}
VirtualRow.defaultProps = _extends({}, VirtualRowProps);