import AbstractEvent from "./abstractEvent";

const getTripCostTotal = (events) => {
  let tripCostTotal = 0;

  for (let event of events) {
    const {cost, extraOptions} = event;

    tripCostTotal += cost;

    for (let extraOption of extraOptions) {
      const {cost: costOption} = extraOption;
      tripCostTotal += costOption;
    }
  }

  return tripCostTotal;
};

const createTripCostTemplate = (events) => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCostTotal(events)}</span>
          </p>`;
};

export default class TripCost extends AbstractEvent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}

