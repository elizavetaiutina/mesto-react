import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, isLoading, onUpdateAvatar }) {
  const [link, setLink] = useState("");
  const linkRef = useRef();

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }

  useEffect(() => {
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="url-avatar"
        name="avatar"
        className="form__input form__input_info_url-avatar"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
        ref={linkRef}
        required
      />
      <span className="url-avatar-error form__span-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
