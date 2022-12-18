export default class Card {
  constructor(data, userId, templateSelector, handlers) {
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;
      this._owner = data.owner;
      this._likes = data.likes;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handlers.handleCardClick;
      this._handleCardDelete = handlers.handleCardDelete;
      this._handleLikeToggle = handlers.handleLikeToggle;
    }

  _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

      return cardElement;
    }

  isLiked() {
    const cardLiked = this._likes.find(user => user._id === this._userId)
    return cardLiked
  }

  getLikes(newLikes) {
    this._likes = newLikes;
    this._likeNbr.textContent = this._likes.length

    if(this.isLiked()) {
      this._coverLikeIcon()
    } else {
      this._uncoverLikeIcon()
    }
  }

  _coverLikeIcon() {
    this._likeBtn.classList.add('element__button-like_active');
  }

  _uncoverLikeIcon() {
    this._likeBtn.classList.remove('element__button-like_active');
  }

  generateCard() {      
      this._element = this._getTemplate();

      this._picture = this._element.querySelector('.element__image');
      this._likeBtn = this._element.querySelector('.element__button-like');
      this._deleteBusket = this._element.querySelector('.element__button-delete');
      this._likeNbr = this._element.querySelector('.element__like-number');

      this._setEventListeners();

      this._element.querySelector('.element__title').textContent = this._name;
      this._picture.src = this._link;
      this._picture.alt = this._name;

      if(this._userId != this._owner._id) {
        this._deleteBusket.setAttribute('style', 'display: none')
      }
      
      this.getLikes(this._likes);

      return this._element;
    }

  _setEventListeners() {
      this._likeBtn.addEventListener('click', () => {
        this._handleLikeToggle(this._cardId);
      });

      this._deleteBusket.addEventListener('click', () => {
        this._handleCardDelete(this._cardId);
      });

      this._picture.addEventListener('click', () => {
        this._handleCardClick({
          name: this._name,
          link: this._link
        });
      });
    }

  deleteClick() {
    this._element.remove();
    this._element = null;
    }
}