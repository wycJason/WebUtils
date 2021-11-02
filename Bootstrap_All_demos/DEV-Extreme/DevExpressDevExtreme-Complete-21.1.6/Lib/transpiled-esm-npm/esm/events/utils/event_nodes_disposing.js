import eventsEngine from '../core/events_engine';
var REMOVE_EVENT_NAME = 'dxremove';

function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(node => !!node);
}

export var subscribeNodesDisposing = (event, callback) => {
  eventsEngine.one(nodesByEvent(event), REMOVE_EVENT_NAME, callback);
};
export var unsubscribeNodesDisposing = (event, callback) => {
  eventsEngine.off(nodesByEvent(event), REMOVE_EVENT_NAME, callback);
};