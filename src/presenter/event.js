import EventsItemView from "../view/events-item";
import EventsEditForm from "../view/events-edit-form";
import {remove, render, RenderPosition, replace} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventsListContainer, changeData, changeMode) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventsItemView(event);
    this._eventEditComponent = new EventsEditForm(event);

    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormCloseHandler(this._handleFormCloseClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite
        }
    ));
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToEvent();
  }

  _handleFormCloseClick() {
    this._replaceFormToEvent();
  }
}
