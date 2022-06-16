const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');

const closeAddCardPopupButton = document.querySelector('.popup-add-card__close-button');
const popupAddCard = document.querySelector('.popup-add-card');
const popupAddCardSaveButton = document.querySelector('.popup-add-card__save-button');
const popupAddCardForm = document.querySelector('.popup-add-card__form');


const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
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
};


function openAddCardPopup() {
    popupAddCard.classList.add('popup_opened');
};
function closeAddCardPopup() {
    popupAddCard.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
};

openPopupButton.addEventListener('click', openPopup);
openAddCardPopupButton.addEventListener('click', openAddCardPopup);
closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);

closePopupButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);



const placeForCards = document.querySelector('.elements');
const elementTemplate = document.getElementById("element-template").content;

const popupPicture = document.querySelector(".popup-picture");
const popupOpenPicture = document.querySelector(".popup-picture__image");
const popupOpenTitle = document.querySelector(".popup-picture__title");

const popupPictureCloseButton = document.querySelector(".popup-picture__close-button");

const inputTitle = document.querySelector(".popup__input_value_title"); //название места карточки в форме
const inputLink = document.querySelector(".popup__input_value_link"); //картинка карточки в форме


function openCardPopup() {
  popupPicture.classList.add('popup_opened');
};
function closeCardPopup() {
  popupPicture.classList.remove('popup_opened');
};
popupPictureCloseButton.addEventListener('click', closeCardPopup);


const addCard = (data) => {
  placeForCards.prepend(data);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputTitle.value;
  card.link = inputLink.value;
  addCard(renderCard(card));
  evt.target.reset();
  closeAddCardPopup(popupAddCard);
}

popupAddCard.addEventListener("submit", handleAddCardSubmit);

function renderPlaceForCards(data) {
  data.forEach((item) => {
    placeForCards.append(renderCard(item));
  });
}

const renderCard = ({link,name})=>{
  const addElement = elementTemplate.querySelector('.element').cloneNode(true);

      addElement.querySelector(".element__title").textContent = name;

      const image = addElement.querySelector(".element__image");

      image.src = link;
      image.alt = name;

      addElement.querySelector(".element__button-delete").addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
      });

      addElement.querySelector(".element__button-like").addEventListener("click", function(evt) {
        evt.target.classList.toggle("element__button-like_active");
      });

  const cardPicture = addElement.querySelector(".element__image");
      cardPicture.addEventListener("click",()=>{
        popupOpenPicture.src = link;
        popupOpenTitle.alt = name;
        popupOpenTitle.textContent = name;
        openCardPopup(popupPicture);
      });


    return addElement;
}

renderPlaceForCards(initialCards);