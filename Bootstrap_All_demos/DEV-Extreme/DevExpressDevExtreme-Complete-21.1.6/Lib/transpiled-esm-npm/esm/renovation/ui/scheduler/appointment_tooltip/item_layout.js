import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "getTextAndFormatDate", "index", "item", "itemContentTemplate", "onDelete", "onHide", "showDeleteButton", "singleAppointment"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import noop from "../../../utils/noop";
import { Marker } from "./marker";
import { Button } from "../../button";
import { TooltipItemContent } from "./item_content";
import getCurrentAppointment from "./utils/get_current_appointment";
import { defaultGetTextAndFormatDate } from "./utils/default_functions";
export var viewFunction = viewModel => {
  var ItemContentTemplate = viewModel.props.itemContentTemplate;
  return viewModel.props.itemContentTemplate ? ItemContentTemplate({
    model: {
      appointmentData: viewModel.props.item.data,
      targetedAppointmentData: viewModel.currentAppointment
    },
    index: viewModel.props.index
  }) : normalizeProps(createVNode(1, "div", "dx-tooltip-appointment-item ".concat(viewModel.props.className), [createComponentVNode(2, Marker), createComponentVNode(2, TooltipItemContent, {
    "text": viewModel.formattedContent.text,
    "formattedDate": viewModel.formattedContent.formatDate
  }), viewModel.props.showDeleteButton && createVNode(1, "div", "dx-tooltip-appointment-item-delete-button-container", createComponentVNode(2, Button, {
    "className": "dx-tooltip-appointment-item-delete-button",
    "icon": "trash",
    "stylingMode": "text",
    "onClick": viewModel.onDeleteButtonClick
  }), 2)], 0, _extends({}, viewModel.restAttributes)));
};
export var TooltipItemLayoutProps = {
  className: "",
  item: {
    data: {}
  },
  index: 0,
  showDeleteButton: true,
  onDelete: noop,
  onHide: noop,
  getTextAndFormatDate: defaultGetTextAndFormatDate,
  singleAppointment: {}
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class TooltipItemLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get currentAppointment() {
    var {
      item
    } = this.props;
    return getCurrentAppointment(item);
  }

  get onDeleteButtonClick() {
    var {
      item,
      onDelete,
      onHide,
      singleAppointment
    } = this.props;
    return e => {
      onHide();
      e.event.stopPropagation();
      onDelete(item.data, singleAppointment);
    };
  }

  get formattedContent() {
    var {
      getTextAndFormatDate,
      item
    } = this.props;
    var {
      data
    } = item;
    return getTextAndFormatDate(data, this.currentAppointment);
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
        itemContentTemplate: getTemplate(props.itemContentTemplate)
      }),
      currentAppointment: this.currentAppointment,
      onDeleteButtonClick: this.onDeleteButtonClick,
      formattedContent: this.formattedContent,
      restAttributes: this.restAttributes
    });
  }

}
TooltipItemLayout.defaultProps = _extends({}, TooltipItemLayoutProps);