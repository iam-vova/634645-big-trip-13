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
render(siteEventsElement, new EventsList().getElement(), RenderPosition.BEFOREEND);

const siteEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);

// render(siteEventsListElement, new EventsCreateForm(events[0]).getElement(), RenderPosition.AFTERBEGIN);
render(siteEventsListElement, new EventsEditForm(events[0]).getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(siteEventsListElement, new EventsItem(events[i]).getElement(), RenderPosition.BEFOREEND);
}

// Информация о маршруте;
// Стоимость поездки;
// Меню;
// Фильтры;
// Сортировка;
// Форма создания;
// Форма редактирования;
// Точка маршрута (в списке)
