export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
      }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__title').textContent = this._name;
        this._picture = this._element.querySelector('.element__image');
        this._picture.src = this._link;
        this._picture.alt = this._name;
    
        return this._element;
      }
// ************************** Like ********************************************
    _setEventListeners() { // слушатель клика по сообщению (вызывает _handleClick() которая при помощи toggle подставляет или удаляет class - message__text_is-active)
        this._element.querySelector('.element__button-like').addEventListener('click', () => {
          this._handleLikeClick();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
          this._handleDeleteClick();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
          this._handleCardClick({
            name: this._name,
            link: this._link
          });
        });
      }
    
    _handleLikeClick() {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
      }
    _handleDeleteClick() {
        this._element.remove();
      }
// ********************************************** Open picture ******************************************************
    // _handleOpenPopup() {
    //   popupPicture.src = this._image;
    //   popupElement.classList.add('popup_is-opened');
    // }

    // _handleClosePopup() {
    //   popupImage.src = '';
    //   popupElement.classList.remove('popup_is-opened');
    // }

    // _setEventListeners() {
    //   this._element.addEventListener('click', () => {
    //     this._handleOpenPopup();
    //   });

    //   popupCloseButton.addEventListener('click', () => {
    //     this._handleClosePopup();
    //   });
    // }

}