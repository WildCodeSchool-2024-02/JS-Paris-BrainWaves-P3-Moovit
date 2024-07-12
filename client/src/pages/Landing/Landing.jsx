import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GiBlackBook, GiProgression } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { IoFitnessSharp } from "react-icons/io5";
import Logo from "../../assets/images/Logo.svg";
import "./landing.css";
import DarkModeContext from "../../services/DarkModeContext";

export default function Landing() {
  const navigate = useNavigate();
  const { mode } = useContext(DarkModeContext);

  return (
    <main className="landing-page-container">
      <nav className={`landing-nav ${mode}`}>
        <img src={Logo} alt="logo" className="landing-logo" />
        <div className="little-button">
          <p role="presentation" onClick={() => navigate("/login")}>
            Se connecter
          </p>
          <button type="button" onClick={() => navigate("/register")}>
            S'inscrire
          </button>
        </div>
      </nav>
      <section className="landing-page">
        <section className="landing-container">
          <div className={`header-container-${mode}`}>
            <h1 className="header-title">
              LE COMPAGNON DE TON ACTIVITE SPORTIVE
            </h1>
            <p className="header-description">
              Inscris-toi pour suivre ta pratique sportive quel que soit ton
              niveau !
            </p>
          </div>
          <div className="landing-buttons-container">
            <button type="button" onClick={() => navigate("/register")}>
              Je m’inscris, c’est gratuit !
            </button>
            <button type="button" onClick={() => navigate("/login")}>
              Je me connecte
            </button>
          </div>
        </section>
        <div className="landing-demo">
          <div className="landing-demo-img" />
        </div>
      </section>
      <div className="target-message">
        <h1>Révolutionne ta routine sportive avec notre application !</h1>
      </div>
      <section className="img-container">
        <div className="content-container">
          <GiBlackBook className="logo-landing" />
          <div className="text-explicit">
            <h1>Accède à ton journal d'entraînements</h1>
            <p>
              Pour tracker tes entraînements et organiser toutes tes séances
            </p>
          </div>
        </div>
        <div className="content-container">
          <IoFitnessSharp className="logo-landing" />
          <div className="text-explicit">
            <h1>Enregistre tes modèles d'entraînements</h1>
            <p>
              Pour tracker tes entraînements et organiser toutes tes séances
            </p>
          </div>
        </div>
        <div className="content-container">
          <GiProgression className="logo-landing" />
          <div className="text-explicit">
            <h1>Suis ta progression</h1>
            <p>
              Pour tracker tes entraînements et organiser toutes tes séances
            </p>
          </div>
        </div>
        <div className="content-container">
          <FaLightbulb className="logo-landing" />
          <div className="text-explicit">
            <h1>Bénéficie de conseils personnalisés</h1>
            <p>
              Pour tracker tes entraînements et organiser toutes tes séances
            </p>
          </div>
        </div>
      </section>
      <section className="advantages">
        <h1>UNE BONNE ETOILE VEILLE SUR TOUS LES PROS</h1>
        <p>
          Des solutions ludiques et pratiques pour t'aider dans ta pratique du
          sport et progresser de manière rapide et efficace
        </p>
        <button type="button" onClick={() => navigate("/register")}>
          Je m’inscris, c’est gratuit !
        </button>
      </section>
      <section className="notice">
        <h1 className="notice-title">COMMENT CA MARCHE ?</h1>
        <div className="notice-items">
          <div className="notice-subscription">
            <div className="notice-card">
              <h1>Commence par te créer un compte</h1>
              <p>Pour accéder à ton journal personnalisé</p>
            </div>
          </div>
          <div className="notice-training">
            <div className="notice-card">
              <h1>Crée ensuite ton premier entraînement</h1>
              <p>
                Pour pouvoir plannifier ta séance et détailler les étapes de ton
                entraînement
              </p>
            </div>
          </div>
          <div className="notice-model">
            <div className="notice-card">
              <h1>Crée ton premier modèle d'entraînement</h1>
              <p>
                Pour paramétrer tes entraînements récurrents et te faire gagner
                du temps
              </p>
            </div>
          </div>
          <div className="notice-journal">
            <div className="notice-card">
              <h1>Consulte ton journal pour suivre ta plannification</h1>
              <p>
                Pour ne louper aucun entraînement et suivre ta plannification
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
