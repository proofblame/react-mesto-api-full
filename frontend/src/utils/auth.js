class Auth {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    _getResponseData(res) {
        if (res.ok) return res.json();
        return res
            .json()
            .then((res) => Promise.reject(new Error(res.message || res.error)));
    }

    register(email, password) {
        return fetch(`${this.baseURL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(this._getResponseData);
    }

    login(email, password) {
        return fetch(`${this.baseURL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(this._getResponseData);
    }

    getUserData(jwt) {
        return fetch(`${this.baseURL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${jwt}`
            }
        }).then(this._getResponseData);
    }
}

const auth = new Auth("http://api.proofblame.nomoredomains.icu");
// const auth = new Auth("http://localhost:3000");

export default auth;
