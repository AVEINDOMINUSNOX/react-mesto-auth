import { useState } from "react";
import error404 from "../images/error404.png";

function ImagePopup({ card, onClose }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClosePopup = () => {
    onClose();
  };

  return (
    <div
      className={`popup popup_type_img" ${card.link ? "popup_open" : ""}`}
      id="img-container"
    >
      <figure className="popup__img-container">
        <button
          type="button"
          aria-label="Кнопка закрытия развернутой картинки"
          className="popup__close-button"
          id="img-close-button"
          onClick={handleClosePopup}
        />

        {imageError ? (
          <img
            className="popup__img-fullscreen"
            type="button"
            src={error404}
            alt="error_404"
          />
        ) : (
          <img
            className="popup__img-fullscreen"
            type="button"
            src={card.link}
            alt={`Фотокарточка: ${card.name}`}
            onError={handleImageError}
          />
        )}

        <figcaption className="popup__img-title">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
