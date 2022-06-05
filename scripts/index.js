const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const openAddCardPopupButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = document.querySelector('.popup-add-card__close-button');
const popupAddCard = document.querySelector('.popup-add-card');


const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDescription = document.querySelector('.popup__input_value_description');



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

function openAddCardPopup() {
    popupAddCard.classList.add('popup_opened');
}
function closeAddCardPopup() {
    popupAddCard.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
}

openPopupButton.addEventListener('click', openPopup);
openAddCardPopupButton.addEventListener('click', openAddCardPopup);
closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);

closePopupButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);