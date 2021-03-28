import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    valueInput,
    descriptionError,
    handleChangeLinks,
    formValid
}) {
    const avatarRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="popup-update-avatar"
            title="Обновить аватар"
            value={valueInput}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            formValid={formValid}
        >
            <input
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                className={`popup__input popup__input_link ${descriptionError ? "popup__input_state_invalid" : ""}`}
                required
                autoComplete="off"
                ref={avatarRef}
                onChange={(event) => {
                    handleChangeLinks(event);
                }}
            />
            <span className="error" id="link-error">{descriptionError}</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
