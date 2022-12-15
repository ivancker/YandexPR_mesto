export default class Api {
  constructor( {url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  _responseResult(response) {
    if (response.ok)  {
      return response.json();
    } else {
      Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

  deleteCard() {}

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then((response) => this._responseResult(response));
  }
}