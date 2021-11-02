import domAdapter from '../dom_adapter';
import injector from './dependency_injector';
import { hasWindow } from './window';
import callOnce from './call_once';
var callbacks = [];

var isReady = () => {
  // NOTE: we can't use document.readyState === "interactive" because of ie9/ie10 support
  return domAdapter.getReadyState() === 'complete' || domAdapter.getReadyState() !== 'loading' && !domAdapter.getDocumentElement().doScroll;
};

var subscribeReady = callOnce(() => {
  var removeListener = domAdapter.listen(domAdapter.getDocument(), 'DOMContentLoaded', () => {
    readyCallbacks.fire();
    removeListener();
  });
});
var readyCallbacks = {
  add: callback => {
    var windowExists = hasWindow();

    if (windowExists && isReady()) {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach(callback => callback());
    callbacks = [];
  }
};
export default injector(readyCallbacks);