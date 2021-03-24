function ImagePopup({ card, onClose }) {

    return (
        <section
            className={`popup section__popup popup_type_popup-gallery ${
                card ? "popup_opened" : ""
            }`}
        >
            <div className="popup__gallery">
                <img
                    src={card.link}
                    alt={card.name}
                    className="popup__image"
                />
                <p className="popup__title">{card.name}</p>
                <button
                    name="close-button"
                    type="button"
                    className="popup__close-button buttons"
                    onClick={onClose}
                ></button>
            </div>
        </section>
    );
}

export default ImagePopup;
