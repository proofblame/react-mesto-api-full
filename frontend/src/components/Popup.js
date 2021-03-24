import React from "react";

function Popup(props) {
    const [isOpen, onClose] = [props.isOpen, props.onClose];
    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose);
        };
    }, [isOpen, onClose]);

    return (
        <section
            className={`popup section__popup popup_${props.name} ${
                isOpen && "popup_opened"
            }`}
            onMouseDown={(e) =>
                e.target.classList.contains("popup") && onClose()
            }
        >
            <div className="popup__container">
                {props.children}
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

export default Popup;
