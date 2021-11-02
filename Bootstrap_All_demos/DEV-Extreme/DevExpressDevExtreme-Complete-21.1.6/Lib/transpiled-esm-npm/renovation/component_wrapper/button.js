"use strict";

exports.default = void 0;

var _validation_engine = _interopRequireDefault(require("../../ui/validation_engine"));

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Button = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto._init = function _init() {
    _Component.prototype._init.call(this);

    this._addAction("onSubmit", this._getSubmitAction());
  };

  _proto.getProps = function getProps() {
    var props = _Component.prototype.getProps.call(this);

    props.validationGroup = this._validationGroupConfig;
    return props;
  };

  _proto._getSubmitAction = function _getSubmitAction() {
    var _this = this;

    var needValidate = true;
    var validationStatus = "valid";
    return this._createAction(function (_ref) {
      var event = _ref.event,
          submitInput = _ref.submitInput;

      if (needValidate) {
        var validationGroup = _this._validationGroupConfig;

        if (validationGroup) {
          var _validationGroup$vali = validationGroup.validate(),
              complete = _validationGroup$vali.complete,
              status = _validationGroup$vali.status;

          validationStatus = status;

          if (status === "pending") {
            needValidate = false;

            _this.option("disabled", true);

            complete.then(function (_ref2) {
              var status = _ref2.status;
              needValidate = true;

              _this.option("disabled", false);

              validationStatus = status;
              validationStatus === "valid" && submitInput.click();
            });
          }
        }
      }

      validationStatus !== "valid" && event.preventDefault();
      event.stopPropagation();
    });
  };

  _proto._findGroup = function _findGroup() {
    var $element = this.$element();
    return this.option("validationGroup") || _validation_engine.default.findGroup($element, this._modelByElement($element));
  };

  _createClass(Button, [{
    key: "_validationGroupConfig",
    get: function get() {
      return _validation_engine.default.getGroupConfig(this._findGroup());
    }
  }]);

  return Button;
}(_component.default);

exports.default = Button;
module.exports = exports.default;
module.exports.default = exports.default;