import {createElement} from "../utils/common";

export default class AbstractEvent {
  constructor() {
    if (new.target === AbstractEvent) {
      throw new Error(`Can't instantiate AbstractEvent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
