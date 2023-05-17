import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthenticationForm({ onLogin, onRegister }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formValue.password.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formValue.email, formValue.password]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (name === "email") {
      setEmailValid(/^\S+@\S+\.\S+$/.test(value));
    }
  };

  function handleClickLogIn() {
    navigate("/sign-in", { replace: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;

    onLogin
      ? onLogin(email, password).then(() => {
          e.target.reset();
        })
      : onRegister(email, password).then(() => {
          e.target.reset();
        });
  }

  return (
    <>
      <div className="auth">
        <h3 className="auth__title"> {onLogin ? "Вход" : "Регистрация"}</h3>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__form-input-group">
            <input
              id="email"
              name="email"
              type="email"
              className="auth__input auth__span"
              placeholder="адрес почты"
              required
              value={formValue.email}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <span className="auth__error"></span>
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input auth__span"
              placeholder="Пароль аккаунта"
              required
              value={formValue.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className={`auth__button ${!buttonDisabled && "effect"}`}
            type="submit"
            disabled={buttonDisabled}
          >
            {" "}
            {onLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <span className="auth__error"></span>
        {!onLogin && (
          <button className="auth__span link" onClick={handleClickLogIn}>
            Уже зарегистрированы? Войти
          </button>
        )}
      </div>
    </>
  );
}

export default AuthenticationForm;
