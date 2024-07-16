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
          <div className="scroll-logo-container" role="presentation">
            <div className="phone-logo">
              <svg
                className="svg-logo"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="60"
                height="100"
              >
                <path d="M15,0h-6c-2.757,0-5,2.243-5,5v14c0,2.757,2.243,5,5,5h6c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-2,21h-2c-.552,0-1-.448-1-1s.448-1,1-1h2c.552,0,1,.448,1,1s-.448,1-1,1Z" />
              </svg>
              <svg
                className="svg-arrow"
                xmlns="http://www.w3.org/2000/svg"
                id="Bold"
                viewBox="0 0 24 24"
                width="15"
                height="30"
              >
                <path d="M18.427,16.935a1.5,1.5,0,0,0-2.121,0l-2.781,2.779L13.5,1.5A1.5,1.5,0,0,0,12,0h0a1.5,1.5,0,0,0-1.5,1.5l.023,18.2L7.76,16.935a1.5,1.5,0,0,0-2.121,2.121l3.919,3.919a3.5,3.5,0,0,0,4.949,0l3.92-3.919A1.5,1.5,0,0,0,18.427,16.935Z" />
              </svg>
            </div>
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
          <svg
            width="300"
            height="1000"
            viewBox="0 0 300 1000"
            fill="none"
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M131.664 31.7049C130.633 32.7353 129.062 32.6555 128.095 31.7971C126.734 30.5889 125.533 30.438 124.294 30.7915C122.872 31.1973 121.256 32.3239 119.457 34.0668C118.474 35.019 116.884 35.0394 115.886 34.0416C114.888 33.0435 114.91 31.4539 115.86 30.4715C117.581 28.692 118.694 27.079 119.097 25.6542C119.451 24.4009 119.297 23.1866 118.117 21.8246C117.275 20.8538 117.204 19.2942 118.23 18.2686C119.256 17.2431 120.815 17.3138 121.786 18.1557C123.148 19.3367 124.358 19.4906 125.603 19.1412C127.02 18.7434 128.627 17.6388 130.407 15.9231C131.39 14.9753 132.978 14.9555 133.975 15.9526C134.972 16.9495 134.953 18.538 134.004 19.5217C132.267 21.3212 131.147 22.9314 130.746 24.3468C130.397 25.5784 130.548 26.7742 131.757 28.1352C132.616 29.1026 132.695 30.6741 131.664 31.7049Z"
              fill="#12322A"
              stroke="#F9B023"
              strokeWidth="4"
            />
            <path
              d="M125.975 25
     C146.808 59.6667, 142.911 145, 87.311 207
     C17.811 284.5, -16.6847 328, 45.3115 439.5
     C98.9075 535.892, 120.142 606.667, 125.976 622.5"
              stroke="#12322A"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
            <path
              d="M95.6872 40C96.3372 40 96.6872 39.65 96.6872 39V6C96.6872 5.35 96.3372 5 95.6872 5H88.5372C87.9372 5 87.4872 5.35 87.4872 5.95C87.4872 7.75 86.6872 8.5 84.9372 8.5H83.5872C82.9372 8.5 82.5872 8.9 82.5872 9.5V15.3C82.5872 15.95 82.9372 16.3 83.5872 16.3H86.9872C87.2872 16.3 87.4872 16.5 87.4872 16.8V39C87.4872 39.65 87.8372 40 88.4872 40H95.6872Z"
              fill="#12322A"
            />
            <path
              d="M86.8884 648.6C93.1384 648.6 97.2884 644.85 97.2884 638.5V636.35C97.2884 632.85 96.2884 630.65 93.9884 629.55C93.5884 629.35 93.5884 628.95 93.9884 628.75C96.0384 627.65 97.2884 625.6 97.2884 622.8V621.4C97.2884 616.25 94.0884 612.4 86.8884 612.4C80.6384 612.4 76.4884 616.15 76.4884 622.55V623.2C76.4884 623.85 76.8384 624.2 77.4884 624.2H84.6884C85.3384 624.2 85.6884 623.85 85.6884 623.2V622.3C85.6884 621.4 86.1884 620.9 86.8884 620.9C87.5884 620.9 88.0884 621.4 88.0884 622.3V624.6C88.0884 625.55 87.5884 626.1 86.5884 626.1H84.3384C83.6884 626.1 83.3384 626.45 83.3384 627.1V631.9C83.3384 632.55 83.6884 632.9 84.3384 632.9H86.5884C87.5884 632.9 88.0884 633.4 88.0884 634.4V638.7C88.0884 639.6 87.5884 640.1 86.8884 640.1C86.1884 640.1 85.6884 639.6 85.6884 638.7V636.5C85.6884 635.85 85.3384 635.5 84.6884 635.5H77.4884C76.8384 635.5 76.4884 635.85 76.4884 636.5V638.5C76.4884 644.85 80.6384 648.6 86.8884 648.6Z"
              fill="#12322A"
            />
            <path
              d="M60.3438 356C60.9938 356 61.3438 355.65 61.3438 355V348.5C61.3438 347.85 60.9938 347.5 60.3438 347.5H52.5438C52.1438 347.5 51.9938 347.15 52.1938 346.85L57.8938 338.8C60.1438 335.6 61.3438 333.2 61.3438 330.5C61.3438 324.15 57.1938 320.4 50.9438 320.4C44.6938 320.4 40.5438 324.15 40.5438 330.5V331.75C40.5438 332.4 40.8938 332.75 41.5438 332.75H48.7438C49.3938 332.75 49.7438 332.4 49.7438 331.75V330.3C49.7438 329.4 50.2438 328.9 50.9438 328.9C51.6438 328.9 52.1438 329.4 52.1438 330.3V330.65C52.1438 331.45 51.7438 332.15 51.0938 333.05L40.9938 346.55C40.6438 347.05 40.5438 347.5 40.5438 348.05V355C40.5438 355.65 40.8938 356 41.5438 356H60.3438Z"
              fill="#12322A"
            />
            <path
              d="M19.6635 345.638C18.6325 346.669 17.0619 346.589 16.095 345.731C14.7338 344.523 13.5334 344.372 12.2943 344.725C10.8723 345.131 9.25613 346.258 7.45714 348C6.47424 348.953 4.88392 348.973 3.88614 347.975C2.88802 346.977 2.90947 345.388 3.85981 344.405C5.58123 342.626 6.69376 341.013 7.09641 339.588C7.45061 338.334 7.297 337.12 6.11667 335.758C5.27531 334.787 5.20437 333.228 6.22992 332.202C7.25543 331.177 8.81529 331.247 9.78626 332.089C11.1483 333.27 12.3577 333.424 13.6028 333.075C15.0204 332.677 16.6269 331.572 18.4069 329.857C19.3902 328.909 20.9779 328.889 21.9751 329.886C22.9719 330.883 22.9531 332.472 22.0035 333.455C20.2665 335.255 19.1473 336.865 18.746 338.28C18.3969 339.512 18.548 340.708 19.7564 342.069C20.6154 343.036 20.6948 344.608 19.6635 345.638Z"
              fill="#12322A"
              stroke="#F9B023"
              strokeWidth="4"
            />
            <path
              d="M133.663 639.771C132.633 640.802 131.062 640.722 130.095 639.864C128.734 638.655 127.533 638.504 126.294 638.858C124.872 639.264 123.256 640.39 121.457 642.133C120.474 643.085 118.884 643.106 117.886 642.108C116.888 641.11 116.909 639.52 117.86 638.538C119.581 636.758 120.694 635.145 121.096 633.721C121.451 632.467 121.297 631.253 120.117 629.891C119.275 628.92 119.204 627.361 120.23 626.335C121.255 625.31 122.815 625.38 123.786 626.222C125.148 627.403 126.358 627.557 127.603 627.208C129.02 626.81 130.627 625.705 132.407 623.99C133.39 623.042 134.978 623.022 135.975 624.019C136.972 625.016 136.953 626.604 136.003 627.588C134.266 629.388 133.147 630.998 132.746 632.413C132.397 633.645 132.548 634.841 133.756 636.202C134.615 637.169 134.695 638.74 133.663 639.771Z"
              fill="#12322A"
              stroke="#F9B023"
              strokeWidth="4"
            />
          </svg>
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
          <button type="button" onClick={() => navigate("/register")}>
            Je m’inscris, c’est gratuit !
          </button>
        </div>
      </section>
      <footer className="landing-footer">
        <p className="sidebar-credit">
          Un site réalisé avec amour par{" "}
          <a href="https://github.com/Hamsolovski" target="blank">
            Antoine Delalande
          </a>{" "}
          et{" "}
          <a href="https://github.com/WildAntho" target="blank">
            Anthony Dufrenot
          </a>
        </p>
        <p>© 2024</p>
      </footer>
    </main>
  );
}
