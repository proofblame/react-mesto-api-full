import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ConfirmPopup from './ConfirmPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import MainRoute from './MainRoute';
import auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({_id: null, avatar: ''});
  const [cards, setCards] = useState([]);
  const [valueInput, setValueInput] = useState({
    submit: 'Сохранить',
    confirm: 'Да',
  });

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  // Получение данных о пользователе и карточках после логина
  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .getUserInfo(jwt)
        .then(user => {
          setLoggedIn(true);
          history.push('/');
          setCurrentUser(user.data);
        })
        .catch(e => console.error(e.message));
      api
        .getInitialCards()
        .then(cards => {
          setCards(cards);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsChecked(true);
        });
    } else {
      setIsChecked(true);
    }
  }

  // Валидация изменения имени и названия
  function handleChangeName(event) {
    if (event.target.validity.valid) {
      setNameError('');
      setNameValid(true);
    } else {
      setNameError(event.target.validationMessage);
      setNameValid(false);
    }
  }

  // Валидация изменения описания профиля
  function handleChangeDescription(event) {
    if (event.target.validity.valid) {
      setDescriptionError('');
      setDescriptionValid(true);
    } else {
      setDescriptionError(event.target.validationMessage);
      setDescriptionValid(false);
    }
  }

  // Валидация изменения ссылок
  function handleChangeLinks(event) {
    const checkexp = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/gi.test(
      event.target.value
    );
    if (event.target.validity.valid && checkexp) {
      setDescriptionError('');
      setDescriptionValid(true);
    } else {
      setDescriptionError(event.target.validationMessage || 'Некорректная ссылка');
      setDescriptionValid(false);
    }
  }
  // Изначальная валидация формы
  useEffect(() => {
    if (!nameValid || !descriptionValid) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
    return () => {
      setFormValid(false);
    };
  }, [nameValid, descriptionValid]);

  //  Закрытие попапа по Esc и клику на оверлей
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleClickOnOverlay(event) {
      const popup = document.querySelector('.popup_opened');
      if (event.target !== popup) {
        return;
      }
      closeAllPopups();
    }

    document.addEventListener('click', handleClickOnOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleClickOnOverlay);
    };
  }, []);

  //  Поставить/снять лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .changeLikeCardStatus(card._id, !isLiked, jwt)
        .then(newCard => {
          const newCards = cards.map(c => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //  Удалить карточку
  function handleCardDelete(card) {
    setValueInput({
      ...valueInput,
      confirm: 'Удаление...',
    });
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .deleteCard(card._id, jwt)
        .then(() => {
          const newCards = cards.filter(c => c._id !== card._id);
          setCards(newCards);
        })
        .then(() => {
          closeAllPopups();
          setValueInput({
            ...valueInput,
            confirm: 'Да',
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //  Добавить карточку
  function handleAddPlaceSubmit({name, link}) {
    setValueInput({
      ...valueInput,
      submit: 'Сохранение...',
    });
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .addNewCard(name, link, jwt)
        .then(card => {
          setCards([card.data, ...cards]);
        })
        .then(() => {
          setValueInput({
            ...valueInput,
            submit: 'Сохранить',
          });
          closeAllPopups();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  //  Обновить аватар
  function handleUpdateAvatar({avatar}) {
    setValueInput({
      ...valueInput,
      submit: 'Сохранение...',
    });
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .setUserAvatar(avatar, jwt)
        .then(() => {
          setCurrentUser({
            ...currentUser,
            avatar: avatar,
          });
        })
        .then(() => {
          closeAllPopups();
          setValueInput({
            ...valueInput,
            submit: 'Сохранить',
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  //  Обновить данные пользователя
  function handleUpdateUser({name, about}) {
    setValueInput({
      ...valueInput,
      submit: 'Сохранение...',
    });
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .setUserInfo(name, about, jwt)
        .then(() => {
          setCurrentUser({
            ...currentUser,
            name: name,
            about: about,
          });
        })
        .then(() => {
          closeAllPopups();
          setValueInput({
            ...valueInput,
            submit: 'Сохранить',
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //  Присвоить значения карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //  Открыть попап редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setNameValid(true);
    setDescriptionValid(true);
  }
  //  Открыть попап добавдения новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setNameValid(false);
    setDescriptionValid(false);
  }
  //  Открыть попап редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setNameValid(false);
  }
  //  Открыть попап подтверждения удаления карточки
  function handleDeleteButtonClick(card) {
    setIsConfirmPopupOpen(true);
    setDeleteCard(card);
    setNameValid(true);
    setDescriptionValid(true);
  }
  //  Закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsConfirmPopupOpen(false);
    setDescriptionError('');
    setNameError('');
  }

  function handleRegister(email, password) {
    return auth.register(email, password);
  }

  function handleLogin(email, password) {
    return auth.login(email, password).then(res => {
      localStorage.setItem('jwt', res.token);
    });
  }

  function handleSignout() {
    setLoggedIn(false);
    setCurrentUser({_id: null, avatar: ''});
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header loggedIn={loggedIn} email={currentUser.email} onSignOut={handleSignout} />
        <MainRoute isChecked={isChecked}>
          <Switch>
            <ProtectedRoute
              loggedIn={loggedIn}
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onConfirmDelete={handleDeleteButtonClick}
              handleChangeName={handleChangeName}
            />

            <Route path="/sign-up">
              <Register onRegister={handleRegister} loggedIn={loggedIn} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} loggedIn={loggedIn} checkToken={checkToken} />
            </Route>
          </Switch>
        </MainRoute>
        <Footer />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={deleteCard}
          valueInput={valueInput.confirm}
          formValid={formValid}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          valueInput={valueInput.submit}
          nameError={nameError}
          descriptionError={descriptionError}
          handleChangeName={handleChangeName}
          handleChangeLinks={handleChangeLinks}
          formValid={formValid}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          valueInput={valueInput.submit}
          descriptionError={descriptionError}
          handleChangeLinks={handleChangeLinks}
          formValid={formValid}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          valueInput={valueInput.submit}
          nameError={nameError}
          descriptionError={descriptionError}
          handleChangeName={handleChangeName}
          handleChangeDescription={handleChangeDescription}
          formValid={formValid}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
