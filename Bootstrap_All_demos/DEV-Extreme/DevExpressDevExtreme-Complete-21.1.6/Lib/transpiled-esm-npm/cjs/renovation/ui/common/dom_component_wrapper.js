"use strict";

exports.DomComponentWrapper = exports.DomComponentWrapperProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _config_context = require("../../common/config_context");

var _render_template = require("../../utils/render_template");

var _excluded = ["itemTemplate", "valueChange"],
    _excluded2 = ["componentProps", "componentType", "rootElementRef"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var className = _ref.props.componentProps.className,
      restAttributes = _ref.restAttributes,
      widgetRef = _ref.widgetRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef));
};

exports.viewFunction = viewFunction;
var DomComponentWrapperProps = {};
exports.DomComponentWrapperProps = DomComponentWrapperProps;

var DomComponentWrapper = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(DomComponentWrapper, _InfernoComponent);

  function DomComponentWrapper(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.widgetRef = (0, _inferno.createRef)();
    _this.getInstance = _this.getInstance.bind(_assertThisInitialized(_this));
    _this.setupWidget = _this.setupWidget.bind(_assertThisInitialized(_this));
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.updateWidget = _this.updateWidget.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = DomComponentWrapper.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.setupWidget, []), new _vdom.InfernoEffect(this.setRootElementRef, []), new _vdom.InfernoEffect(this.updateWidget, [this.props.componentProps, this.config])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[2]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.componentProps, this.config]);
  };

  _proto.setupWidget = function setupWidget() {
    var _this2 = this;

    var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = componentInstance;
    return function () {
      componentInstance.dispose();
      _this2.instance = null;
    };
  };

  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;

    if (rootElementRef) {
      rootElementRef.current = this.widgetRef.current;
    }
  };

  _proto.updateWidget = function updateWidget() {
    var _this$getInstance;

    (_this$getInstance = this.getInstance()) === null || _this$getInstance === void 0 ? void 0 : _this$getInstance.option(this.properties);
  };

  _proto.getInstance = function getInstance() {
    return this.instance;
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  };

  _createClass(DomComponentWrapper, [{
    key: "config",
    get: function get() {
      if ("ConfigContext" in this.context) {
        return this.context.ConfigContext;
      }

      return _config_context.ConfigContext;
    }
  }, {
    key: "properties",
    get: function get() {
      var _this$config;

      var _this$props$component = this.props.componentProps,
          itemTemplate = _this$props$component.itemTemplate,
          valueChange = _this$props$component.valueChange,
          restProps = _objectWithoutProperties(_this$props$component, _excluded);

      var properties = _extends({
        rtlEnabled: ((_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.rtlEnabled) || false
      }, restProps);

      if (valueChange) {
        properties.onValueChanged = function (_ref2) {
          var value = _ref2.value;
          return valueChange(value);
        };
      }

      if (itemTemplate) {
        properties.itemTemplate = function (item, index, container) {
          (0, _render_template.renderTemplate)(itemTemplate, {
            item: item,
            index: index,
            container: container
          }, container);
        };
      }

      return properties;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          componentProps = _this$props.componentProps,
          componentType = _this$props.componentType,
          rootElementRef = _this$props.rootElementRef,
          restProps = _objectWithoutProperties(_this$props, _excluded2);

      return restProps;
    }
  }]);

  return DomComponentWrapper;
}(_vdom.InfernoComponent);

exports.DomComponentWrapper = DomComponentWrapper;
DomComponentWrapper.defaultProps = _extends({}, DomComponentWrapperProps);