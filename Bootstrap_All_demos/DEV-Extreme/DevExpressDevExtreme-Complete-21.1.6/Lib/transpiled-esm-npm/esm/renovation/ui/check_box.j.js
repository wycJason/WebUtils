import registerComponent from "../../core/component_registrator";
import BaseComponent from "../component_wrapper/check_box";
import { CheckBox as CheckBoxComponent } from "./check_box";
export default class CheckBox extends BaseComponent {
  getProps() {
    var props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }

  focus() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus();
  }

  _getActionConfigs() {
    return {
      onFocusIn: {},
      onClick: {},
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  }

  get _propsInfo() {
    return {
      twoWay: [["value", false, "valueChange"]],
      allowNull: ["validationError", "validationErrors", "defaultValue", "value"],
      elements: [],
      templates: [],
      props: ["activeStateEnabled", "hoverStateEnabled", "validationError", "validationErrors", "text", "validationMessageMode", "validationStatus", "name", "readOnly", "isValid", "useInkRipple", "onFocusIn", "saveValueChangeEvent", "defaultValue", "valueChange", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onClick", "onContentReady", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "value"]
    };
  }

  get _viewComponent() {
    return CheckBoxComponent;
  }

}
registerComponent("dxCheckBox", CheckBox);