import eventsEngine from "../../events/core/events_engine";
import * as clickEvent from "../../events/click";
export function subscribeToEvent(eventName) {
  return (element, handler) => {
    if (handler && element) {
      eventsEngine.on(element, eventName, handler);
      return () => eventsEngine.off(element, eventName, handler);
    }

    return undefined;
  };
}
export var subscribeToClickEvent = subscribeToEvent(clickEvent.name);
export var subscribeToScrollEvent = subscribeToEvent("scroll");