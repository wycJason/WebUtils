import Component from "./component";
import ValidationEngine from "../../ui/validation_engine";
import { extend } from "../../core/utils/extend";
import $ from "../../core/renderer";
import { data } from "../../core/element_data";
import Callbacks from "../../core/utils/callbacks";
import OldEditor from "../../ui/editor/editor";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var VALIDATION_TARGET = "dx-validation-target";
export default class Editor extends Component {
  getProps() {
    var props = super.getProps();

    props.onFocusIn = () => {
      var isValidationMessageShownOnFocus = this.option("validationMessageMode") === "auto";

      if (isValidationMessageShownOnFocus) {
        var $validationMessageWrapper = $(".dx-invalid-message.dx-overlay-wrapper");
        $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
        clearTimeout(this.showValidationMessageTimeout);
        this.showValidationMessageTimeout = setTimeout(() => {
          $validationMessageWrapper === null || $validationMessageWrapper === void 0 ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO);
        }, 150);
      }
    };

    props.saveValueChangeEvent = e => {
      this._valueChangeEventInstance = e;
    };

    return props;
  }

  _init() {
    super._init();

    data(this.$element()[0], VALIDATION_TARGET, this);
    this.validationRequest = Callbacks();
    this.showValidationMessageTimeout = null;
    this._valueChangeAction = this._createActionByOption("onValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {}
    });
  }

  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    var syncOptions = () => this._options.silent(optionsContainer, extend({}, innerWidget.option()));

    syncOptions();
    innerWidget.on("optionChanged", syncOptions);
  }

  _optionChanged() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      name,
      previousValue,
      value
    } = option;

    if (name && this._getActionConfigs()[name]) {
      this._addAction(name);
    }

    switch (name) {
      case "value":
        if (value !== previousValue) {
          this.validationRequest.fire({
            value,
            editor: this
          });
        }

        break;

      case "isValid":
      case "validationError":
      case "validationErrors":
      case "validationStatus":
        this.option(ValidationEngine.synchronizeValidationOptions(option, this.option()));
        break;

      default:
        super._optionChanged(option);

    }

    this._invalidate();
  }

  reset() {
    var {
      value
    } = this._getDefaultOptions();

    this.option({
      value
    });
  }

  _dispose() {
    super._dispose();

    data(this.element(), VALIDATION_TARGET, null);
    clearTimeout(this.showValidationMessageTimeout);
  }

}
var prevIsEditor = OldEditor.isEditor;

OldEditor.isEditor = instance => prevIsEditor(instance) || instance instanceof Editor;