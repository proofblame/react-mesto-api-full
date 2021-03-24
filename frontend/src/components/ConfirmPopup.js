import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onCardDelete, card, valueInput, formValid}) {
    function handleSubmit(event) {
        event.preventDefault();
        onCardDelete(card);

    }

    return (
        <PopupWithForm
            name="popup-confirm"
            title="Вы уверены?"
            value={valueInput}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            formValid={formValid}
        ></PopupWithForm>
    );
}

export default ConfirmPopup;
