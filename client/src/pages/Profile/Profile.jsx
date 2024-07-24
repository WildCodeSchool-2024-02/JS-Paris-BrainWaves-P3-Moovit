/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "sonner";
import "./profile.css";
import SideBar from "../../components/SideBar/SideBar";
import { useUser } from "../../contexts/User/User";
import EditProfile from "../../components/EditProfile/EditProfile";

export default function Profile() {
  const api = import.meta.env.VITE_API_URL;
  const { user, setUser } = useUser();
  const [userSports, setUserSports] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

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
        setUserSports(data);
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };

  // Async function to get the total points of the user
  const getPoints = async () => {
    try {
      const response = await fetch(`${api}/api/trainings/totalpoint`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };

  // Managing opening & closing editing modal
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setError(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // useEffect for handling updating display
  useEffect(() => {
    getSports();
    getUser();
    getPoints();
  }, [update]);

  // Function to logout
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/auth/logout`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="profile">
      <div className="my-profile">
        <div className="title-my-profile">
          <h1>MON PROFIL</h1>
        </div>
        <div className="score-container">
          <h1>Score</h1>
          <button type="button" className="primary-button">
            {points}
          </button>
        </div>
        <div className="container-paramaters">
          <h1 className="parameters-name">PRENOM</h1>
          <p className="parameters-value">{newUser.name}</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MAIL</h1>
          <p className="parameters-value">{newUser.email}</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MON NIVEAU</h1>
          {newUser.level === 1 && (
            <p className="parameters-value">Je commence le sport</p>
          )}
          {newUser.level === 2 && (
            <p className="parameters-value">Je pratique de temps en temps</p>
          )}
          {newUser.level === 3 && (
            <p className="parameters-value">
              Je fais du sport très régulièrement
            </p>
          )}
          {!newUser.level && (
            <p className="parameters-value">Aucun niveau renseigné</p>
          )}
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MES SPORTS</h1>
          {userSports.length > 0 ? (
            userSports.map((sport) => (
              <p key={sport.name} className="parameters-value">
                {sport.name[0].toUpperCase() + sport.name.slice(1)}
              </p>
            ))
          ) : (
            <p className="parameters-value">Tu n'as pas de sport enregistré</p>
          )}
        </div>
        <div className="container-monitor">
          <div className="container-logout">
            <FaPenToSquare className="sidebar-logout" />
            <p
              className="edit-profile"
              role="presentation"
              onClick={handleOpenEdit}
            >
              Modifier mon profil
            </p>
          </div>
          <div className="container-logout">
            <FaPowerOff className="sidebar-logout" />
            <p
              className="edit-profile"
              role="presentation"
              onClick={handleLogout}
            >
              Se déconnecter
            </p>
          </div>
        </div>
      </div>
      <SideBar update={update} />
      <EditProfile
        open={openEdit}
        handleClose={handleCloseEdit}
        userSports={userSports}
        user={user}
        newUser={newUser}
        setUpdate={setUpdate}
        update={update}
        error={error}
        setError={setError}
      />
    </section>
  );
}
