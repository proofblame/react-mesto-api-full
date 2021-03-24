function PopupWithForm({
    name,
    title,
    value,
    isOpen,
    onClose,
    handleSubmit,
    children,
    formValid,
}) {
    return (
        <section
            className={`popup section__popup popup_type_${name} ${
                isOpen ? "popup_opened" : ""
            }`}
        >
            <div className="popup__container">
                <form
                    name={name}
                    className={`popup__form popup__form_type_${name}`}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__heading section__subtitle">
                        {title}
                    </h2>
                    <fieldset className="popup__fields">{children}</fieldset>
                    <input
                        name="save-button"
                        type="submit"
                        value={value}
                        className={`popup__save-button ${
                            !formValid ? "popup__save-button_invalid" : ""
                        }`}
                        disabled={!formValid}
                    />
                    <button
                        name="close-button"
                        type="button"
                        className="popup__close-button buttons"
                        onClick={onClose}
                    ></button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;
