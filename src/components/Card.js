import { useState, useContext } from "react";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import error404 from "../images/error404.png";

function Card(card) {
  const [imageError, setImageError] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButton = `item__like-button ${
    isLiked && "item__like-button_status_active"
  }`;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    card.onCardClick(card);
  };

  const handleDeleteClick = () => {
    card.onCardDelete(card);
  };

  const handleClickLikeCard = () => {
    card.onCardLike(card);
  };

  return (
    <article className="item" key={card._id}>
      {isOwn && (
        <button
          type="button"
          aria-label="Кнопка удаления карточки"
          id="delete-button"
          className="item__del-button item__del-button_status_active"
          onClick={handleDeleteClick}
        />
      )}
      {imageError ? (
        <img
          className="item__image"
          src={error404}
          alt="image not found"
          onClick={handleClick}
        />
      ) : (
        <img
          className="item__image"
          src={card.link}
          alt={`Фото пользователя: ${card.name}`}
          onClick={handleClick}
          onError={handleImageError}
        />
      )}
      <h2 className="item__name">{card.name}</h2>
      <button
        type="button"
        aria-label="Кнопка лайка"
        id="like-button"
        className={cardLikeButton}
        onClick={handleClickLikeCard}
      />

      <h3 className="item__like-counter">
        {card.likes.length > 0 ? card.likes.length : ""}
      </h3>
    </article>
  );
}

export default Card;
