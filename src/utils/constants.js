export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Лос-Анджелес',
    link: 'https://images.unsplash.com/photo-1618374786896-d4985e2df9a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profilePopup = '.profile-popup';
export const popupAddCard = '.popup-add-card';
export const popupPicture = '.popup-picture';
export const popupEditAvatar = '.popup-avatar';
export const popupWithConfirm = '.popup-confirm';

export const profileAvatar = '.profile__avatar';
export const editAvatarOpenButton = document.querySelector(".profile__avatar-edit");
export const avatarForm = document.querySelector('.popup-avatar__form');

export const profileOpenBtn = document.querySelector('.profile__edit-button');
export const openAddCardPopupButton = document.querySelector('.profile__add-button');

export const inputName = document.querySelector('.popup__input_value_name');
export const profileName = '.profile__name';
export const inputDescription = document.querySelector('.popup__input_value_description');
export const profileDescription = '.profile__description';
export const profileForm = document.querySelector('.popup__form-profile');

export const addCardForm = document.querySelector('.popup-add-card__form');

export const inputTitle = document.querySelector(".popup__input_value_title");
export const inputLink = document.querySelector(".popup__input_value_link");
export const popupSaveBtn = document.querySelector('.popup__save-button');

export const cardsPlace = '.elements';

export const validationSettingsObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};