import {createElement, getFormatedDate} from "../utils/common";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;
const getDurationTime = (time) => {
  const timsMs = time.asMilliseconds();
  if (timsMs <= ONE_HOUR) {
    return time.get(`minutes`) + `M`;
  } else if (timsMs <= ONE_DAY) {
    return time.get(`hours`) + `H ` + time.get(`minutes`) + `M`;
  } else {
    return time.get(`days`) + `D ` + time.get(`hours`) + `H ` + time.get(`minutes`) + `M`;
  }
};

const createExtraOptionsTemplate = (extraOptions) => {
  return extraOptions.map((extraOption) => `<li class="event__offer">
            <span class="event__offer-title">${extraOption.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${extraOption.cost}</span>
          </li>`).join(``);
};

const createEventsItemTemplate = (event) => {
  const {type, destination, dateFrom, dateTo, cost, extraOptions, isFavorite} = event;
  const {destinationName} = destination;

  const timeStart = getFormatedDate(dateFrom, `HH:MM`);
  const timeEnd = getFormatedDate(dateTo, `HH:MM`);
  const daysDiff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const eventIsFavorite = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">${getFormatedDate(dateFrom, `MMM D`)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${destinationName}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${getFormatedDate(dateFrom, `YYYY-MM-DD`) + `T` + timeStart}">${timeStart}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${getFormatedDate(dateFrom, `YYYY-MM-DD`) + `T` + timeEnd}">${timeEnd}</time>
                </p>
                <p class="event__duration">${getDurationTime(daysDiff)}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${cost}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${createExtraOptionsTemplate(extraOptions)}
              </ul>
              <button class="event__favorite-btn ${eventIsFavorite}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class EventsItem {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventsItemTemplate(this._event);
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
