import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState("");

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
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
      <PopupWithForm title="Вы уверены?" name="delete-card" />
      <ImagePopup card={selectedCard} isOpen={isCardPopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
