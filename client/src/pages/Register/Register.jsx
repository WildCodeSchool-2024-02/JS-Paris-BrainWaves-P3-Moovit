import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.svg";
import './register.css'

function Register() {
  return (
    <main className="loginPage">
      <img src={Logo} alt="logo" className="landing-logo" />
      <section>
        <h1>Je crée mon compte</h1>
        <p className="loginIntro">Entre ton email et connecte toi à Moov'it !</p>
        <form className="loginForm">
          <input placeholder="Adresse mail" />
          <input placeholder="Mot de passe" />
          <input placeholder="Confirmer le mot de passe" />
          <button type="submit" className="primary-button">Je m'inscris</button>
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
