import $ from '../core/renderer';
import registerComponent from '../core/component_registrator';
import Overlay from './overlay/ui.overlay';
import { extend } from '../core/utils/extend';
import { encodeHtml } from '../core/utils/string';
import { getDefaultAlignment } from '../core/utils/position';
var INVALID_MESSAGE = 'dx-invalid-message';
var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
var INVALID_MESSAGE_ALWAYS = 'dx-invalid-message-always';
var INVALID_MESSAGE_CONTENT = 'dx-invalid-message-content';
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = Overlay.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
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

  _init() {
    this.callBase();
    this.updateMaxWidth();

    this._updatePosition();
  },

  _initMarkup() {
    this.callBase();
    this.$element().addClass(INVALID_MESSAGE);
    this.$wrapper().addClass(INVALID_MESSAGE);

    this._toggleModeClass();

    this._updateContentId();
  },

  _updateContentId() {
    var describedElement = this.option('describedElement') || this.option('container');
    var contentId = $(describedElement).attr('aria-describedby');
    this.$content().addClass(INVALID_MESSAGE_CONTENT).attr('id', contentId);
  },

  _renderInnerHtml(element) {
    var $element = element && $(element);
    var validationErrors = this.option('validationErrors') || [];
    var validationErrorMessage = '';
    validationErrors.forEach(err => {
      var separator = validationErrorMessage ? '<br />' : '';
      validationErrorMessage += separator + encodeHtml((err === null || err === void 0 ? void 0 : err.message) || '');
    });
    $element === null || $element === void 0 ? void 0 : $element.html(validationErrorMessage);
  },

  _toggleModeClass() {
    var mode = this.option('mode');
    this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, mode === 'auto').toggleClass(INVALID_MESSAGE_ALWAYS, mode === 'always');
  },

  updateMaxWidth() {
    var _target$outerWidth;

    var target = this.option('target');
    var targetWidth = (target === null || target === void 0 ? void 0 : (_target$outerWidth = target.outerWidth) === null || _target$outerWidth === void 0 ? void 0 : _target$outerWidth.call(target)) || $(target).outerWidth();
    var maxWidth = '100%';

    if (targetWidth) {
      maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH);
    }

    this.option({
      maxWidth
    });
  },

  _updatePosition: function _updatePosition() {
    var {
      positionRequest,
      rtlEnabled,
      offset,
      boundary
    } = this.option();
    var positionSide = getDefaultAlignment(rtlEnabled);
    var verticalPositions = positionRequest === 'below' ? [' top', ' bottom'] : [' bottom', ' top'];
    if (rtlEnabled) offset.h = -offset.h;
    if (positionRequest !== 'below') offset.v = -offset.v;
    this.option('position', {
      offset,
      boundary,
      my: positionSide + verticalPositions[0],
      at: positionSide + verticalPositions[1],
      collision: 'none flip'
    });
  },

  _optionChanged(args) {
    var {
      name,
      value
    } = args;

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
registerComponent('dxValidationMessage', ValidationMessage);
export default ValidationMessage;