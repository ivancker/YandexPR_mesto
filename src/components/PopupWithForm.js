import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, handleSubmitForm) {
		super(selectorPopup);
		this._handleSubmitForm = handleSubmitForm;
		this._popup = document.querySelector(selectorPopup);
		this._popupForm = this._popup.querySelector('.popup__form');
		this._inputsList = this._popupForm.querySelectorAll('.popup__input');
	}

	_getInputValues() {
		const formValues = {};

		this._inputsList.forEach(input => {
			formValues[input.name] = input.value;
		});

		console.log(formValues);

		return formValues;
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

	close() {
		super.close();
		this._popupForm.reset();
	}
}