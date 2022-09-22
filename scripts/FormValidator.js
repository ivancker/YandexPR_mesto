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
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_checkInputValidity (inputElement) {
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
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}





















// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__form_input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__form_input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__form_input_type_error');
//   errorElement.classList.remove('popup__form_input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.form__submit');
//    toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
//    fieldsetList.forEach((fieldset) => {
//    setEventListeners(fieldset);
//     });
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// }); 
// }

// function toggleButtonState (inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//   buttonElement.classList.add('popup__save-button_inactive');
// } else {
//   buttonElement.classList.remove('button_inactive');
// } 
// }

// enableValidation();
