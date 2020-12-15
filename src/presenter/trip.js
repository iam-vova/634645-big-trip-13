import TripEventsView from "../view/trip-events";
import EventsListView from "../view/events-list";
import EmptyEventsListView from "../view/empty-events-list";
import TripSortView from "../view/trip-sort";
import {render, RenderPosition} from "../utils/render";
import EventPresenter from "./event";
import {updateItem} from "../utils/common";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};

    this._tripEvents = new TripEventsView();
    this._eventsList = new EventsListView();
    this._emptyEventsList = new EmptyEventsListView();
    this._eventsSort = new TripSortView();
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(events) {
    this._events = events.slice();

    render(this._tripContainer, this._tripEvents, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _clearEventsList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsList, RenderPosition.BEFOREEND);
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

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updateEvent) {
    this._events = updateItem(this._events, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }
}
