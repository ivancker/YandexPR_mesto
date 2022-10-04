export default class Section {
  constructor({renderer}, selectorContainer){
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems(items) {
		this._items = items; // items это массив initialCards.
		this._items.forEach((item) => {
			this.renderer(item);
		});
	}

	addItem(cardData) {
		this._container.prepend(cardData);
	}
}