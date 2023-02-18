import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText }) {
  return (
    <div className={`pop-up pop-up_type_${name} ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="pop-up__exit"
          onClick={onClose}
        ></button>
        <h2 className="pop-up__title">{title}</h2>
        <form name={`form-${name}`} className={`form form_type_${name}`} noValidate>
          {children}
          <button type="submit" className="form__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
