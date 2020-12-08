import AbstractEvent from "./abstractEvent";
import {getFormatedDate} from "../utils/common";

const getTripInfo = (events) => {
  let tripInfo = [];

  for (let event of events) {
    const {destinationName} = event.destination;
    if (tripInfo[tripInfo.length - 1] !== destinationName) {
      tripInfo.push(destinationName);
    }
  }

  return tripInfo.join(` &mdash; `);
};

const getTripEndDate = (timeStart, timeEnd) => {
  const monthStartTrip = timeStart.split(` `).shift();
  const monthEndTrip = timeEnd.split(` `).shift();

  if (monthStartTrip !== monthEndTrip) {
    return timeEnd;
  } else {
    return timeEnd.split(` `).pop();
  }
};

const createTripInfoTepmplate = (events) => {
  const timeStart = getFormatedDate(events[0].dateFrom, `MMM DD`);
  const timeEnd = getFormatedDate(events[events.length - 1].dateTo, `MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTripInfo(events)}</h1>

              <p class="trip-info__dates">${timeStart}&nbsp;&mdash;&nbsp;${getTripEndDate(timeStart, timeEnd)}</p>
            </div>
          </section>`;
};

export default class TripInfo extends AbstractEvent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTepmplate(this._events);
  }
}
