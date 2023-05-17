import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import api from "../utils/Api";
import auth from "./.././utils/Auth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopoup";

import ProtectedRouteElement from "./ProtectedRoute";
import AuthenticationForm from "./AuthenticationForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isSaveAvatarPopupOpen, setIsSaveAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const [token, setToken] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setSucces] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return undefined;
    } else {
      handleTokenCheck();
      api
        .getInitialCards()
        .then((data) => {
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
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      return undefined;
    } else {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  async function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (!token) navigate("/sign-up", { replace: true });
    else {
      try {
        const data = await auth.checkUserSession(token);
        setLoggedIn(true);
        setUserData({ email: data.data.email });
        navigate("/mesto", { replace: true });
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .postCard({ name, link })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
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
    api
      .selectLikeStatus(card._id, !isLiked)
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
    api
      .saveAvatar(avatar)
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

  function handleClosePopup() {
    setIsInfoTooltipOpen(false);
  }

  const closeAllPopups = () => {
    setIsSaveAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  async function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        setToken(token);
        setSucces(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setSucces(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoTooltipOpen(true);
      });
  }

  async function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUserData({ email: email });
        setLoggedIn(true);
        navigate("/mesto");
      })
      .catch((err) => {
        console.error(err);
        setSucces(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.clear("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userData={userData} onLogOut={handleLogOut} />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/mesto" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            ></Route>
            <Route
              exact
              path="/sign-up"
              element={<AuthenticationForm onRegister={handleRegister} />}
            ></Route>
            <Route
              exact
              path="/sign-in"
              element={<AuthenticationForm onLogin={handleLogin} />}
            ></Route>
            <Route
              path="/mesto"
              element={
                <ProtectedRouteElement
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleSaveAvatarClick}
                  onCardClick={handleCardClick}
                  onAddPlace={handleAddCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>
          <Footer />
          {/* Попап редактирования профиля*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onEditInfoUser={handleSaveUserInfo}
            onClose={closeAllPopups}
            isLoading={isLoading}
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

          {/* Попап успеха/ошибки регистрации*/}
          <InfoTooltip
            isSuccessfull={false}
            isOpen={isInfoTooltipOpen}
            onClose={handleClosePopup}
            isSuccess={isSuccess}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
