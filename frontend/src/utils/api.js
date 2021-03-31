class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  // Получить начальные карточки
  getInitialCards(jwt) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => this._addResult(res));
  }
  // Добавить новую карточку
  addNewCard(name, link, jwt) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._addResult(res));
  }

  // Обновляем статус лайков карточки
  changeLikeCardStatus(cardId, noIsLiked, jwt) {
    if (noIsLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      }).then((res) => this._addResult(res));
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      }).then((res) => this._addResult(res));
    }
  }

  // Удаление карточки
  deleteCard(cardId, jwt) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => this._addResult(res));
  }
  // Получить данные пользователя
  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then((res) => this._addResult(res))
  }
  // Редактирование данных пользователя
  setUserInfo(name, about, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._addResult(res));
  }
  // Редактирование аватара пользователя
  setUserAvatar(url, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this._addResult(res));
  }
  _addResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Получение данных с сервера
const api = new Api({
  baseUrl: 'https://api.proofblame.nomoredomains.icu',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;
