import TripInfo from "./view/trip-info";
import TripCost from "./view/trip-cost";
import SiteMenu from "./view/site-nav";
import SiteFilters from "./view/site-filters";
import TripPresenter from "./presenter/trip";
import {generatePoint} from "./mock/point";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteTripMainElement, new TripInfo(events), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, new TripCost(events), RenderPosition.BEFOREEND);

const siteControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteControlsElement, new SiteMenu(), RenderPosition.AFTERBEGIN);
render(siteControlsElement, new SiteFilters(), RenderPosition.BEFOREEND);

const siteTripEventsContainer = document.querySelector(`.page-main .page-body__container`);
const tripPresenter = new TripPresenter(siteTripEventsContainer);
tripPresenter.init(events);

