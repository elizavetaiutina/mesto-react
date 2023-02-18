import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card" onClick={handleClick}>
      <button type="button" aria-label="Удалить Карточку" className="card__button-delete"></button>
      <img className="card__image" src={props.card.link} alt={props.card.name} />
      <div className="card__info">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like">
          <button type="button" aria-label="Поставить лайк" className="card__button-like"></button>
          <p className="card__like-amount">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
