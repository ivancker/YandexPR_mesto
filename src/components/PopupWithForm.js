import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, handleSubmitForm) {
		super(selectorPopup);
		this._handleSubmitForm = handleSubmitForm;
		this._popup = document.querySelector(selectorPopup);
		this._popupForm = this._popup.querySelector('.popup__form');
		this._inputsList = this._popupForm.querySelectorAll('.popup__input');
		this._saveButton = this._popupForm.querySelector('.popup__save-button');
	}

	_getInputValues() {
		this._formValues = {};

		this._inputsList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setInputValues(data) {
		this._inputsList.forEach((input) => {
			input.value = data[input.name];
		});
	}

	setEventListeners() {
		super.setEventListeners();

		this._popupForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this._handleSubmitForm(this._getInputValues());
			this.close();
		});
	}

	setLoading(loading) {
    this._saveButton.textContent = loading ? "Сохранение..." : "Сохранить";
  };

	close() {
		super.close();
		this._popupForm.reset();
	}
}