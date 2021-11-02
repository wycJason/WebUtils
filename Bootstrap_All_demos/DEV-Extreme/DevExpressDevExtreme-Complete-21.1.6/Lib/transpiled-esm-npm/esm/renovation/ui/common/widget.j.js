import registerComponent from "../../../core/component_registrator";
import BaseComponent from "../../component_wrapper/component";
import { Widget as WidgetComponent } from "./widget";
export default class Widget extends BaseComponent {
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
      onActive: {},
      onDimensionChanged: {},
      onInactive: {},
      onKeyboardHandled: {},
      onVisibilityChange: {},
      onFocusIn: {},
      onFocusOut: {},
      onHoverStart: {},
      onHoverEnd: {},
      onClick: {},
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  }

  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["_feedbackHideTimeout", "_feedbackShowTimeout", "activeStateUnit", "aria", "classes", "className", "name", "onActive", "onDimensionChanged", "onInactive", "onKeyboardHandled", "onVisibilityChange", "onFocusIn", "onFocusOut", "onHoverStart", "onHoverEnd", "accessKey", "activeStateEnabled", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onContentReady", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"]
    };
  }

  get _viewComponent() {
    return WidgetComponent;
  }

}
registerComponent("dxWidget", Widget);