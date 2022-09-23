export default class FormValidator {
  constructor(config, form) {
      this._config = config;
      this._form = form;
  }

_showInputError(inputElement) {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._config.errorClass);
};

_hideInputError (inputElement) {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = "";
};

_hasInvalidInput () {
  return this._inputsList.forEach((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_toggleInputError (inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

activeButton() {
  this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  this._buttonElement.disabled = false;
}
disabledButton() {
  this._buttonElement.classList.add(this._config.inactiveButtonClass);
  this._buttonElement.disabled = true;
}

_toggleButtonState() {
  if (this._hasInvalidInput()) {
      this.disabledButton()
  }
  else {
      this.activeButton()
  }
}
_setEventListeners() {
    this._inputsList = this._form.querySelectorAll(this._config.inputSelector);

    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState();

    this._inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._toggleInputError(inputElement);
            this._toggleButtonState();
        })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}