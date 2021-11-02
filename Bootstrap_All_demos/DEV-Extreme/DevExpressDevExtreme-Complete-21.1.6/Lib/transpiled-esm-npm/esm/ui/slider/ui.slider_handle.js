import $ from '../../core/renderer';
import Widget from '../widget/ui.widget';
import Tooltip from '../tooltip';
import { resetPosition, move, locate } from '../../animation/translator';
import positionUtils from '../../animation/position';
import { fitIntoRange } from '../../core/utils/math';
import { isDefined, type } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { getBoundingRect } from '../../core/utils/position';
import numberLocalization from '../../localization/number';
var SLIDER_CLASS = 'dx-slider';
var SLIDER_HANDLE_CLASS = 'dx-slider-handle';
var POSITION_ALIASES = {
  'top': {
    my: 'bottom center',
    at: 'top center',
    collision: 'none'
  },
  'bottom': {
    my: 'top center',
    at: 'bottom center',
    collision: 'none'
  },
  'right': {
    my: 'left center',
    at: 'right center',
    collision: 'none'
  },
  'left': {
    my: 'right center',
    at: 'left center',
    collision: 'none'
  }
};
var SliderHandle = Widget.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: false,
      value: 0,
      tooltipEnabled: false,
      tooltipFormat: function tooltipFormat(v) {
        return v;
      },
      tooltipPosition: 'top',
      tooltipShowMode: 'onHover',
      tooltipFitIn: null
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(SLIDER_HANDLE_CLASS);
    this.setAria({
      'role': 'slider',
      'valuenow': this.option('value')
    });
  },
  _render: function _render() {
    this._renderTooltip();

    this.callBase();
  },
  _renderTooltip: function _renderTooltip() {
    if (this.option('tooltipEnabled')) {
      if (!this._$tooltip) {
        this._$tooltip = $('<div>').appendTo(this.$element());
      }

      this._$slider = this.$element().closest('.' + SLIDER_CLASS);

      this._updateTooltip();
    } else {
      this._removeTooltip();
    }
  },
  _createTooltip: function _createTooltip() {
    if (this._tooltip) {
      return false;
    }

    this._tooltip = this._createComponent(this._$tooltip, Tooltip, {
      visible: true,
      target: this.$element(),
      closeOnOutsideClick: false,
      container: this.$element(),
      hideTopOverlayHandler: null,
      closeOnTargetScroll: false,
      onPositioned: function (args) {
        this._saveTooltipElements(args.component);

        this._saveTooltipLocation();

        this._centeredTooltipPosition();
      }.bind(this),
      animation: null,
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixedPosition: false
    });
    return true;
  },
  _removeTooltip: function _removeTooltip() {
    if (!this._$tooltip) {
      return;
    }

    this._$tooltip.remove();

    delete this._$tooltip;
    delete this._tooltip;
  },
  _renderTooltipPosition: function _renderTooltipPosition() {
    if (!this._tooltip) {
      return;
    }

    var position = this.option('tooltipPosition');

    this._saveTooltipElements();

    this._resetTooltipPosition();

    if (type(position) === 'string') {
      position = extend({
        boundary: this._$slider,
        boundaryOffset: {
          h: 1,
          v: 1
        }
      }, POSITION_ALIASES[position]);
    }

    this._tooltip.option('position', position);

    this._saveTooltipLocation();
  },
  _saveTooltipElements: function _saveTooltipElements(tooltip) {
    tooltip = this._tooltip || tooltip;
    this._$tooltipContent = tooltip.$content().parent();
    this._$tooltipArrow = this._$tooltipContent.find('.dx-popover-arrow');
  },
  _resetTooltipPosition: function _resetTooltipPosition() {
    resetPosition(this._$tooltipContent);
    resetPosition(this._$tooltipArrow);
  },
  _saveTooltipLocation: function _saveTooltipLocation() {
    this._contentLocate = locate(this._$tooltipContent);
  },
  _centeredTooltipPosition: function _centeredTooltipPosition() {
    if (!this._tooltip) {
      return;
    }

    this._$tooltipContent.outerWidth('auto');

    var outerWidthWithoutRounding = getBoundingRect(this._$tooltipContent.get(0)).width;
    var tooltipOuterWidth = Math.ceil(outerWidthWithoutRounding);
    var roundedTooltipOuterWidth = tooltipOuterWidth % 2 + tooltipOuterWidth;

    this._$tooltipContent.outerWidth(roundedTooltipOuterWidth);

    var tooltipCenter = (roundedTooltipOuterWidth - this.$element().width()) / 2;
    this._contentLocate.left = -tooltipCenter;

    this._$tooltipArrow.css({
      marginLeft: -this._$tooltipArrow.outerWidth() / 2,
      left: '50%'
    });

    this._fitTooltip();
  },
  _fitTooltip: function _fitTooltip() {
    if (!this._tooltip) {
      return;
    }

    var position = this.option('tooltipPosition');

    if (type(position) === 'string') {
      position = extend({
        of: this.$element(),
        boundary: this._$slider,
        boundaryOffset: {
          h: 2,
          v: 1
        }
      }, POSITION_ALIASES[position], {
        collision: 'fit none'
      });
    }

    var calculatePosition = positionUtils.calculate(this._$tooltipContent, position);
    var isLeftSide = calculatePosition.h.collisionSide === 'left';
    var arrowLeft = (isLeftSide ? -1 : 1) * calculatePosition.h.oversize;
    var arrowMinLeft = this._contentLocate.left;

    var arrowMaxRight = this._contentLocate.left + this._$tooltipContent.outerWidth() - this._$tooltipArrow.outerWidth();

    move(this._$tooltipContent, {
      left: this._contentLocate.left + (isLeftSide ? 1 : -1) * calculatePosition.h.oversize
    });
    move(this._$tooltipArrow, {
      left: fitIntoRange(arrowLeft, arrowMinLeft, arrowMaxRight)
    });
  },
  _getFormattedValue: function _getFormattedValue(value) {
    return numberLocalization.format(value, this.option('tooltipFormat'));
  },
  _renderValue: function _renderValue() {
    if (!this._tooltip) {
      return;
    }

    var value = this.option('value');

    this._tooltip.$content().text(this._getFormattedValue(value));

    this._fitTooltip();
  },
  _updateTooltip: function _updateTooltip() {
    var hoverMode = /^onhover$/i.test(this.option('tooltipShowMode'));

    if (!hoverMode) {
      this._createTooltip();
    }

    this.$element().toggleClass('dx-slider-tooltip-on-hover', hoverMode);

    this._renderTooltipPosition();

    this._renderValue();

    this._centeredTooltipPosition();
  },
  _clean: function _clean() {
    this.callBase();
    delete this._$tooltip;
    delete this._tooltip;
  },
  _ensureTooltipIsCentered: function _ensureTooltipIsCentered(value, previousValue) {
    if (isDefined(value) && isDefined(previousValue) && value.toString().length !== previousValue.toString().length) {
      this._centeredTooltipPosition();
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'tooltipFormat':
        this._renderValue();

        break;

      case 'value':
        {
          this._renderValue();

          var value = this._getFormattedValue(args.value);

          var previousValue = this._getFormattedValue(args.previousValue);

          this._ensureTooltipIsCentered(value, previousValue);

          this.setAria('valuenow', args.value);
          break;
        }

      case 'tooltipEnabled':
        this._renderTooltip();

        break;

      case 'tooltipPosition':
        this._renderTooltipPosition();

        this._centeredTooltipPosition();

        break;

      case 'tooltipShowMode':
        this._updateTooltip();

        break;

      case 'tooltipFitIn':
        this._fitTooltip();

        break;

      default:
        this.callBase(args);
    }
  },
  fitTooltipPosition: function fitTooltipPosition() {
    this._fitTooltip();
  },
  updateTooltip: function updateTooltip() {
    if (!this._createTooltip()) {
      return;
    }

    this._renderTooltipPosition();

    this._renderValue();

    this._centeredTooltipPosition();
  },
  repaint: function repaint() {
    this._renderTooltipPosition();

    this._centeredTooltipPosition();

    if (this._tooltip) {
      this._tooltip._visibilityChanged(true);
    }
  }
});
export default SliderHandle;