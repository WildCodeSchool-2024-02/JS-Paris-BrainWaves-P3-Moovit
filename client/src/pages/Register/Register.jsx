import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Logo from "../../assets/images/Logo.svg";

import "./register.css";

function Register() {
  const api = import.meta.env.VITE_API_URL;

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [error, setError] = useState({});
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${api}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        repeat_password: confirmPassword.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.details) {
          data.details.forEach((detail) => {
            setError((prev) => ({
              ...prev,
              [detail.context.key]: [detail.message],
            }));
          });
        } else {
          navigate("/login");
        }
      });
  };

  return (
    <main className="loginPage">
      <img src={Logo} alt="logo" className="landing-logo" />
      <section>
        <h1>Je crée mon compte</h1>
        <p className="loginIntro">
          Entre ton email et connecte toi à Moov'it !
        </p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            ref={email}
            placeholder="Adresse mail"
            className={error.email ? "input-error" : ""}
          />
          {error.email ? (
            <p className="error-message">Veuillez renseigner un email valide</p>
          ) : null}
          <section id="password-input">
            {!visiblePass ? (
              <IoEyeOutline
                className="eye-password"
                onClick={() => setVisiblePass(!visiblePass)}
              />
            ) : (
              <IoEyeOffOutline
                className="eye-password"
                onClick={() => setVisiblePass(!visiblePass)}
              />
            )}
            <input
              ref={password}
              placeholder="Mot de passe"
              type={visiblePass ? "input" : "password"}
              className={error.password ? "input-error" : ""}
            />
          </section>
          {error.password ? (
            <p className="error-message">
              Le mot de passe doit contenir 1 minuscule, 1 majuscule, 1
              caractère spécial, 1 nombre.
            </p>
          ) : null}

          <section id="password-input">
            {!visibleConfirm ? (
              <IoEyeOutline
                className="eye-password"
                onClick={() => setVisibleConfirm(!visibleConfirm)}
              />
            ) : (
              <IoEyeOffOutline
                className="eye-password"
                onClick={() => setVisibleConfirm(!visibleConfirm)}
              />
            )}
            <input
              ref={confirmPassword}
              placeholder="Confirmer le mot de passe"
              type={visibleConfirm ? "input" : "password"}
              className={error.repeat_password ? "input-error" : ""}
            />
          </section>

          {error.repeat_password ? (
            <p className="error-message">
              Veuillez confirmer votre mot de passe
            </p>
          ) : null}
          <button type="submit" className="primary-button">
            Je m'inscris
          </button>
        </form>
      </section>
      <section>
        <p>
          En cliquant sur Je m'inscris, vous certifiez avoir pris connaissance
          de notre <Link to="/">politique de confidentialité</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
