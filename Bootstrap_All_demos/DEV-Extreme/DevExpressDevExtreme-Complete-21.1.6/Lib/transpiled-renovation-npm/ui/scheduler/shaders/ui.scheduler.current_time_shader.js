"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE_TIME_SHADER_CLASS = 'dx-scheduler-date-time-shader';

var CurrentTimeShader = /*#__PURE__*/function () {
  function CurrentTimeShader(workSpace) {
    this._workSpace = workSpace;
    this._$container = this._workSpace._dateTableScrollable.$content();
  }

  var _proto = CurrentTimeShader.prototype;

  _proto.render = function render() {
    var _this = this;

    this.initShaderElements();
    this.renderShader();
    this.applyShaderMargin(this._$shader);

    this._shader.forEach(function (shader, index) {
      _this._$container.append(shader);
    });
  };

  _proto.initShaderElements = function initShaderElements() {
    this._$shader = this.createShader();
    this._shader = [];

    this._shader.push(this._$shader);
  };

  _proto.renderShader = function renderShader() {};

  _proto.applyShaderMargin = function applyShaderMargin($shader) {
    if ($shader && this._workSpace.option('crossScrollingEnabled')) {
      $shader.css('marginTop', -(0, _position.getBoundingRect)(this._$container.get(0)).height);
      $shader.css('height', (0, _position.getBoundingRect)(this._$container.get(0)).height);
    }
  };

  _proto.createShader = function createShader() {
    return (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_CLASS);
  };

  _proto.clean = function clean() {
    this._$container && this._$container.find('.' + DATE_TIME_SHADER_CLASS).remove();
  };

  return CurrentTimeShader;
}();

var _default = CurrentTimeShader;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;