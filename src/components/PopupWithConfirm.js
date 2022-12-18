import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".popup__form");
  }

deleteConfirmation(confirmDelete) {
  this._confirmation = confirmDelete;
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirmation();
    });
  }
}