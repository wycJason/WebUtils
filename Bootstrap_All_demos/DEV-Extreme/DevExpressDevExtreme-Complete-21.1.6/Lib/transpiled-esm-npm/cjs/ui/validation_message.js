"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));

var _ui = _interopRequireDefault(require("./overlay/ui.overlay"));

var _extend = require("../core/utils/extend");

var _string = require("../core/utils/string");

var _position = require("../core/utils/position");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_MESSAGE = 'dx-invalid-message';
var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
var INVALID_MESSAGE_ALWAYS = 'dx-invalid-message-always';
var INVALID_MESSAGE_CONTENT = 'dx-invalid-message-content';
var VALIDATION_MESSAGE_MIN_WIDTH = 100;

var ValidationMessage = _ui.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      integrationOptions: {},
      templatesRenderAsynchronously: false,
      shading: false,
      width: 'auto',
      height: 'auto',
      closeOnOutsideClick: false,
      closeOnTargetScroll: false,
      animation: null,
      visible: true,
      propagateOutsideClick: true,
      _checkParentVisibility: false,
      rtlEnabled: false,
      contentTemplate: this._renderInnerHtml,
      maxWidth: '100%',
      mode: 'auto',
      validationErrors: undefined,
      positionRequest: undefined,
      describedElement: undefined,
      boundary: undefined,
      offset: {
        h: 0,
        v: 0
      }
    });
  },
  _init: function _init() {
    this.callBase();
    this.updateMaxWidth();

    this._updatePosition();
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(INVALID_MESSAGE);
    this.$wrapper().addClass(INVALID_MESSAGE);

    this._toggleModeClass();

    this._updateContentId();
  },
  _updateContentId: function _updateContentId() {
    var describedElement = this.option('describedElement') || this.option('container');
    var contentId = (0, _renderer.default)(describedElement).attr('aria-describedby');
    this.$content().addClass(INVALID_MESSAGE_CONTENT).attr('id', contentId);
  },
  _renderInnerHtml: function _renderInnerHtml(element) {
    var $element = element && (0, _renderer.default)(element);
    var validationErrors = this.option('validationErrors') || [];
    var validationErrorMessage = '';
    validationErrors.forEach(function (err) {
      var separator = validationErrorMessage ? '<br />' : '';
      validationErrorMessage += separator + (0, _string.encodeHtml)((err === null || err === void 0 ? void 0 : err.message) || '');
    });
    $element === null || $element === void 0 ? void 0 : $element.html(validationErrorMessage);
  },
  _toggleModeClass: function _toggleModeClass() {
    var mode = this.option('mode');
    this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, mode === 'auto').toggleClass(INVALID_MESSAGE_ALWAYS, mode === 'always');
  },
  updateMaxWidth: function updateMaxWidth() {
    var _target$outerWidth;

    var target = this.option('target');
    var targetWidth = (target === null || target === void 0 ? void 0 : (_target$outerWidth = target.outerWidth) === null || _target$outerWidth === void 0 ? void 0 : _target$outerWidth.call(target)) || (0, _renderer.default)(target).outerWidth();
    var maxWidth = '100%';

    if (targetWidth) {
      maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH);
    }

    this.option({
      maxWidth: maxWidth
    });
  },
  _updatePosition: function _updatePosition() {
    var _this$option = this.option(),
        positionRequest = _this$option.positionRequest,
        rtlEnabled = _this$option.rtlEnabled,
        offset = _this$option.offset,
        boundary = _this$option.boundary;

    var positionSide = (0, _position.getDefaultAlignment)(rtlEnabled);
    var verticalPositions = positionRequest === 'below' ? [' top', ' bottom'] : [' bottom', ' top'];
    if (rtlEnabled) offset.h = -offset.h;
    if (positionRequest !== 'below') offset.v = -offset.v;
    this.option('position', {
      offset: offset,
      boundary: boundary,
      my: positionSide + verticalPositions[0],
      at: positionSide + verticalPositions[1],
      collision: 'none flip'
    });
  },
  _optionChanged: function _optionChanged(args) {
    var name = args.name,
        value = args.value;

    switch (name) {
      case 'target':
        this.updateMaxWidth();
        this.callBase(args);
        break;

      case 'boundary':
        this.option('position.boundary', value);
        break;

      case 'mode':
        this._toggleModeClass(value);

        break;

      case 'rtlEnabled':
      case 'offset':
      case 'positionRequest':
        this._updatePosition();

        break;

      case 'validationErrors':
        this._renderInnerHtml(this.$content());

        break;

      default:
        this.callBase(args);
    }
  }
});

(0, _component_registrator.default)('dxValidationMessage', ValidationMessage);
var _default = ValidationMessage;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;