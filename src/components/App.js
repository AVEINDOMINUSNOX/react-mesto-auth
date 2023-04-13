import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopoup';
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isSaveAvatarPopupOpen, setIsSaveAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleSaveAvatarClick = () => {
    setIsSaveAvatarPopupOpen(true);
  };

  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsSaveAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleSaveAvatarClick}
          onAddPlace={handleAddCardClick}
          onCardClick={handleCardClick}
        />
        <Footer />


        {/* Попап редактирования профиля*/}
        <PopupWithForm
          name="profile-form-element"
          title="Редактировать профиль"
          buttonTitle="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          {/*Имя*/}
          <input
            id="profile-name-input"
            name="name"
            type="text"
            className="popup__input"
            placeholder="Имя пользователя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="profile-name-input-error 
          popup__input-field-error 
          popup__input-field-error_type_visible"></span>

          {/*Специализация*/}
          <input
            id="profile-specialization-input"
            name="specialization"
            type="text"
            className="popup__input"
            placeholder="Специализация пользователя"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="profile-specialization-input-error
           popup__input-field-error
           popup__input-field-error_visible"></span>
        </PopupWithForm>


        {/* Попап редактирования Аватара */}
        <PopupWithForm
          name="avatar-form-container"
          title="Обновить аватар"
          buttonTitle="Да"
          isOpen={isSaveAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="avatar-link-input"
            name="link-avatar"
            type="url"
            className="popup__input-field"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="avatar-link-input-error 
            popup__input-field-error 
            popup__input-field-error_type_visible"></span>
        </PopupWithForm>

        {/* Попап добавления фотокарточки*/}
        <PopupWithForm
          name="cards-form-element"
          title="Новое место"
          buttonTitle="Создать"
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        >
          {/*Название фотокарточки*/}
          <input
            id="cards-place-input"
            name="place"
            type="text"
            className="popup__input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="ards-place-input-error 
          popup__input-field-error 
          popup__input-field-error_type_visible"></span>

          {/*Ссылка на картинку*/}
          <input
            id="cards-link-input"
            name="link"
            type="url"
            className="popup__input"
            placeholder="Ссылка на картинку"
            required
          />

          <span className="cards-link-input-error 
          popup__input-field-error 
          popup__input-field-error_type_visible"></span>
        </PopupWithForm>


        {/* Попап подтверждения удаления фотокарточки */}
        <PopupWithForm
          name="confirmation-form"
          title="Вы уверены?"
          buttonTitle="Да"
        ></PopupWithForm>



        {/* Попап развернутой картинки*/}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;




