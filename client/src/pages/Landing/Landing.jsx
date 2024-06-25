import {useNavigate} from 'react-router-dom'
import Logo from "../../assets/images/Logo.svg";
import "./landing.css";



export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-container">
        <div className="header-container">
          <img src={Logo} alt="logo" className="landing-logo" />
          <h1 className="header-title">
            LE COMPAGNON DE TON ACTIVITE SPORTIVE
          </h1>
          <p className="header-description">
            Inscris-toi pour suivre ta pratique sportive quel que soit ton
            niveau !
          </p>
        </div>
        <div className="landing-buttons-container">
          <button type="button" onClick={() => navigate('/register')}>Je m’inscris, c’est gratuit !</button>
          <button type="button" onClick={() => navigate('/journal')}>Je me connecte</button>
        </div>
      </section>
      <div className="landing-demo">
        <div className="landing-demo-img" />
      </div>
    </main>
  );
}
