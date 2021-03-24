class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }
    // Получить начальные карточки
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }
    // Добавить новую карточку
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then((res) => this._addResult(res));
    }

    // Обновляем статус лайков карточки
    changeLikeCardStatus(cardId, noIsLiked) {
        if (noIsLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "PUT",
                headers: this._headers,
            }).then((res) => this._addResult(res));
        } else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            }).then((res) => this._addResult(res));
        }
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }
    // Получить данные пользователя
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._addResult(res));
    }
    // Редактирование данных пользователя
    setUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => this._addResult(res));
    }
    // Редактирование аватара пользователя
    setUserAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
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
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
    headers: {
        authorization: "45380a0b-d1c3-4f21-8b0c-7fe08b9cb145",
        "Content-Type": "application/json",
    },
});

export default api;
