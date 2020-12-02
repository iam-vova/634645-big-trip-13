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
import {renderTemplate} from "./utils/common";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);


const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);

renderTemplate(siteTripMainElement, createTripInfoTepmplate(events), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
renderTemplate(siteTripInfoElement, createTripCostTemplate(events), `beforeend`);

const siteControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
renderTemplate(siteControlsElement, createSiteMenuTemplate(), `afterbegin`);
renderTemplate(siteControlsElement, createSiteFiltersTemplate(), `beforeend`);

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
renderTemplate(siteEventsElement, createTripSortTemplate(), `beforeend`);
renderTemplate(siteEventsElement, createEventsListTemplate(), `beforeend`);

const siteEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);

// render(siteEventsListElement, createEventsCreateFormTemplate(events[0]), 'afterbegin');
renderTemplate(siteEventsListElement, createEventsEditFormTemplate(events[0]), `afterbegin`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderTemplate(siteEventsListElement, createEventsItemTemplate(events[i]), `beforeend`);
}

// Информация о маршруте;
// Стоимость поездки;
// Меню;
// Фильтры;
// Сортировка;
// Форма создания;
// Форма редактирования;
// Точка маршрута (в списке)
