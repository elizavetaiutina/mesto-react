import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        className="form__input form__input_info_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="profession-input-error form__span-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
