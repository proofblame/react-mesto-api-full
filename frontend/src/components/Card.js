import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onConfirmDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete-button buttons' : 'element__delete-button_hidden'}`
    )
        
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button buttons ${isLiked ? 'element__like-button_active' : ''}`
    )

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onConfirmDelete(card);
    }

    return (
        <li className="elements__item">
            <figure className="element">
                <img
                    src={card.link}
                    alt={card.name}
                    className="element__image"
                    onClick={handleClick}
                />
                <div className="element__body">
                    <p className="element__figcaption section__subtitle">
                        {card.name}
                    </p>
                    <div className="element__like-group">
                        <button
                            className={cardLikeButtonClassName}
                            type="button"
                            onClick={handleLikeClick}
                        ></button>
                        <div className="element__like-count">
                            {card.likes.length}
                        </div>
                    </div>
                </div>
                <button
                    className={cardDeleteButtonClassName}
                    type="button"
                    onClick={handleDeleteClick}
                ></button>
            </figure>
        </li>
    );
}

export default Card;
