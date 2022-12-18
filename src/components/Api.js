export default class Api {
  constructor({ url, headers }) {
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

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

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

  addNewProfilePick(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    })
    .then((response) => this._responseResult(response));
  }

  addNewUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then((response) => this._responseResult(response));
  }

  addLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((response) => this._responseResult(response));
  }

}