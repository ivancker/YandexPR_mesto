import './index.css';

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
//-----------------------------------------------***********-------------------------------------------
const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick).generateCard();
  return card
}

const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
      const cardElement = createCard(item);
      initialCardsList.addItem(cardElement)
  },
},
   cardsPlace
);

initialCardsList.renderItems();
//-----------------------------------------------***********-------------------------------------------
const cardAddPopup = new PopupWithForm(popupAddCard, (item) => { 
  const newCard = createCard(item);
  initialCardsList.addItem(newCard);
  cardAddPopup.close();
  additionFormValidator.disabledButton();
});

cardAddPopup.setEventListeners();

openAddCardPopupButton.addEventListener('click', function () {
  additionFormValidator.cleanFormErrors();
  correctionFormValidator.disabledButton(popupSaveBtn);
  cardAddPopup.open();
});
//-----------------------------------------------***********-------------------------------------------
const profile = new UserInfo({ nameSelector: profileName, descriptionSelector: profileDescription });
const profileEditPopup = new PopupWithForm(profilePopup, (dataInputs) => {
    profile.setUserInfo(dataInputs);
});

profileEditPopup.setEventListeners();

profileOpenBtn.addEventListener('click', () => {
  profileEditPopup.setInputValues(profile.getUserInfo());
  correctionFormValidator.cleanFormErrors();
  profileEditPopup.open();
});
//-----------------------------------------------***********-------------------------------------------
const popupPictureZoom = new PopupWithImage(popupPicture);
popupPictureZoom.setEventListeners();

function handleCardClick({name, link}) {
  popupPictureZoom.open(name, link);
}
//-----------------------------------------------***********-------------------------------------------
const correctionFormValidator = new FormValidator(validationSettingsObject, profileForm);
const additionFormValidator = new FormValidator(validationSettingsObject, addCardForm);

correctionFormValidator.enableValidation();
additionFormValidator.enableValidation();