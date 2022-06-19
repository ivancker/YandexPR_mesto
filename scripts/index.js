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
const elementTemplate = document.getElementById("element-template").content;
const popupPicture = document.querySelector(".popup-picture");
const popupOpenPicture = document.querySelector(".popup-picture__image");
const popupOpenTitle = document.querySelector(".popup-picture__title");
const popupPictureCloseButton = document.querySelector(".popup-picture__close-button");
const inputTitle = document.querySelector(".popup__input_value_title");
const inputLink = document.querySelector(".popup__input_value_link");

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

profileOpenBtn.addEventListener('click', function(){
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileCloseBtn.addEventListener('click', function() {
  closePopup(profilePopup);
});

openAddCardPopupButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

closeAddCardPopupButton.addEventListener('click', function(){
  closePopup(popupAddCard);
});

popupPictureCloseButton.addEventListener('click', function(){
  closePopup(popupPicture);
});

const addCard = (data) => {
  placeForCards.prepend(data);
};

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputTitle.value;
  card.link = inputLink.value;
  addCard(renderCard(card));
  evt.target.reset();
  closePopup(popupAddCard);
};

popupAddCard.addEventListener("submit", handleAddCardSubmit);

function renderPlaceForCards(data) {
  data.forEach((item) => {
    placeForCards.append(renderCard(item));
  });
};

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

      image.addEventListener("click",()=>{
        popupOpenPicture.src = link;
        popupOpenTitle.alt = name;
        popupOpenTitle.textContent = name;
        openPopup(popupPicture);
      });


    return addElement;
};

renderPlaceForCards(initialCards);