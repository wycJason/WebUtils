"use strict";

exports.default = void 0;

var _extend = require("./extend");

var _window = require("./window");

var navigator = (0, _window.getNavigator)();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var ieRegExp = /(msie) (\d{1,2}\.\d)/;
var ie11RegExp = /(trident).*rv:(\d{1,2}\.\d)/;
var msEdge = /(edge)\/((\d+)?[\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;

var browserFromUA = function browserFromUA(ua) {
  ua = ua.toLowerCase();
  var result = {};
  var matches = ieRegExp.exec(ua) || ie11RegExp.exec(ua) || msEdge.exec(ua) || ua.indexOf('compatible') < 0 && mozillaRegExp.exec(ua) || webkitRegExp.exec(ua) || [];
  var browserName = matches[1];
  var browserVersion = matches[2];

  if (browserName === 'webkit') {
    result['webkit'] = true;

    if (ua.indexOf('chrome') >= 0 || ua.indexOf('crios') >= 0) {
      browserName = 'chrome';
      browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf('fxios') >= 0) {
      browserName = 'mozilla';
      browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf('safari') >= 0 && /version|phantomjs/.test(ua)) {
      browserName = 'safari';
      browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else {
      browserName = 'unknown';
      browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    }
  }

  if (browserName === 'trident' || browserName === 'edge') {
    browserName = 'msie';
  }

  if (browserName) {
    result[browserName] = true;
    result.version = browserVersion;
  }

  return result;
};

var _default = (0, _extend.extend)({
  _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent));

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;