import registerComponent from "../../../core/component_registrator";
import BaseComponent from "../../component_wrapper/component";
import { Bullet as BulletComponent } from "./bullet";
export default class Bullet extends BaseComponent {
  _getActionConfigs() {
    return {
      onTooltipHidden: {},
      onTooltipShown: {},
      onContentReady: {
        excludeValidators: ["disabled"]
      }
    };
  }

  get _propsInfo() {
    return {
      twoWay: [["canvas", {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }, "canvasChange"]],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["value", "color", "target", "targetColor", "targetWidth", "showTarget", "showZeroLevel", "startScaleValue", "endScaleValue", "tooltip", "onTooltipHidden", "onTooltipShown", "size", "margin", "disabled", "rtlEnabled", "classes", "className", "defaultCanvas", "onContentReady", "pointerEvents", "canvasChange", "canvas"]
    };
  }

  get _viewComponent() {
    return BulletComponent;
  }

}
registerComponent("dxBullet", Bullet);