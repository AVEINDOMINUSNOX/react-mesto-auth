function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_open" : ""}`}
      id={`popup-${props.name}`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрытие окна редактирования профиля"
          className="popup__close-button"
          id="profile-close-button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`${props.name}-form`}
          className="popup__input-container"
          method="POST"
          noValidate=""
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            aria-label="Кнопка сохранить"
            id="profile-save-button"
            className="popup__save-button"
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
