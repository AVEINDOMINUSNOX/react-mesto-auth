import logo from "../images/logo.svg";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState(false);
  const maxSize = 620;

  const Menu = (
    <menu className="header__auth-container">
      <div className="header__auth header__email">{props.userData.email}</div>
      <Link
        to="/sign-in"
        className="header__auth effect"
        onClick={handleLogOut}
      >
        Выйти
      </Link>
    </menu>
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  function handleClickOnMenu() {
    setIsClicked(!isClicked);
  }
  function handleLogOut() {
    props.onLogOut();
    setIsClicked(false);
  }

  return (
    <header>
      {isClicked && <menu className="header__mobile-menu">{Menu}</menu>}
      <div className="header">
        <img className="header__logo" alt="Логотип" src={logo} />
        <Routes>
          <Route
            exact
            path="/sign-in"
            element={
              <Link
                to="/sign-up"
                className="header__auth header__auth_mobile-menu effect"
              >
                Регистрация
              </Link>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <Link
                to="/sign-in"
                className="header__auth header__auth_mobile-menu effect"
              >
                Войти
              </Link>
            }
          />
          <Route
            exact
            path="/mesto"
            element={
              <>
                {width > maxSize ? (
                  Menu
                ) : (
                  <button
                    className={`${
                      isClicked ? "header__menu-btn_clicked" : ""
                    } header__menu-btn effect`}
                    onClick={handleClickOnMenu}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
