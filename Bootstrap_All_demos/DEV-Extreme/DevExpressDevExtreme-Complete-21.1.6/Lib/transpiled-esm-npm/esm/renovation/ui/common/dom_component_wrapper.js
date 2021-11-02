import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["itemTemplate", "valueChange"],
    _excluded2 = ["componentProps", "componentType", "rootElementRef"];
import { createVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { ConfigContext } from "../../common/config_context";
import { renderTemplate } from "../../utils/render_template";
export var viewFunction = _ref => {
  var {
    props: {
      componentProps: {
        className
      }
    },
    restAttributes,
    widgetRef
  } = _ref;
  return normalizeProps(createVNode(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef));
};
export var DomComponentWrapperProps = {};
import { createRef as infernoCreateRef } from "inferno";
export class DomComponentWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = infernoCreateRef();
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }

  get config() {
    if ("ConfigContext" in this.context) {
      return this.context.ConfigContext;
    }

    return ConfigContext;
  }

  createEffects() {
    return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.setRootElementRef, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.config])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[2]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.componentProps, this.config]);
  }

  setupWidget() {
    var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = componentInstance;
    return () => {
      componentInstance.dispose();
      this.instance = null;
    };
  }

  setRootElementRef() {
    var {
      rootElementRef
    } = this.props;

    if (rootElementRef) {
      rootElementRef.current = this.widgetRef.current;
    }
  }

  updateWidget() {
    var _this$getInstance;

    (_this$getInstance = this.getInstance()) === null || _this$getInstance === void 0 ? void 0 : _this$getInstance.option(this.properties);
  }

  get properties() {
    var _this$config;

    var _this$props$component = this.props.componentProps,
        {
      itemTemplate,
      valueChange
    } = _this$props$component,
        restProps = _objectWithoutPropertiesLoose(_this$props$component, _excluded);

    var properties = _extends({
      rtlEnabled: ((_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.rtlEnabled) || false
    }, restProps);

    if (valueChange) {
      properties.onValueChanged = _ref2 => {
        var {
          value
        } = _ref2;
        return valueChange(value);
      };
    }

    if (itemTemplate) {
      properties.itemTemplate = (item, index, container) => {
        renderTemplate(itemTemplate, {
          item,
          index,
          container
        }, container);
      };
    }

    return properties;
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);

    return restProps;
  }

  getInstance() {
    return this.instance;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  }

}
DomComponentWrapper.defaultProps = _extends({}, DomComponentWrapperProps);