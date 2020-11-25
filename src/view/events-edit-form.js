import {getFormatedDate} from "../utils/common";
import {EVENT_TYPES, DESTINATIONS, EXTRA_OPTIONS} from "../const";

const getOfferIdName = (opton) => {
  return opton.split(` `).pop();
};

const createEventTypeItemTemplate = (currentType) => {
  return EVENT_TYPES.map((type) => `<div class="event__type-item">
                        <input id="event-type-${type.toLowerCase()}-1"
                        class="event__type-input  visually-hidden"
                        type="radio"
                        name="event-type"
                        value="${type.toLowerCase()}"
                        ${currentType === type ? `checked` : ``}>
                        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
                      </div>`).join(``);
};

const createEventOffersTemplate = (eventOffers) => {
  const checkedEvents = eventOffers.map((offer) => {
    return offer.title;
  });

  return EXTRA_OPTIONS.map((option) => ` <div class="event__offer-selector">
                      <input class="event__offer-checkbox visually-hidden"
                      id="event-offer-${getOfferIdName(option.title)}-1"
                      type="checkbox"
                      name="event-offer-${getOfferIdName(option.title)}"
                      ${checkedEvents.includes(option.title) ? `checked` : ``}
                      >
                      <label class="event__offer-label" for="event-offer-${getOfferIdName(option.title)}-1">
                        <span class="event__offer-title">${option.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${option.cost}</span>
                      </label>
                    </div>`).join(``);
};

const createDestinationListTemplate = () => {
  return DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join(``);
};

export const createEventsEditFormTemplate = (event) => {
  const {type, destination, dateFrom, dateTo, cost, extraOptions} = event;
  const {destinationName, description} = destination;

  const timeStart = getFormatedDate(dateFrom, `DD/MM/YY HH:MM`);
  const timeEnd = getFormatedDate(dateTo, `DD/MM/YY HH:MM`);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                       ${createEventTypeItemTemplate(type)}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    ${createDestinationListTemplate()}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                  <div class="event__available-offers">
                    ${createEventOffersTemplate(extraOptions)}
                  </div>
                </section>

                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${description}</p>
                </section>
              </section>
            </form>
          </li>`;
};
