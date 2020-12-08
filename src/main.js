import TripInfo from "./view/trip-info";
import TripCost from "./view/trip-cost";
import SiteMenu from "./view/site-nav";
import SiteFilters from "./view/site-filters";
import TripSort from "./view/trip-sort";
import EventsList from "./view/events-list";
import EventsItem from "./view/events-item";
import EventsCreateForm from "./view/events-create-form";
import EventsEditForm from "./view/events-edit-form";
import {generatePoint} from "./mock/point";
import {render, RenderPosition, replace, remove} from "./utils/render";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteTripMainElement, new TripInfo(events), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, new TripCost(events), RenderPosition.BEFOREEND);

const siteControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteControlsElement, new SiteMenu(), RenderPosition.AFTERBEGIN);
render(siteControlsElement, new SiteFilters(), RenderPosition.BEFOREEND);

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteEventsElement, new TripSort(), RenderPosition.BEFOREEND);

const eventsListComponent = new EventsList();
render(siteEventsElement, eventsListComponent, RenderPosition.BEFOREEND);

const renderEvent = (eventsListElement, event) => {
  const eventComponent = new EventsItem(event);
  const eventEditComponent = new EventsEditForm(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormCloseHandler(() => {
    replaceFormToEvent();
  });

  render(eventsListElement, eventComponent, RenderPosition.BEFOREEND);
};

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderEvent(eventsListComponent, events[i]);
}

