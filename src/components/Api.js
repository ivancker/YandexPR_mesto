export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  getAllCards() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
    .then((response) =>{
      if (response.ok)  {
        return response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
    })
  }
  deleteCard() {}
  addNewCard() {}
}