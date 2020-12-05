import {createElement} from "../utils/common";

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

export default class TripCost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

