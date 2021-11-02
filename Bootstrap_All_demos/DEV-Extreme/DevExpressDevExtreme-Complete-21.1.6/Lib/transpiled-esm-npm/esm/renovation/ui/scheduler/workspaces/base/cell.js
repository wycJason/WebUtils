import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { getGroupCellClasses } from "../utils";
export var viewFunction = viewModel => {
  var ContentTemplate = viewModel.props.contentTemplate;
  return createVNode(1, "td", viewModel.classes, [!viewModel.props.contentTemplate && viewModel.props.children, viewModel.props.contentTemplate && ContentTemplate(_extends({}, viewModel.props.contentTemplateProps))], 0);
};
export var CellBaseProps = {
  className: "",
  isFirstGroupCell: false,
  isLastGroupCell: false,
  startDate: new Date(),
  endDate: new Date(),
  allDay: false,
  text: "",
  index: 0,
  contentTemplateProps: {
    data: {},
    index: 0
  }
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class CellBase extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get classes() {
    var {
      className,
      isFirstGroupCell,
      isLastGroupCell
    } = this.props;
    return getGroupCellClasses(isFirstGroupCell, isLastGroupCell, className);
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
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  }

}
CellBase.defaultProps = _extends({}, CellBaseProps);