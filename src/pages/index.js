// import './index.css';

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
  popupSaveBtn,
  avatarForm,
  popupEditAvatar,
  editAvatarOpenButton,
  profileAvatar
} from '../utils/constants.js';
//-----------------------------------------------***********-------------------------------------------
const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick).generateCard();
  return card
}

const cardSection = new Section({
  renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
  },
},
   cardsPlace
);

cardSection.renderItems(initialCards);
//-----------------------------------------------***********-------------------------------------------
const cardAddPopup = new PopupWithForm(popupAddCard, (item) => { 
  const newCard = createCard(item);
  cardSection.addItem(newCard);
  cardAddPopup.close();
  additionFormValidator.disabledSubmitButton();
});

cardAddPopup.setEventListeners();

openAddCardPopupButton.addEventListener('click', function () {
  additionFormValidator.cleanFormErrors();
  cardAddPopup.open();
});
//-----------------------------------------------***********-------------------------------------------
const profileInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
  avatarSelector: profileAvatar,
});
const profileEditPopup = new PopupWithForm(profilePopup, (dataInputs) => {
    profileInfo.setUserInfo(dataInputs);
});

profileEditPopup.setEventListeners();

profileOpenBtn.addEventListener('click', () => {
  profileEditPopup.setInputValues(profileInfo.getUserInfo());
  correctionFormValidator.disabledSubmitButton(popupSaveBtn);
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

const avatarPopup = new PopupWithForm(popupEditAvatar, (item) => {
  avatarFormValidator.disabledSubmitButton();
  // avatarPopup.close();
});

avatarPopup.setEventListeners();

editAvatarOpenButton.addEventListener('click', () => {
  avatarFormValidator.cleanFormErrors();
  avatarPopup.open();
});

//-----------------------------------------------***********-------------------------------------------
const correctionFormValidator = new FormValidator(validationSettingsObject, profileForm);
const additionFormValidator = new FormValidator(validationSettingsObject, addCardForm);
const avatarFormValidator = new FormValidator(validationSettingsObject, avatarForm);

correctionFormValidator.enableValidation();
additionFormValidator.enableValidation();
avatarFormValidator.enableValidation();