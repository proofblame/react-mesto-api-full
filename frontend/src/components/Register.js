import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Register = (props) => {
    const [ data, setData ] = useState({
        email: '',
        password: '',
    })

    const [popupMessage, setPopupMessage] = useState("");
    const [isRegisterPopup, setIsRegisterPopup] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.loggedIn) history.push("/");
    }, [props.loggedIn, history]);

    function onChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function onClose() {
        setIsRegisterPopup(false);
        if (submitStatus) {
            history.push("/sign-in");
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        props
            .onRegister(data.email, data.password)
            .then(() => {
                setSubmitStatus(true);
                setPopupMessage("Вы успешно зарегистрировались!");
            })
            .catch(() => {
                setPopupMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
            .finally(() => {
                setIsRegisterPopup(true);
            });
    }

    return (
        <div className="register">
            <h2 className="register__heading">Регистрация</h2>
            <form
                onSubmit={onSubmit}
                className="register__form"
                autoComplete="off"
            >
                <input
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={onChange}
                    className="register__input"
                    placeholder="Email"
                    autoComplete="email"
                />
                <input
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={onChange}
                    className="register__input"
                    placeholder="Пароль"
                    autoComplete="new-password"
                />
                <button type="submit" className="register__submit-button">
                    Зарегистрироваться
                </button>
            </form>
            <p className="register__title">
                Уже регистрировались?
                <Link className="register__link" to="/sign-in">
                    Войти
                </Link>
            </p>
            <InfoTooltip
                isOpen={isRegisterPopup}
                onClose={onClose}
                name="register"
                status={submitStatus}
            >
                {popupMessage}
            </InfoTooltip>
        </div>
    );
};

export default Register;
