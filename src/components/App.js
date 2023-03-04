import { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [arrayCards, setArrayCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, array]) => {
        setCurrentUser(user);
        setArrayCards(array);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((selectedCard) => {
        setArrayCards((state) => state.map((c) => (c._id === card._id ? selectedCard : c)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }

  function handleCardDelete(card) {
    console.log("удалить карту", card);
    api
      .deleteCard(card._id)
      .then(() => {
        setArrayCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
        console.log("удалили !");
        console.log(arrayCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState("");

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={arrayCards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
            type="text"
            id="name-input"
            name="name"
            className="form__input form__input_info_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="name-input-error form__span-error"></span>
          <input
            type="text"
            id="profession-input"
            name="about"
            className="form__input form__input_info_profession"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="profession-input-error form__span-error"></span>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
        >
          <input
            type="text"
            id="nameplace-input"
            name="name"
            className="form__input form__input_info_name-place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="nameplace-input-error form__span-error"></span>
          <input
            type="url"
            id="url-input"
            name="link"
            className="form__input form__input_info_url-place"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="url-input-error form__span-error"></span>
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
            type="url"
            id="url-avatar"
            name="avatar"
            className="form__input form__input_info_url-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="url-avatar-error form__span-error"></span>
        </PopupWithForm>
        <PopupWithForm title="Вы уверены?" name="delete-card" buttonText="Да" />
        <ImagePopup card={selectedCard} isOpen={isCardPopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
