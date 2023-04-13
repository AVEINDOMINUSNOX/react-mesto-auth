import { useState } from 'react';
import error404 from '../images/error404.png';

function Card(card) {
     const [imageError, setImageError] = useState(false);

        const handleImageError = () => {
       setImageError(true);
     };    

    const handleClick = () => {
        console.log(card);
        card.onCardClick(card);
    }

    return (
        <article className="item" key={card.id}>
            <button
                type="button"
                aria-label="Кнопка удаления карточки"
                id="delete-button"
                className={`item__del-button ${card.isOwner ? 'item__del-button_status_active' : ''}`}
            />{
              imageError ? (
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
             ) 
 }
            <h2 className="item__name">{card.name}</h2>
            <button
                type="button"
                aria-label="Кнопка лайка"
                id="like-button"
                className={`item__like-button ${card.isLiked ? 'item__like-button_status_active' : ''}`}
                src={card.link}
            />
   
            <h3 className="item__like-counter">{card.likes.length > 0 ? card.likes.length : ""}</h3>
        </article>
    );
}

export default Card;
