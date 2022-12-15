// import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';

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
  profileAvatar,
  popupWithConfirm,
  popupYesBtn
} from '../utils/constants.js';

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: 'e8f18267-2481-4711-ba12-1cc30ee751c6',
    "Content-type": 'application/json',
  },
}

const api = new Api(apiConfig);

//-----------------------------------------------***********-------------------------------------------
const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick, handleBasketClick, handleDelete).generateCard();
  return card
}

const cardSection = new Section({
  renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addCards(cardElement);
  },
},
   cardsPlace
);

api.getAllCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((error) => {
    console.log(`Ошибка при загрузке карточек: ${error}`);
  });

// cardSection.renderItems(initialCards);
//-----------------------------------------------***********-------------------------------------------
const cardAddPopup = new PopupWithForm(popupAddCard, (item) => {
  console.log('value=', item);
  cardAddPopup.setLoading(true);
  // const newCard = createCard(item);
  // cardSection.addItem(newCard);

  api.addNewCard(item)
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardSection.addItem(newCard);
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении карточки: ${error}`);
    })
    .finally(() => cardAddPopup.setLoading(false));

  cardAddPopup.close();
  additionFormValidator.disabledSubmitButton();
});

cardAddPopup.setEventListeners();

openAddCardPopupButton.addEventListener('click', function () {
  additionFormValidator.cleanFormErrors();
  // cardAddPopup.setLoading(false);
  cardAddPopup.open();
});
//-----------------------------------------------***********-------------------------------------------
const profileInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
  avatarSelector: profileAvatar,
});
const profileEditPopup = new PopupWithForm(profilePopup, (dataInputs) => {
  profileEditPopup.setLoading(true);
  profileInfo.setUserInfo(dataInputs);
});

profileEditPopup.setEventListeners();

profileOpenBtn.addEventListener('click', () => {
  profileEditPopup.setInputValues(profileInfo.getUserInfo());
  correctionFormValidator.disabledSubmitButton(popupSaveBtn);
  correctionFormValidator.cleanFormErrors();
  profileEditPopup.setLoading(false);
  profileEditPopup.open();
});
//-----------------------------------------------***********-------------------------------------------
const popupPictureZoom = new PopupWithImage(popupPicture);

popupPictureZoom.setEventListeners();

function handleCardClick({name, link}) {
  popupPictureZoom.open(name, link);
}
//-----------------------------------------------***********-------------------------------------------

const avatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  avatarPopup.setLoading(true);
  profileInfo.setAvatar(data);
  avatarPopup.close();
});

avatarPopup.setEventListeners();

editAvatarOpenButton.addEventListener('click', () => {
  avatarFormValidator.cleanFormErrors();
  avatarFormValidator.disabledSubmitButton(popupSaveBtn);
  avatarPopup.setLoading(false);
  avatarPopup.open();
});

//-----------------------------------------------***********-------------------------------------------

const popupConfirm = new PopupWithConfirm(popupWithConfirm);

popupConfirm.setEventListeners();

function handleBasketClick() {
  popupConfirm.open();
}

function handleDelete() {
  popupConfirm.close();
}

popupYesBtn.addEventListener('click', () => {
  popupConfirm.close();
});

const correctionFormValidator = new FormValidator(validationSettingsObject, profileForm);
const additionFormValidator = new FormValidator(validationSettingsObject, addCardForm);
const avatarFormValidator = new FormValidator(validationSettingsObject, avatarForm);

correctionFormValidator.enableValidation();
additionFormValidator.enableValidation();
avatarFormValidator.enableValidation();

