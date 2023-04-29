import api from '../utils/Api';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopoup';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isSaveAvatarPopupOpen, setIsSaveAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);


  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    window.addEventListener('keydown', closeByEsc)
    return () => {
      window.removeEventListener('keydown', closeByEsc)
    }
  }, [])


  useEffect(() => {
    const closeByOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups()
      }
    }
    window.addEventListener('mousedown', closeByOverlay)
    return () => {
      window.removeEventListener('mousedown', closeByOverlay)
    }
  }, [])

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.postCard({ name, link })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) =>
          items.filter((c) => (c._id !== card._id ? currentUser : null))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((data) => data._id === currentUser._id);
    api.selectLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((items) =>
          items.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveUserInfo = ({ name, about }) => {
    api
      .saveUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAvatar = ({ avatar }) => {
    api.saveAvatar(avatar)
      .then(() => {
        currentUser.avatar = avatar;
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleSaveAvatarClick}
            onCardClick={handleCardClick}
            onAddPlace={handleAddCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Footer />

          {/* Попап редактирования профиля*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onEditInfoUser={handleSaveUserInfo}
            onClose={closeAllPopups}
          ></EditProfilePopup>

          {/* Попап редактирования Аватара */}
          <EditAvatarPopup
            isOpen={isSaveAvatarPopupOpen}
            onClose={closeAllPopups}
            onSaveAvatar={handleSaveAvatar}
          ></EditAvatarPopup>

          {/* Попап добавления фотокарточки*/}
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          ></AddPlacePopup>


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
    </CurrentUserContext.Provider>
  );
}

export default App;




