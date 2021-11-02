import { inArray } from './array';
import domAdapter from '../dom_adapter';
import { ensureDefined } from './common';
import callOnce from './call_once';
import { getNavigator, hasProperty } from './window';
import devices from '../devices';
import { stylePropPrefix, styleProp } from './style';
var {
  maxTouchPoints,
  msMaxTouchPoints,
  // TODO: remove this line when we drop IE support
  pointerEnabled
} = getNavigator();
var transitionEndEventNames = {
  'webkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MsTransitionEnd',
  'transition': 'transitionend'
};

var supportProp = function supportProp(prop) {
  return !!styleProp(prop);
};

var isNativeScrollingSupported = function isNativeScrollingSupported() {
  var {
    platform,
    version,
    mac: isMac
  } = devices.real();
  var isObsoleteAndroid = version && version[0] < 4 && platform === 'android';
  var isNativeScrollDevice = !isObsoleteAndroid && inArray(platform, ['ios', 'android']) > -1 || isMac;
  return isNativeScrollDevice;
};

var inputType = function inputType(type) {
  if (type === 'text') {
    return true;
  }

  var input = domAdapter.createElement('input');

  try {
    input.setAttribute('type', type);
    input.value = 'wrongValue';
    return !input.value;
  } catch (e) {
    return false;
  }
};

var detectTouchEvents = function detectTouchEvents(hasWindowProperty, maxTouchPoints) {
  return (hasWindowProperty('ontouchstart') || !!maxTouchPoints) && !hasWindowProperty('callPhantom');
};

var detectPointerEvent = function detectPointerEvent(hasWindowProperty, pointerEnabled) {
  // TODO: remove the check of the 'pointerEnabled' when we drop IE support
  var isPointerEnabled = ensureDefined(pointerEnabled, true);
  var canUsePointerEvent = ensureDefined(pointerEnabled, false);
  return hasWindowProperty('PointerEvent') && isPointerEnabled || canUsePointerEvent;
};

var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty, pointerEnabled);
var touchPointersPresent = !!maxTouchPoints || !!msMaxTouchPoints;
export { touchEvents, pointerEvents, styleProp, stylePropPrefix, supportProp, inputType };
export var touch = touchEvents || pointerEvents && touchPointersPresent;
export var transition = callOnce(function () {
  return supportProp('transition');
});
export var transitionEndEventName = callOnce(function () {
  return transitionEndEventNames[styleProp('transition')];
});
export var animation = callOnce(function () {
  return supportProp('animation');
});
export var nativeScrolling = isNativeScrollingSupported();