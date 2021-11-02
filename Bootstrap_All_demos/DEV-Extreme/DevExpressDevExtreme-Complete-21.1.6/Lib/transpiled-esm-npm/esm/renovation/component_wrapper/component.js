import _extends from "@babel/runtime/helpers/esm/extends";
import { render, createRef } from "inferno";
import { createElement } from "inferno-create-element";
import { hydrate } from "inferno-hydrate";
import $ from "../../core/renderer";
import domAdapter from "../../core/dom_adapter";
import DOMComponent from "../../core/dom_component";
import { extend } from "../../core/utils/extend";
import { getPublicElement } from "../../core/element";
import { isDefined, isRenderer } from "../../core/utils/type";
import { InfernoEffectHost } from "@devextreme/vdom";
import { TemplateWrapper } from "./template_wrapper";
import { updatePropsImmutable } from "./utils";

var setDefaultOptionValue = (options, defaultValueGetter) => name => {
  if (options.hasOwnProperty(name) && options[name] === undefined) {
    options[name] = defaultValueGetter(name);
  }
};

export default class ComponentWrapper extends DOMComponent {
  constructor() {
    super(...arguments);
    this._disposeMethodCalled = false;
  }

  get _propsInfo() {
    return {
      allowNull: [],
      twoWay: [],
      elements: [],
      templates: [],
      props: []
    };
  }

  get viewRef() {
    var _this$_viewRef;

    return (_this$_viewRef = this._viewRef) === null || _this$_viewRef === void 0 ? void 0 : _this$_viewRef.current;
  }

  _getDefaultOptions() {
    return extend(true, super._getDefaultOptions(), this._viewComponent.defaultProps, this._propsInfo.twoWay.reduce((options, _ref) => {
      var [name, defaultValue, eventName] = _ref;
      return _extends({}, options, {
        [name]: defaultValue,
        [eventName]: value => this.option(name, value)
      });
    }, {}), this._propsInfo.templates.reduce((options, name) => _extends({}, options, {
      [name]: null
    }), {}));
  }

  _initMarkup() {
    var props = this.getProps();

    this._renderWrapper(props);
  }

  _renderWrapper(props) {
    var containerNode = this.$element()[0];
    var parentNode = containerNode.parentNode;

    if (!this._isNodeReplaced) {
      var nextNode = containerNode === null || containerNode === void 0 ? void 0 : containerNode.nextSibling;
      var rootNode = domAdapter.createElement("div");
      rootNode.appendChild(containerNode);

      var mountNode = this._documentFragment.appendChild(rootNode);

      InfernoEffectHost.lock();
      hydrate(createElement(this._viewComponent, props), mountNode);
      containerNode.$V = mountNode.$V;

      if (parentNode) {
        parentNode.insertBefore(containerNode, nextNode);
      }

      InfernoEffectHost.callEffects();
      this._isNodeReplaced = true;
    } else {
      render(createElement(this._viewComponent, props), containerNode);
    }
  }

  _render() {}

  dispose() {
    this._disposeMethodCalled = true;
    super.dispose();
  }

  _dispose() {
    var containerNode = this.$element()[0];
    var parentNode = containerNode.parentNode;
    parentNode.$V = containerNode.$V;
    containerNode.$V = null;
    render(this._disposeMethodCalled ? createElement(containerNode.tagName, this.elementAttr) : null, parentNode);
    delete parentNode.$V;

    super._dispose();
  }

  get elementAttr() {
    var _this$_storedClasses;

    if (!this._elementAttr) {
      var {
        attributes
      } = this.$element()[0];
      this._elementAttr = _extends({}, Object.keys(attributes).reduce((a, key) => {
        if (attributes[key].specified) {
          a[attributes[key].name] = attributes[key].value;
        }

        return a;
      }, {}));
    }

    var elemStyle = this.$element()[0].style;
    var style = {};

    for (var i = 0; i < elemStyle.length; i++) {
      style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i]);
    }

    this._elementAttr.style = style;
    var cssClass = this.$element()[0].getAttribute("class") || "";
    this._storedClasses = (_this$_storedClasses = this._storedClasses) !== null && _this$_storedClasses !== void 0 ? _this$_storedClasses : cssClass.split(" ").filter(name => name.indexOf("dx-") === 0).join(" ");
    this._elementAttr.class = cssClass.split(" ").filter(name => name.indexOf("dx-") !== 0).concat(this._storedClasses).join(" ").trim();
    return this._elementAttr;
  }

  _patchOptionValues(options) {
    var {
      allowNull,
      elements,
      props,
      twoWay
    } = this._propsInfo;
    var defaultProps = this._viewComponent.defaultProps;
    var widgetProps = props.reduce((acc, propName) => {
      if (options.hasOwnProperty(propName)) {
        acc[propName] = options[propName];
      }

      return acc;
    }, {
      ref: options.ref,
      children: options.children
    });
    allowNull.forEach(setDefaultOptionValue(widgetProps, () => null));
    Object.keys(defaultProps).forEach(setDefaultOptionValue(widgetProps, name => defaultProps[name]));
    twoWay.forEach(_ref2 => {
      var [name, defaultValue] = _ref2;
      return setDefaultOptionValue(widgetProps, () => defaultValue)(name);
    });
    elements.forEach(name => {
      if (name in widgetProps) {
        var value = widgetProps[name];

        if (isRenderer(value)) {
          widgetProps[name] = this._patchElementParam(value);
        }
      }
    });
    return widgetProps;
  }

  getProps() {
    var {
      elementAttr
    } = this.option();

    var options = this._patchOptionValues(_extends({}, this._props, {
      ref: this._viewRef,
      children: this._extractDefaultSlot()
    }));

    this._propsInfo.templates.forEach(template => {
      options[template] = this._componentTemplates[template];
    });

    return _extends({}, options, this.elementAttr, elementAttr, {
      className: [...(this.elementAttr.class || "").split(" "), ...(elementAttr.class || "").split(" ")].filter((c, i, a) => c && a.indexOf(c) === i).join(" ").trim(),
      class: ""
    }, this._actionsMap);
  }

  _getActionConfigs() {
    return {};
  }

  _init() {
    super._init();

    this._props = _extends({}, this.option());
    this._documentFragment = domAdapter.createDocumentFragment();
    this._actionsMap = {};
    this._componentTemplates = {};

    this._propsInfo.templates.forEach(template => {
      this._componentTemplates[template] = this._createTemplateComponent(this._props[template]);
    });

    Object.keys(this._getActionConfigs()).forEach(name => this._addAction(name));
    this._viewRef = createRef();

    this._supportedKeys = () => ({});
  }

  _addAction(event, action) {
    if (!action) {
      var actionByOption = this._createActionByOption(event, this._getActionConfigs()[event]);

      action = function action(actArgs) {
        Object.keys(actArgs).forEach(name => {
          if (isDefined(actArgs[name]) && domAdapter.isNode(actArgs[name])) {
            actArgs[name] = getPublicElement($(actArgs[name]));
          }
        });
        return actionByOption(actArgs);
      };
    }

    this._actionsMap[event] = action;
  }

  _optionChanged(option) {
    var {
      fullName,
      name,
      value
    } = option;
    updatePropsImmutable(this._props, this.option(), name, fullName);

    if (this._propsInfo.templates.indexOf(name) > -1) {
      this._componentTemplates[name] = this._createTemplateComponent(value);
    }

    if (name && this._getActionConfigs()[name]) {
      this._addAction(name);
    }

    super._optionChanged(option);

    this._invalidate();
  }

  _extractDefaultSlot() {
    if (this.option("_hasAnonymousTemplateContent")) {
      return createElement(TemplateWrapper, {
        template: this._getTemplate(this._templateManager.anonymousTemplateName),
        transclude: true
      });
    }

    return null;
  }

  _createTemplateComponent(templateOption) {
    if (!templateOption) {
      return;
    }

    var template = this._getTemplate(templateOption);

    var templateWrapper = model => {
      return createElement(TemplateWrapper, {
        template,
        model
      });
    };

    return templateWrapper;
  }

  _wrapKeyDownHandler(handler) {
    return options => {
      var {
        keyName,
        originalEvent,
        which
      } = options;

      var keys = this._supportedKeys();

      var func = keys[keyName] || keys[which];

      if (func !== undefined) {
        var _handler = func.bind(this);

        var result = _handler(originalEvent, options);

        if (!result) {
          originalEvent.cancel = true;
          return originalEvent;
        }
      }

      return handler === null || handler === void 0 ? void 0 : handler(originalEvent, options);
    };
  }

  _toPublicElement(element) {
    return getPublicElement($(element));
  }

  _patchElementParam(value) {
    var _result, _result2;

    var result;

    try {
      result = $(value);
    } catch (error) {
      return value;
    }

    result = (_result = result) === null || _result === void 0 ? void 0 : _result.get(0);
    return (_result2 = result) !== null && _result2 !== void 0 && _result2.nodeType ? result : value;
  }

  repaint() {
    this._isNodeReplaced = false;

    this._refresh();
  }

  registerKeyHandler(key, handler) {
    var currentKeys = this._supportedKeys();

    this._supportedKeys = () => _extends({}, currentKeys, {
      [key]: handler
    });
  }

  setAria(name, value) {
    throw new Error('"setAria" method is deprecated, use "aria" property instead');
  }

}
ComponentWrapper.IS_RENOVATED_WIDGET = false;
ComponentWrapper.IS_RENOVATED_WIDGET = true;