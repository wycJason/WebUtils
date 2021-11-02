import Editor from "./editor";
import { addAttributes, getAriaName } from "./utils";
export default class CheckBox extends Editor {
  _useTemplates() {
    return false;
  }

  _optionChanged(option) {
    var _this$_valueChangeAct;

    var {
      name,
      previousValue,
      value
    } = option || {};

    switch (name) {
      case "value":
        (_this$_valueChangeAct = this._valueChangeAction) === null || _this$_valueChangeAct === void 0 ? void 0 : _this$_valueChangeAct.call(this, {
          element: this.$element(),
          previousValue,
          value,
          event: this._valueChangeEventInstance
        });
        this._valueChangeEventInstance = undefined;

        super._optionChanged(option);

        break;

      case "onValueChanged":
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        });
        break;

      default:
        super._optionChanged(option);

    }

    this._invalidate();
  }

  setAria(name, value) {
    var attrName = getAriaName(name);
    addAttributes(this.$element(), [{
      name: attrName,
      value
    }]);
  }

}