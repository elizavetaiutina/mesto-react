import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });

    api
      .getInitialCards()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img alt="avatar" className="profile__avatar" src={userAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              aria-label="Изменить данные профиля"
              className="profile__button-edit"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__card-list">
          {cards.map((item) => {
            return <Card key={item._id} card={item} onCardClick={onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
