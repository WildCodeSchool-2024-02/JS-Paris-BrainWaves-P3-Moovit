import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaRegBookmark, FaRegCompass } from "react-icons/fa";
import { useContext } from "react";
import Logo from "../../assets/images/Logo.svg";
import DarkModeContext from "../../services/DarkModeContext";
import "./sidebar.css";

export default function SideBar() {
  const { mode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/auth/logout`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <Link to="/" className="sidebar-link-text">
            Profil
          </Link>
        </div>
        <div className="sidebar-link">
          <FaRegCompass className="sidebar-logo" />
          <Link to="/journal" className="sidebar-link-text">
            Journal
          </Link>
        </div>
        <div className="sidebar-link">
          <FaRegBookmark className="sidebar-logo" />
          <Link to="/templates" className="sidebar-link-text">
            Modèles
          </Link>
        </div>
        <button type="button" onClick={handleLogout}>
          Disconnect
        </button>
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
