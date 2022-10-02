import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardsPlace,
  initialCards,
  profileForm,
  popupAddCard,
  profileOpenBtn,
  profilePopup,
  openAddCardPopupButton,
  popupPicture,
  addCardForm,
  profileName,
  profileDescription,
  validationSettingsObject,
  popupSaveBtn
} from '../utils/constants.js';

// const profileOpenBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = document.querySelector('.popup__close-button');
// const openAddCardPopupButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = document.querySelector('.popup-add-card__close-button');
// const popupAddCard = document.querySelector('.popup-add-card');
const popups = document.querySelectorAll('.popup');
// const profilePopup = document.querySelector('.profile-popup');
// const profileForm = document.querySelector('.popup__form-profile');
// const addCardForm = document.querySelector('.popup-add-card__form');
// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');
// const inputName = document.querySelector('.popup__input_value_name');
// const inputDescription = document.querySelector('.popup__input_value_description');
// const cardsPlace = document.querySelector('.elements');
// const popupPicture = document.querySelector(".popup-picture");
const popupOpenPicture = document.querySelector(".popup-picture__image");
const popupOpenTitle = document.querySelector(".popup-picture__title");
const popupPictureCloseButton = document.querySelector(".popup-picture__close-button");
// const inputTitle = document.querySelector(".popup__input_value_title");
// const inputLink = document.querySelector(".popup__input_value_link");


const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick).generateCard();
  return card
}

const defaultCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardsList.addItem(cardElement)
  },
},
   cardsPlace
);

defaultCardsList.renderItems();

const popupPictureZoom = new PopupWithImage(popupPicture);
popupPictureZoom.setEventListeners();

function handleCardClick({name, link}) {
  popupPictureZoom.open(name, link);
}

const cardAddPopup = new PopupWithForm(popupAddCard, (item) => { 
  const newCard = createCard(item);
  defaultCardsList.addItem(newCard);
  cardAddPopup.closePopup();
  additionFormValidator.disableSubmitButton();
});

openAddCardPopupButton.addEventListener('click', function () {
  //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
  correctionFormValidator.disableSubmitButton(popupSaveBtn);
  cardAddPopup.open();
  additionFormValidator.cleanFormErrors();

});

const user = new UserInfo({ nameSelector: profileName, descriptionSelector: profileDescription });
const editProfilePopup = new PopupWithForm(profilePopup, (dataInputs) => {
    user.setUserInfo(dataInputs);
});

editProfilePopup.setEventListeners();

profileOpenBtn.addEventListener('click', () => {
  editProfilePopup.setInputValues(user.getUserInfo());
  correctionFormValidator.cleanFormErrors();
  editProfilePopup.open();
});





const correctionFormValidator = new FormValidator(validationSettingsObject, profileForm);
const additionFormValidator = new FormValidator(validationSettingsObject, addCardForm);

correctionFormValidator.enableValidation();
additionFormValidator.enableValidation();

// function openPopup(popups) {
//    popups.classList.add('popup_opened');
//    document.addEventListener("keydown", closePopupByEscKey);
//  };

// function closePopup(popups) {
//   popups.classList.remove('popup_opened');
//   document.removeEventListener("keydown", closePopupByEscKey);
//  };

//  function closePopupByClickOnOverlay(evt) {
//    if (evt.target === evt.currentTarget) {
//      closePopup(evt.target);
//    }
//  };

// popups.forEach((popups) => {
//   popups.addEventListener("mousedown", closePopupByClickOnOverlay);
// });

// function closePopupByEscKey(evt) {
//    if (evt.key === "Escape") {
//      const popupOpened = document.querySelector(".popup_opened");
//      closePopup(popupOpened);
//    }
//  };

// profileOpenBtn.addEventListener('click', function() {
//    openPopup(profilePopup);
//    inputName.value = profileName.textContent;
//    inputDescription.value = profileDescription.textContent;
//  });

// function handleProfileFormSubmit(evt) {
//    evt.preventDefault();
//    profileName.textContent = inputName.value;
//    profileDescription.textContent = inputDescription.value;
//    closePopup(profilePopup);
//    correctionFormValidator.disabledButton()
//  };

// profileForm.addEventListener('submit', handleProfileFormSubmit);

// profileCloseBtn.addEventListener('click', function() {
//    closePopup(profilePopup);
//  });

// openAddCardPopupButton.addEventListener('click', function() {
//    additionFormValidator.disabledButton();
//    openPopup(popupAddCard);
//  });

// closeAddCardPopupButton.addEventListener('click', function(){
//    closePopup(popupAddCard);
//  });

// popupPictureCloseButton.addEventListener('click', function(){
//    closePopup(popupPicture);
//  });

// const handleCardClick = ({link,name}) => {
//   popupOpenPicture.src = link;
//   popupOpenTitle.alt = name;
//   popupOpenTitle.textContent = name;
//   openPopup(popupPicture);
// }



// initialCards.forEach((item) => {
//    cardsPlace.append(createCard(item))
// });

// popupAddCard.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   cardsPlace.prepend(createCard({ name: inputTitle.value, link: inputLink.value }));
//   addCardForm.reset();
//   closePopup(popupAddCard);
// });