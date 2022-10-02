import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selectorPopup) {
		super(selectorPopup);
		this.popupOpenPicture = document.querySelector('.popup-picture__image');
		this.popupOpenTitle = document.querySelector('.popup-picture__title');
	}

	open(name, link) {
		this.popupOpenPicture.src = link;
		this.popupOpenPicture.alt = name;
		this.popupOpenTitle.textContent = name;
		super.open();
	}

}