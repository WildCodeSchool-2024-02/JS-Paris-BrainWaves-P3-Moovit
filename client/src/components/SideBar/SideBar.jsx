/* eslint-disable import/no-duplicates */
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useContext } from "react";
import Logo from "../../assets/images/Logo.svg";
import DarkModeContext from "../../services/DarkModeContext";
import "./sidebar.css";

export default function SideBar() {

  const { mode } = useContext(DarkModeContext);

  return (
    <section id={`sidebar-${mode}`}>
      <div className="sidebar-first-container">
        <img className="sidebar-logo-moov" src={Logo} alt="logo" />
        <h1>Bienvenue Toto</h1>
        <p>Sportif du dimanche</p>
        <p>N entrainements complétés</p>
        <p>Pratique la course en sac et le ping pong</p>
      </div>
      <div className="sidebar-second-container">
        <div className="sidebar-link">
          <FaRegUserCircle className="sidebar-logo" />
          <p className="sidebar-link-text">Profil</p>
        </div>
        <div className="sidebar-link">
          <FaRegCompass className="sidebar-logo" />
          <p className="sidebar-link-text">Journal</p>
        </div>
        <div className="sidebar-link">
          <FaRegBookmark className="sidebar-logo" />
          <p className="sidebar-link-text">Modèles</p>
        </div>
        <div className="sidebar-footer-container">
          <p>
            Un site réalisé avec amour par Antoine Delalande et Anthony Dufrenot
            c 2024
          </p>
        </div>
      </div>
    </section>
  );
}
