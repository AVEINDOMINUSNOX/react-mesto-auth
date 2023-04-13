import api from '../utils/Api';
import Card from './Card';
import { useState, useEffect } from 'react';


function Main(props) {
    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);


    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserName(data.name);
                setUserAvatar(data.avatar);
                setUserDescription(data.about);
                const idOwner = data._id;

                api.getInitialCards()
                    .then(data => {
                        setCards(data.map((card) => ({
                            id: card._id,
                            name: card.name,
                            link: card.link,
                            likes: card.likes,
                            owner: card.owner,
                            isOwner: idOwner === card.owner._id,
                            isLiked: card.likes.some(like => like._id === idOwner)
                        })));
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);


    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__overlay"
                        onClick={props.onEditAvatar}>
                        <img className="profile__avatar"
                            alt=''
                            style={{ backgroundImage: `url(${userAvatar})` }} />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__user-name">{userName}</h1>
                        <p className="profile__user-specialization">{userDescription}</p>
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
                    {cards.map((card) => (
                        <Card
                            name={card.name}
                            link={card.link}
                            key={card.id}
                            likes={card.likes}
                            isLiked={card.isLiked}
                            isOwner={card.isOwner}
                            onCardClick={props.onCardClick}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default Main;