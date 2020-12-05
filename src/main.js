import TripInfo from "./view/trip-info";
import TripCost from "./view/trip-cost";
import SiteMenu from "./view/site-nav";
import SiteFilters from "./view/site-filters";
import TripSort from "./view/trip-sort";
import EventsList, {createEventsListTemplate} from "./view/events-list";
import EventsItem from "./view/events-item";
// import EventsCreateForm from "./view/events-create-form";
import EventsEditForm from "./view/events-edit-form";
import {generatePoint} from "./mock/point";
import {renderTemplate, render, RenderPosition} from "./utils/common";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteTripMainElement, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, new TripCost(events).getElement(), RenderPosition.BEFOREEND);

const siteControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteControlsElement, new SiteMenu().getElement(), RenderPosition.AFTERBEGIN);
render(siteControlsElement, new SiteFilters().getElement(), RenderPosition.BEFOREEND);

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteEventsElement, new TripSort().getElement(), RenderPosition.BEFOREEND);

const eventsListComponent = new EventsList();
render(siteEventsElement, eventsListComponent.getElement(), RenderPosition.BEFOREEND);
// render(eventsListComponent.getElement(), new EventsCreateForm(events[0]).getElement(), RenderPosition.AFTERBEGIN);
// render(eventsListComponent.getElement(), new EventsEditForm(events[0]).getElement(), RenderPosition.AFTERBEGIN);

const renderEvent = (eventsListElement, event) => {
  const eventComponent = new EventsItem(event);
  const eventEditComponent = new EventsEditForm(event);

  const replaceEventToForm = () => {
    eventsListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventsListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventsListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderEvent(eventsListComponent.getElement(), events[i]);
}

