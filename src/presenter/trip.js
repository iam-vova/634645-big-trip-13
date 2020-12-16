import TripEventsView from "../view/trip-events";
import EventsListView from "../view/events-list";
import EmptyEventsListView from "../view/empty-events-list";
import TripSortView from "../view/trip-sort";
import {render, RenderPosition} from "../utils/render";
import EventPresenter from "./event";
import {updateItem} from "../utils/common";
import {SortType} from "../const";
import {sortEventsByDay, sortEventsByPrice, sortEventsByTime} from "../utils/event";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripEvents = new TripEventsView();
    this._eventsList = new EventsListView();
    this._emptyEventsList = new EmptyEventsListView();
    this._eventsSort = new TripSortView();
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();

    render(this._tripContainer, this._tripEvents, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _clearEventsList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsList, RenderPosition.BEFOREEND);

    this._renderEventsItems();
  }

  _renderEmptyEventsList() {
    render(this._tripEvents, this._emptyEventsList, RenderPosition.BEFOREEND);
  }

  _renderEventsItem(event) {
    const eventPresenter = new EventPresenter(this._eventsList, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEventsItems() {
    this._events.forEach((eventItem) => this._renderEventsItem(eventItem));
  }

  _renderEventsSort() {
    render(this._tripEvents, this._eventsSort, RenderPosition.BEFOREEND);
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripEvents() {
    this._renderEventsSort();

    if (this._events === null) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsList();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updateEvent) {
    this._events = updateItem(this._events, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._events.sort(sortEventsByDay);
        break;
      case SortType.TIME:
        this._events.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._events.sort(sortEventsByPrice);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderEventsList();
  }
}
