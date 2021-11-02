import $ from '../../core/renderer';
import { APPOINTMENT_SETTINGS_KEY } from './constants';
var utils = {
  dataAccessors: {
    getAppointmentSettings: element => {
      return $(element).data(APPOINTMENT_SETTINGS_KEY);
    },
    getAppointmentInfo: element => {
      var settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    }
  }
};
export default utils;