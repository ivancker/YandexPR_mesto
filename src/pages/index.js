// import './index.css';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import Api from '../components/Api.js'

import {
  cardsPlace,
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
} from '../utils/constants.js'

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: 'e8f18267-2481-4711-ba12-1cc30ee751c6',
    "Content-type": 'application/json',
  }
}

const api = new Api(apiConfig)

let userId

Promise.all([api.getUserData(), api.getAllCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    cardSection.renderItems(cards);
    profileInfo.setUserInfo(userData.name, userData.about);
    profileInfo.setAvatar(userData.avatar);
  })
  .catch((error) => {
    console.log(`Ошибка при добавлении информации с сервера: ${error}`);
  })

const profileInfo = new UserInfo({
    nameSelector: profileName,
    descriptionSelector: profileDescription,
    avatarSelector: profileAvatar
  })

const popupPictureZoom = new PopupWithImage(popupPicture)

const popupConfirm = new PopupWithConfirm(popupWithConfirm)

//-----------------------------------------------***********-------------------------------------------

const createCard = (item) => {
  const card = new Card(item, userId, '.element-template', 
  {
    handleCardClick,

    handleCardDelete: (cardId) => {
      console.log(cardId);
      popupConfirm.open();
      popupConfirm.deleteConfirmation(() => {
        api.deleteCard(cardId)
        .then(() => {
          console.log(cardId);
          card.deleteClick();
        })
        .then(() => {
          popupConfirm.close();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`)
        })
      })
    },

    handleLikeToggle: (cardId) => {
      if(card.isLiked()) {
        api.deleteLike(cardId)
        .then((response) => {
          card.getLikes(response.likes)
        })
        .catch((error) => {
          console.log(`Ошибка при удалении лайка: ${error}`);
        })
      } else {
        api.addLike(cardId)
        .then((response) => {
          card.getLikes(response.likes)
        })
        .catch((error) => {
          console.log(`Ошибка при добавлении лайка: ${error}`);
        })
      }
    }
  })

  return card.generateCard()
}

const cardSection = new Section({
  renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addCards(cardElement);
  },
},
   cardsPlace
)

function handleCardClick({ name, link }) {
  popupPictureZoom.open(name, link)
}

//-----------------------------------------------***********-------------------------------------------

const cardAddPopup = new PopupWithForm(popupAddCard, (item) => {
  console.log('value=', item);
  cardAddPopup.setLoading(true);
  api.addNewCard(item)
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardSection.addItem(newCard);
    })
    .then(() => {
      cardAddPopup.close()
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении карточки: ${error}`);
    })
    .finally(() => cardAddPopup.setLoading(false))

  additionFormValidator.disabledSubmitButton()
})

openAddCardPopupButton.addEventListener('click', () => {
  additionFormValidator.cleanFormErrors();
  cardAddPopup.open()
})

//-----------------------------------------------***********-------------------------------------------

const profileEditPopup = new PopupWithForm(profilePopup, (dataInputs) => {
  console.log('value=', dataInputs);
  profileEditPopup.setLoading(true);
  api.addNewUserInfo(dataInputs)
    .then((newData) => {
      profileInfo.setUserInfo(newData.name, newData.about)
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении информации в профиль: ${error}`);
    })
    .finally(() => profileEditPopup.setLoading(false))
})

profileOpenBtn.addEventListener('click', () => {
  profileEditPopup.setInputValues(profileInfo.getUserInfo());
  correctionFormValidator.disabledSubmitButton(popupSaveBtn);
  correctionFormValidator.cleanFormErrors();
  profileEditPopup.open()
})

//-----------------------------------------------***********-------------------------------------------

const avatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  avatarPopup.setLoading(true);
  api.addNewProfilePick(data.avatar)
    .then((userData) => {
      console.log(userData.avatar);
      profileInfo.setAvatar(userData.avatar);
    })
    .then(() => {
      avatarPopup.close();
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении аватара: ${error}`);
    })
    .finally(() => avatarPopup.setLoading(false));
})

editAvatarOpenButton.addEventListener('click', () => {
  avatarFormValidator.cleanFormErrors();
  avatarFormValidator.disabledSubmitButton(popupSaveBtn);
  avatarPopup.open()
})

//-----------------------------------------------***********-------------------------------------------

const correctionFormValidator = new FormValidator(validationSettingsObject, profileForm)
const additionFormValidator = new FormValidator(validationSettingsObject, addCardForm)
const avatarFormValidator = new FormValidator(validationSettingsObject, avatarForm)

correctionFormValidator.enableValidation()
additionFormValidator.enableValidation()
avatarFormValidator.enableValidation()

cardAddPopup.setEventListeners()
profileEditPopup.setEventListeners()
popupPictureZoom.setEventListeners()
avatarPopup.setEventListeners()
popupConfirm.setEventListeners()