import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login(props) {
    const [data, setData] = useState({
        currentEmail: "",
        currentPassword: ""
    });
    const [popupMessage, setPopupMessage] = useState("");
    const [isLoginPopup, setIsLoginPopup] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.loggedIn) history.push("/");
    }, [props.loggedIn, history]);

    function onChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    function onClose() {
        setIsLoginPopup(false);
        if (submitStatus) {
            props.checkToken();
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        props
            .onLogin(data.currentEmail, data.currentPassword)
            .then(() => {
                setSubmitStatus(true);
                setPopupMessage("Вы успешно вошли!");
            })
            .catch(() => {
                setPopupMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
            .finally(() => {
                setIsLoginPopup(true);
            });
    }

    return (
        <div className="register">
            <h2 className="register__heading">Вход</h2>
            <form className="register__form" onSubmit={onSubmit}>
                <input
                    type="email"
                    name="currentEmail"
                    className="register__input"
                    placeholder="Email"
                    value={data.currentEmail}
                    onChange={onChange}
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="currentPassword"
                    className="register__input"
                    placeholder="Пароль"
                    value={data.currentPassword}
                    onChange={onChange}
                    autoComplete="current-password"
                />
                <button className="register__submit-button">Войти</button>
            </form>
            <InfoTooltip
                isOpen={isLoginPopup}
                onClose={onClose}
                name="login"
                status={submitStatus}
            >
                {popupMessage}
            </InfoTooltip>
        </div>
    );
}

export default Login;
