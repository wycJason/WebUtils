import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["bottomVirtualRowHeight", "children", "className", "height", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "topVirtualRowHeight", "virtualCellsCount"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { addHeightToStyle } from "../utils";
import { VirtualRow } from "./virtual_row";
export var viewFunction = _ref => {
  var {
    hasBottomVirtualRow,
    hasTopVirtualRow,
    props: {
      bottomVirtualRowHeight,
      children,
      className,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      topVirtualRowHeight,
      virtualCellsCount
    },
    restAttributes,
    style
  } = _ref;
  return normalizeProps(createVNode(1, "table", className, createVNode(1, "tbody", null, [hasTopVirtualRow && createComponentVNode(2, VirtualRow, {
    "height": topVirtualRowHeight,
    "cellsCount": virtualCellsCount,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellCount": rightVirtualCellCount
  }), children, hasBottomVirtualRow && createComponentVNode(2, VirtualRow, {
    "height": bottomVirtualRowHeight,
    "cellsCount": virtualCellsCount,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellCount": rightVirtualCellCount
  })], 0), 2, _extends({}, restAttributes, {
    "style": normalizeStyles(style)
  })));
};
export var TableProps = {
  className: "",
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
export class Table extends BaseInfernoComponent {
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

  get hasTopVirtualRow() {
    var {
      topVirtualRowHeight
    } = this.props;
    return !!topVirtualRowHeight;
  }

  get hasBottomVirtualRow() {
    var {
      bottomVirtualRowHeight
    } = this.props;
    return !!bottomVirtualRowHeight;
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
      hasTopVirtualRow: this.hasTopVirtualRow,
      hasBottomVirtualRow: this.hasBottomVirtualRow,
      restAttributes: this.restAttributes
    });
  }

}
Table.defaultProps = _extends({}, TableProps);