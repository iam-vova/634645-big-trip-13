import AbstractEvent from "./abstractEvent";

const createTripEventsTemplate = () => {
  return `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>

          </section>`;
};

export default class TripEvents extends AbstractEvent {
  getTemplate() {
    return createTripEventsTemplate();
  }
}
