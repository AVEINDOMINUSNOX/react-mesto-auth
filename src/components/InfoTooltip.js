import successIcon from "./../images/sucess.svg";
import failIcon from "./../images/fail.svg";


function InfoTooltip(props) {
  const successTitle = "Вы успешно зарегистрировались!";
  const failTitle = "Что-то пошло не так! Попробуйте ещё раз.";
  

  const handleClosePopup = () => {
    props.onClosePopup();
  };

  return (
    <div className={`popup ${props.isOpen ? "popup_open" : ""}`}>

      <div className="popup__container">

        <button
           type="button"
           aria-label="Закрытие окна редактирования профиля"
           className="popup__close-button"
           id="profile-close-button"
            onClick={handleClosePopup}
        ></button>

        <div className="popup__input-container">

          <img className="popup__info-icon"
            src={props.isSuccessfull ? successIcon : failIcon}
            alt={props.isSuccessfull ? "Вы успешно зарегестрировались!" : "Что-то пошло не так! Попробуйте заново!"}
          />

          <div className="popup__info-title">
            {props.isSuccessfull
              ? props.successTitle ?? successTitle
              : props.failedTitle ?? failTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;