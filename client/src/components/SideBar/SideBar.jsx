/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaRegUserCircle, FaRegBookmark, FaRegCompass } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.svg";
import DarkModeContext from "../../services/DarkModeContext";
import "./sidebar.css";
import { useUser } from "../../contexts/User/User";

export default function SideBar({ update }) {
  const { mode } = useContext(DarkModeContext);

  const { user } = useUser();

  const api = import.meta.env.VITE_API_URL;

  const [sports, setSports] = useState([]);
  const [newUser, setNewUser] = useState([]);

  // Async function to get all sports from one user
  const getSports = async () => {
    try {
      const response = await fetch(`${api}/api/sports/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSports(data);
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };

  // Async function to update user information
  const getUser = async () => {
    try {
      const response = await fetch(`${api}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        data.token = user.token;
        setNewUser(data);
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };

  useEffect(() => {
    getSports();
    getUser();
  }, [update]);

  return (
    <section id={`sidebar-${mode}`}>
      <div className="sidebar-first-container">
        <img className="sidebar-logo-moov" src={Logo} alt="logo" />
        <h1>Bienvenue {`${newUser?.name}`}</h1>
        {newUser?.level === 1 && <p>Apprenti sportif</p>}
        {newUser?.level === 2 && <p>Sportif du dimanche</p>}
        {newUser?.level === 3 && <p>Futur médaille d'or</p>}
        {sports.length > 0 && (
          <p>
            Sports pratiqués:{" "}
            {sports
              .map((sport) => sport.name[0].toUpperCase() + sport.name.slice(1))
              .join(" ")}
          </p>
        )}
      </div>
      <div className="sidebar-second-container">
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
        <div className="sidebar-link">
          <FaRegUserCircle className="sidebar-logo" />
          <Link to="/user" className="sidebar-link-text">
            Profil
          </Link>
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

SideBar.propTypes = {
  update: PropTypes.bool,
};

SideBar.defaultProps = {
  update: undefined,
};
