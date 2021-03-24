import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    valueInput,
    nameError,
    descriptionError,
    handleChangeName,
    handleChangeDescription,
    formValid
}) {
    const [name, setName] = useState();
    const [link, setLink] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name="popup-add-card"
            title="Новое место"
            value={valueInput}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            formValid={formValid}
            nameError={nameError}
            descriptionError={descriptionError}
        >
            <input
                name="name"
                type="text"
                value={name || ""}
                placeholder="Название"
                className={`popup__input popup__input_title ${nameError ? "popup__input_state_invalid" : ""
                }`}
                minLength="2"
                maxLength="30"
                required
                id="name-card"
                autoComplete="off"
                onChange={(event) => {
                    handleChangeName(event);
                    setName(event.target.value);
                }}
            />
            <span id="name-card-error" className="error">
                {nameError}
            </span>
            <input
                name="link"
                type="url"
                value={link || ""}
                placeholder="Ссылка на картинку"
                className={`popup__input popup__input_link ${descriptionError ? "popup__input_state_invalid" : ""
                }`}
                required
                autoComplete="off"
                onChange={(event) => {
                    handleChangeDescription(event);
                    setLink(event.target.value);
                }}
            />
            <span className="error" id="link-error">
                {descriptionError}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
