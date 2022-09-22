import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = document.querySelector('.popup__close-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = document.querySelector('.popup-add-card__close-button');
const popupAddCard = document.querySelector('.popup-add-card');
const popup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDescription = document.querySelector('.popup__input_value_description');
const placeForCards = document.querySelector('.elements');
//const elementTemplate = document.querySelector(".element-template").content;
const popupPicture = document.querySelector(".popup-picture");
const popupOpenPicture = document.querySelector(".popup-picture__image");
const popupOpenTitle = document.querySelector(".popup-picture__title");
const popupPictureCloseButton = document.querySelector(".popup-picture__close-button");
const inputTitle = document.querySelector(".popup__input_value_title");
const inputLink = document.querySelector(".popup__input_value_link");

const settingsObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const correctionFormValidator = new FormValidator(settingsObject, profilePopup);
const additionFormValidator = new FormValidator(settingsObject, popupAddCard);


function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener("keydown", popupCloseEscButton);
 };

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", popupCloseEscButton);
 };

 function popupClickClose(evt) {
   if (evt.target === evt.currentTarget) {
     closePopup(evt.target);
   }
 };

popup.forEach((popup) => {
  popup.addEventListener("mousedown", popupClickClose);
});

function popupCloseEscButton(evt) {
   if (evt.key === "Escape") {
     const popupOpened = document.querySelector(".popup_opened");
     closePopup(popupOpened);
   }
 };

profileOpenBtn.addEventListener('click', function() {
   openPopup(profilePopup);
   inputName.value = profileName.textContent;
   inputDescription.value = profileDescription.textContent;
 });

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = inputName.value;
   profileDescription.textContent = inputDescription.value;
   closePopup(profilePopup);
   correctionFormValidator.disabledButton()
 };

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileCloseBtn.addEventListener('click', function() {
   closePopup(profilePopup);
 });

openAddCardPopupButton.addEventListener('click', function() {
   additionFormValidator.disabledButton();
   openPopup(popupAddCard);
 });

closeAddCardPopupButton.addEventListener('click', function(){
   closePopup(popupAddCard);
 });

popupPictureCloseButton.addEventListener('click', function(){
   closePopup(popupPicture);
 });

correctionFormValidator.enableValidation();
additionFormValidator.enableValidation();

const handleCardClick = ({link,name}) => {
  popupOpenPicture.src = link;
  popupOpenTitle.alt = name;
  popupOpenTitle.textContent = name;
  openPopup(popupPicture);
}

function createCard(item) {
  const card = new Card(item, '.element-template', handleCardClick).generateCard();
  return card;
}

initialCards.forEach((item) => {
  placeForCards.append(createCard(item))
  });

popupAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  placeForCards.prepend(createCard({ name: inputTitle.value, link: inputLink.value }));
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(popupAddCard);
});