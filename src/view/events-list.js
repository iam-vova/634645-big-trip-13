import AbstractEvent from "./abstractEvent";

const createEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventsList extends AbstractEvent {
  getTemplate() {
    return createEventsListTemplate();
  }
}
