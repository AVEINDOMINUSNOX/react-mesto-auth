import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Создать");

  const handleEditName = (evt) => {
    setName(evt.target.value);
  };

  const handleEditLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonTitle("Сохранение...");
    props.onAddPlace({
      name: name,
      link: link,
    });
  };

  return (
    <PopupWithForm
      name="cards-form-element"
      title="Новое место"
      buttonTitle={buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={handleEditName}
      />
      <span className="input-title-error popup__input-field-error"></span>
      {/*Ссылка на картинку*/}
      <input
        id="input-link"
        name="link"
        type="url"
        className="popup__input-field"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleEditLink}
      />
      <span className="input-link-error popup__input-field-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
