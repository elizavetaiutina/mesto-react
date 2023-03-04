import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameplace-input"
        name="name"
        className="form__input form__input_info_name-place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className="nameplace-input-error form__span-error"></span>
      <input
        type="url"
        id="url-input"
        name="link"
        className="form__input form__input_info_url-place"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span className="url-input-error form__span-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
