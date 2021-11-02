"use strict";

exports.TooltipItemLayout = exports.TooltipItemLayoutProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _noop = _interopRequireDefault(require("../../../utils/noop"));

var _marker = require("./marker");

var _button = require("../../button");

var _item_content = require("./item_content");

var _get_current_appointment = _interopRequireDefault(require("./utils/get_current_appointment"));

var _default_functions = require("./utils/default_functions");

var _excluded = ["className", "getTextAndFormatDate", "index", "item", "itemContentTemplate", "onDelete", "onHide", "showDeleteButton", "singleAppointment"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  var ItemContentTemplate = viewModel.props.itemContentTemplate;
  return viewModel.props.itemContentTemplate ? ItemContentTemplate({
    model: {
      appointmentData: viewModel.props.item.data,
      targetedAppointmentData: viewModel.currentAppointment
    },
    index: viewModel.props.index
  }) : (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", "dx-tooltip-appointment-item ".concat(viewModel.props.className), [(0, _inferno.createComponentVNode)(2, _marker.Marker), (0, _inferno.createComponentVNode)(2, _item_content.TooltipItemContent, {
    "text": viewModel.formattedContent.text,
    "formattedDate": viewModel.formattedContent.formatDate
  }), viewModel.props.showDeleteButton && (0, _inferno.createVNode)(1, "div", "dx-tooltip-appointment-item-delete-button-container", (0, _inferno.createComponentVNode)(2, _button.Button, {
    "className": "dx-tooltip-appointment-item-delete-button",
    "icon": "trash",
    "stylingMode": "text",
    "onClick": viewModel.onDeleteButtonClick
  }), 2)], 0, _extends({}, viewModel.restAttributes)));
};

exports.viewFunction = viewFunction;
var TooltipItemLayoutProps = {
  className: "",
  item: {
    data: {}
  },
  index: 0,
  showDeleteButton: true,
  onDelete: _noop.default,
  onHide: _noop.default,
  getTextAndFormatDate: _default_functions.defaultGetTextAndFormatDate,
  singleAppointment: {}
};
exports.TooltipItemLayoutProps = TooltipItemLayoutProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var TooltipItemLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TooltipItemLayout, _BaseInfernoComponent);

  function TooltipItemLayout(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = TooltipItemLayout.prototype;

  _proto.render = function render() {
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
  };

  _createClass(TooltipItemLayout, [{
    key: "currentAppointment",
    get: function get() {
      var item = this.props.item;
      return (0, _get_current_appointment.default)(item);
    }
  }, {
    key: "onDeleteButtonClick",
    get: function get() {
      var _this$props = this.props,
          item = _this$props.item,
          onDelete = _this$props.onDelete,
          onHide = _this$props.onHide,
          singleAppointment = _this$props.singleAppointment;
      return function (e) {
        onHide();
        e.event.stopPropagation();
        onDelete(item.data, singleAppointment);
      };
    }
  }, {
    key: "formattedContent",
    get: function get() {
      var _this$props2 = this.props,
          getTextAndFormatDate = _this$props2.getTextAndFormatDate,
          item = _this$props2.item;
      var data = item.data;
      return getTextAndFormatDate(data, this.currentAppointment);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          getTextAndFormatDate = _this$props3.getTextAndFormatDate,
          index = _this$props3.index,
          item = _this$props3.item,
          itemContentTemplate = _this$props3.itemContentTemplate,
          onDelete = _this$props3.onDelete,
          onHide = _this$props3.onHide,
          showDeleteButton = _this$props3.showDeleteButton,
          singleAppointment = _this$props3.singleAppointment,
          restProps = _objectWithoutProperties(_this$props3, _excluded);

      return restProps;
    }
  }]);

  return TooltipItemLayout;
}(_vdom.BaseInfernoComponent);

exports.TooltipItemLayout = TooltipItemLayout;
TooltipItemLayout.defaultProps = _extends({}, TooltipItemLayoutProps);