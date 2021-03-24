import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    valueInput,
    nameError,
    descriptionError,
    handleChangeName,
    handleChangeDescription,
    formValid
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => { 
        setName(currentUser.name); 
        setDescription(currentUser.about); 
    }, [isOpen, currentUser]);

    function handleSubmit(event) {
        event.preventDefault();
            onUpdateUser({
                name,
                about: description,
            });
    }
    return (
        <PopupWithForm
            name="popup-edit-profile"
            title="Редактировать профиль"
            value={valueInput}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            formValid={formValid}
        >
            <input
                name="name"
                type="text"
                value={name || ""}
                onChange={(event) => {
                    handleChangeName(event);
                    setName(event.target.value);
                }}
                className={`popup__input popup__input_name ${
                    nameError ? "popup__input_state_invalid" : ""
                }`}
                id="user-name"
                minLength="2"
                maxLength="40"
                required
                autoComplete="off"
            />
            <span id="user-name-error" className="error">
                {nameError}
            </span>

            <input
                name="job"
                type="text"
                value={description || ""}
                onChange={(event) => {
                    handleChangeDescription(event);
                    setDescription(event.target.value);
                }}
                className={`popup__input popup__input_job ${
                    descriptionError ? "popup__input_state_invalid" : ""
                }`}
                id="about"
                minLength="2"
                maxLength="200"
                required
                autoComplete="off"
            />
            <span id="about-error" className="error">
                {descriptionError}
            </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
