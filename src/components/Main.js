import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleClosePopup() {
    navigate("/mesto", { replace: true, state: { isOpenInfoPopup: false } });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            alt=""
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <p className="profile__user-specialization">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактирование профиля"
            onClick={props.onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавление контента"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            name={card.name}
            link={card.link}
            key={card._id}
            likes={card.likes}
            owner={card.owner}
            _id={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
      <InfoTooltip
        isSuccessfull={true}
        isOpen={location.state?.isOpenInfoPopup || false}
        onClosePopup={handleClosePopup}
        successTitle={location.state?.title || ""}
      ></InfoTooltip>
    </main>
  );
}

export default Main;
