import {createTripInfoTepmplate} from "./view/trip-info";
import {createTripCostTemplate} from "./view/trip-cost";
import {createSiteMenuTemplate} from "./view/site-nav";
import {createSiteFiltersTemplate} from "./view/site-filters";
import {createTripSortTemplate} from "./view/trip-sort";
import {createEventsListTemplate} from "./view/events-list";
import {createEventsItemTemplate} from "./view/events-item";
// import {createEventsCreateFormTemplate} from "./view/events-create-form";
import {createEventsEditFormTemplate} from "./view/events-edit-form";
import {generatePoint} from "./mock/point";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteTripMainElement, createTripInfoTepmplate(events), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, createTripCostTemplate(events), `beforeend`);

const siteControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteControlsElement, createSiteMenuTemplate(), `afterbegin`);
render(siteControlsElement, createSiteFiltersTemplate(), `beforeend`);

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteEventsElement, createTripSortTemplate(), `beforeend`);
render(siteEventsElement, createEventsListTemplate(), `beforeend`);

const siteEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);

// render(siteEventsListElement, createEventsCreateFormTemplate(events[0]), 'afterbegin');
render(siteEventsListElement, createEventsEditFormTemplate(events[0]), `afterbegin`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(siteEventsListElement, createEventsItemTemplate(events[i]), `beforeend`);
}

// Информация о маршруте;
// Стоимость поездки;
// Меню;
// Фильтры;
// Сортировка;
// Форма создания;
// Форма редактирования;
// Точка маршрута (в списке)
