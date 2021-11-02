"use strict";

exports.default = void 0;

var _editor = _interopRequireDefault(require("./editor"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CheckBox = /*#__PURE__*/function (_Editor) {
  _inheritsLoose(CheckBox, _Editor);

  function CheckBox() {
    return _Editor.apply(this, arguments) || this;
  }

  var _proto = CheckBox.prototype;

  _proto._useTemplates = function _useTemplates() {
    return false;
  };

  _proto._optionChanged = function _optionChanged(option) {
    var _this$_valueChangeAct;

    var _ref = option || {},
        name = _ref.name,
        previousValue = _ref.previousValue,
        value = _ref.value;

    switch (name) {
      case "value":
        (_this$_valueChangeAct = this._valueChangeAction) === null || _this$_valueChangeAct === void 0 ? void 0 : _this$_valueChangeAct.call(this, {
          element: this.$element(),
          previousValue: previousValue,
          value: value,
          event: this._valueChangeEventInstance
        });
        this._valueChangeEventInstance = undefined;

        _Editor.prototype._optionChanged.call(this, option);

        break;

      case "onValueChanged":
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        });
        break;

      default:
        _Editor.prototype._optionChanged.call(this, option);

    }

    this._invalidate();
  };

  _proto.setAria = function setAria(name, value) {
    var attrName = (0, _utils.getAriaName)(name);
    (0, _utils.addAttributes)(this.$element(), [{
      name: attrName,
      value: value
    }]);
  };

  return CheckBox;
}(_editor.default);

exports.default = CheckBox;
module.exports = exports.default;
module.exports.default = exports.default;