import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["config"];
import { createVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { initConfig, showWave, hideWave } from "../../../ui/widget/utils.ink_ripple";
export var viewFunction = model => normalizeProps(createVNode(1, "div", "dx-inkripple", null, 1, _extends({}, model.restAttributes)));
export var InkRippleProps = {
  config: {}
};
export class InkRipple extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.hideWave = this.hideWave.bind(this);
    this.showWave = this.showWave.bind(this);
  }

  get getConfig() {
    var {
      config
    } = this.props;
    return initConfig(config);
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  hideWave(event) {
    hideWave(this.getConfig, event);
  }

  showWave(event) {
    showWave(this.getConfig, event);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      getConfig: this.getConfig,
      restAttributes: this.restAttributes
    });
  }

}
InkRipple.defaultProps = _extends({}, InkRippleProps);