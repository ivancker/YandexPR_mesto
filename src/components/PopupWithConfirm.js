import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, handleSubmitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }

open(card) {
  this._card = card;
  super.open();
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }
}