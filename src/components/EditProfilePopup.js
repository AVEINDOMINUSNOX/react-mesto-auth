import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeAbout = (evt) => {
    setAbout(evt.target.value);
  };

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onEditInfoUser({
      name,
      about,
    });
  };
  return (
    <PopupWithForm
      name="profile-form-element"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        value={name || ""}
        onChange={handleChangeName}
      />
      <span
        className="profile-name-input-error 
          popup__input-field-error 
          popup__input-field-error_type_visible"
      ></span>

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
        value={about || ""}
        onChange={handleChangeAbout}
      />
      <span
        className="profile-specialization-input-error
           popup__input-field-error
           popup__input-field-error_visible"
      ></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
