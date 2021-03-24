import React from "react";
import Card from "./Card";
import photoEdit from "../images/edit-avatar.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onConfirmDelete,
    handleChangeName
}) {
    const currentUser = React.useContext(CurrentUserContext);

    //  Запись данных карточки в шаблон
    const cardList = cards.map((card) => (
        <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConfirmDelete={onConfirmDelete}
        />
    ));

    return (
        <main className="content section section__content">
            <section className="profile section__profile">
                <div className="profile__wrap">
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="profile__avatar"
                    />

                    <img
                        src={photoEdit}
                        alt="Смена аватара"
                        className="profile__avatar-edit"
                        onClick={onEditAvatar}
                    />
                </div>

                <div className="profile__info">
                    <h1 className="profile__author section__title">
                        {currentUser.name}
                    </h1>
                    <button
                        type="button"
                        className="profile__edit-button buttons"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__author-status section__subtitle">
                        {currentUser.about}
                    </p>
                </div>
                <button
                    type="button"
                    className="profile__add-button buttons"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__list">{cardList}</ul>
            </section>
        </main>
    );
}

export default Main;
