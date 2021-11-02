"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  dataAccessors: {
    getAppointmentSettings: function getAppointmentSettings(element) {
      return (0, _renderer.default)(element).data(_constants.APPOINTMENT_SETTINGS_KEY);
    },
    getAppointmentInfo: function getAppointmentInfo(element) {
      var settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    }
  }
};
var _default = utils;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;