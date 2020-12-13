import TripEventsView from "../view/trip-events";
import EventsListView from "../view/events-list";
import EmptyEventsListView from "../view/empty-events-list";
import EventsItemView from "../view/events-item";
import TripSortView from "../view/trip-sort";
import {render, RenderPosition, replace} from "../utils/render";
import EventsItem from "../view/events-item";
import EventsEditForm from "../view/events-edit-form";

const EVENTS_COUNT = 5;

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripEvents = new TripEventsView();
    this._eventsList = new EventsListView();
    this._emptyEventsList = new EmptyEventsListView();
    this._eventsItem = new EventsItemView();
    this._eventsSort = new TripSortView();
  }

  init(events) {
    this._events = events.slice();

    render(this._tripContainer, this._tripEvents, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsList, RenderPosition.BEFOREEND);
  }

  _renderEmptyEventsList() {
    render(this._tripEvents, this._emptyEventsList, RenderPosition.BEFOREEND);
  }

  _renderEventsItem(event) {
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

    render(this._eventsList, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsItems() {
    this._events.forEach((eventItem) => this._renderEventsItem(eventItem));
  }

  _renderEventsSort() {
    render(this._tripEvents, this._eventsSort, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    this._renderEventsSort();

    if (this._events === null) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsList();
    this._renderEventsItems();
  }
}
