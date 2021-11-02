"use strict";

exports.calculateAdaptivityProps = calculateAdaptivityProps;
exports.ResizableContainer = exports.ResizableContainerProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));

var _get_element_width = require("./utils/get_element_width");

var _type = require("../../../core/utils/type");

var _excluded = ["contentTemplate", "pagerProps"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var infoTextRef = _ref.infoTextRef,
      infoTextVisible = _ref.infoTextVisible,
      isLargeDisplayMode = _ref.isLargeDisplayMode,
      pageSizesRef = _ref.pageSizesRef,
      pagesRef = _ref.pagesRef,
      parentRef = _ref.parentRef,
      _ref$props = _ref.props,
      Content = _ref$props.contentTemplate,
      pagerProps = _ref$props.pagerProps,
      restAttributes = _ref.restAttributes;
  return Content(_extends({
    rootElementRef: parentRef,
    pageSizesRef: pageSizesRef,
    infoTextRef: infoTextRef,
    pagesRef: pagesRef,
    infoTextVisible: infoTextVisible,
    isLargeDisplayMode: isLargeDisplayMode
  }, _extends({}, pagerProps, restAttributes)));
};

exports.viewFunction = viewFunction;

function calculateAdaptivityProps(_ref2) {
  var infoWidth = _ref2.info,
      pageSizesWidth = _ref2.pageSizes,
      pagesWidth = _ref2.pages,
      parentWidth = _ref2.parent;
  var minimalWidth = pageSizesWidth + pagesWidth + infoWidth;
  var infoTextVisible = parentWidth - minimalWidth > 0;
  var isLargeDisplayMode = parentWidth - (pageSizesWidth + pagesWidth) > 0;
  return {
    infoTextVisible: infoTextVisible,
    isLargeDisplayMode: isLargeDisplayMode
  };
}

function getElementsWidth(_ref3) {
  var info = _ref3.info,
      pageSizes = _ref3.pageSizes,
      pages = _ref3.pages,
      parent = _ref3.parent;
  var parentWidth = (0, _get_element_width.getElementWidth)(parent);
  var pageSizesWidth = (0, _get_element_width.getElementWidth)(pageSizes);
  var infoWidth = (0, _get_element_width.getElementWidth)(info);
  var pagesHtmlWidth = (0, _get_element_width.getElementWidth)(pages);
  return {
    parent: parentWidth,
    pageSizes: pageSizesWidth,
    info: infoWidth + (0, _get_element_width.getElementStyle)("marginLeft", info) + (0, _get_element_width.getElementStyle)("marginRight", info),
    pages: pagesHtmlWidth
  };
}

var ResizableContainerProps = {};
exports.ResizableContainerProps = ResizableContainerProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var ResizableContainer = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(ResizableContainer, _InfernoComponent);

  function ResizableContainer(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this._currentState = null;
    _this.parentRef = (0, _inferno.createRef)();
    _this.pageSizesRef = (0, _inferno.createRef)();
    _this.infoTextRef = (0, _inferno.createRef)();
    _this.pagesRef = (0, _inferno.createRef)();
    _this.state = {
      infoTextVisible: true,
      isLargeDisplayMode: true
    };
    _this.subscribeToResize = _this.subscribeToResize.bind(_assertThisInitialized(_this));
    _this.effectUpdateChildProps = _this.effectUpdateChildProps.bind(_assertThisInitialized(_this));
    _this.updateAdaptivityProps = _this.updateAdaptivityProps.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ResizableContainer.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.subscribeToResize, [this.infoTextVisible, this.isLargeDisplayMode]), new _vdom.InfernoEffect(this.effectUpdateChildProps, [this.infoTextVisible, this.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.infoTextVisible, this.isLargeDisplayMode]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.infoTextVisible, this.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate]);
  };

  _proto.set_infoTextVisible = function set_infoTextVisible(value) {
    var _this2 = this;

    this.setState(function (state) {
      _this2._currentState = state;
      var newValue = value();
      _this2._currentState = null;
      return {
        infoTextVisible: newValue
      };
    });
  };

  _proto.set_isLargeDisplayMode = function set_isLargeDisplayMode(value) {
    var _this3 = this;

    this.setState(function (state) {
      _this3._currentState = state;
      var newValue = value();
      _this3._currentState = null;
      return {
        isLargeDisplayMode: newValue
      };
    });
  };

  _proto.subscribeToResize = function subscribeToResize() {
    var _this4 = this;

    var callback = function callback() {
      _this4.updateAdaptivityProps();
    };

    _resize_callbacks.default.add(callback);

    return function () {
      _resize_callbacks.default.remove(callback);
    };
  };

  _proto.effectUpdateChildProps = function effectUpdateChildProps() {
    var parentWidth = this.parentRef.current ? (0, _get_element_width.getElementWidth)(this.parentRef.current) : 0;

    if (parentWidth > 0) {
      this.updateAdaptivityProps();
    }
  };

  _proto.updateAdaptivityProps = function updateAdaptivityProps() {
    var _this5 = this;

    var currentElementsWidth = getElementsWidth({
      parent: this.parentRef.current,
      pageSizes: this.pageSizesRef.current,
      info: this.infoTextRef.current,
      pages: this.pagesRef.current
    });

    if ((0, _type.isDefined)(this.actualAdaptivityProps) && (this.actualAdaptivityProps.infoTextVisible !== this.infoTextVisible || this.actualAdaptivityProps.isLargeDisplayMode !== this.isLargeDisplayMode)) {
      return;
    }

    var isEmpty = !(0, _type.isDefined)(this.elementsWidth);

    if (isEmpty) {
      this.elementsWidth = {};
    }

    if (isEmpty || this.isLargeDisplayMode) {
      this.elementsWidth.pageSizes = currentElementsWidth.pageSizes;
      this.elementsWidth.pages = currentElementsWidth.pages;
    }

    if (isEmpty || this.infoTextVisible) {
      this.elementsWidth.info = currentElementsWidth.info;
    }

    this.actualAdaptivityProps = calculateAdaptivityProps(_extends({
      parent: currentElementsWidth.parent
    }, this.elementsWidth));
    this.set_infoTextVisible(function () {
      return _this5.actualAdaptivityProps.infoTextVisible;
    });
    this.set_isLargeDisplayMode(function () {
      return _this5.actualAdaptivityProps.isLargeDisplayMode;
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        contentTemplate: getTemplate(props.contentTemplate)
      }),
      infoTextVisible: this.infoTextVisible,
      isLargeDisplayMode: this.isLargeDisplayMode,
      parentRef: this.parentRef,
      pageSizesRef: this.pageSizesRef,
      infoTextRef: this.infoTextRef,
      pagesRef: this.pagesRef,
      updateAdaptivityProps: this.updateAdaptivityProps,
      restAttributes: this.restAttributes
    });
  };

  _createClass(ResizableContainer, [{
    key: "infoTextVisible",
    get: function get() {
      var state = this._currentState || this.state;
      return state.infoTextVisible;
    }
  }, {
    key: "isLargeDisplayMode",
    get: function get() {
      var state = this._currentState || this.state;
      return state.isLargeDisplayMode;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          contentTemplate = _this$props.contentTemplate,
          pagerProps = _this$props.pagerProps,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return ResizableContainer;
}(_vdom.InfernoComponent);

exports.ResizableContainer = ResizableContainer;
ResizableContainer.defaultProps = _extends({}, ResizableContainerProps);