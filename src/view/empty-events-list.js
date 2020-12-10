import AbstractEvent from "./abstractEvent";

const createEmptyEventsListTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}

export default class EmptyEventsList extends AbstractEvent {
  getTemplate() {
    return createEmptyEventsListTemplate();
  }
}
