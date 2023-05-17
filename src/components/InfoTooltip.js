import successIcon from "./../images/sucess.svg";
import failIcon from "./../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const infoImg = isSuccess ? successIcon : failIcon;
  const infoTitle = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <div className="popup__input-container">
          <img
            className="popup__info-icon"
            src={infoImg}
            alt="Сообщение об ошибке/об успехе"
          />
          <h2 className="popup__info-title">{infoTitle}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
