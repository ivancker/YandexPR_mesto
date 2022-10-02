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

      this._picture = this._element.querySelector('.element__image');
      this._likeBtn = this._element.querySelector('.element__button-like');
      
      this._setEventListeners();

      this._element.querySelector('.element__title').textContent = this._name;
      this._picture.src = this._link;
      this._picture.alt = this._name;

      return this._element;
    }

  _setEventListeners() {
      this._likeBtn.addEventListener('click', () => {
        this._handleLikeClick();
      });

      this._element.querySelector('.element__button-delete').addEventListener('click', () => {
        this._handleDeleteClick();
      });

      this._picture.addEventListener('click', () => {
        this._handleCardClick({
          name: this._name,
          link: this._link
        });
      });
    }

  _handleLikeClick() {
      this._likeBtn.classList.toggle('element__button-like_active');
    }
    
  _handleDeleteClick() {
      this._element.remove();
    }
}