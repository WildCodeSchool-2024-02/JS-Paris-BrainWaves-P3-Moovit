import { useEffect, useState } from "react";
import "./profile.css";
import SideBar from "../../components/SideBar/SideBar";
import { useUser } from "../../contexts/User/User";
import EditProfile from "../../components/EditProfile/EditProfile";

export default function Profile() {
  const api = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const [userSports, setUserSports] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <section className="profile">
      <div className="my-profile">
        <div className="title-my-profile">
          <h1>MON PROFIL</h1>
        </div>
        <div className="container-paramaters">
          <h1 className="parameters-name">PRENOM</h1>
          <p className="parameters-value">{user.name}</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MAIL</h1>
          <p className="parameters-value">{user.email}</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MON NIVEAU</h1>
          {user.level === 1 && (
            <p className="parameters-value">Je commence le sport</p>
          )}
          {user.level === 2 && (
            <p className="parameters-value">Je pratique de temps en temps</p>
          )}
          {user.level === 3 && (
            <p className="parameters-value">
              Je fais du sport très régulièrement
            </p>
          )}
          {!user.level && (
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
        <div className="container-parameters">
          <h1 className="parameters-name">MODIFIER LE MOT DE PASSE</h1>
          <p className="parameters-value">*********</p>
        </div>
        <p
          className="edit-profile"
          role="presentation"
          onClick={handleOpenEdit}
        >
          Modifier mon profil
        </p>
      </div>
      <SideBar />
      <EditProfile
        open={openEdit}
        handleClose={handleCloseEdit}
        userSports={userSports}
        user={user}
      />
    </section>
  );
}
