import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import "./profile.css";
import DarkModeContext from "../../services/DarkModeContext";
import SideBar from "../../components/SideBar/SideBar";

export default function Profile() {
  const { mode } = useContext(DarkModeContext);
  const profile = useLoaderData();
  return (
    <section className={`profile ${mode}`}>
      <div className="my-profile">
        <div className="title-my-profile">
          <h1>MON PROFIL</h1>
        </div>
        <div className="container-paramaters">
          <h1 className="parameters-name">PRENOM</h1>
          <p className="parameters-value">Anthony</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MAIL</h1>
          <p className="parameters-value">{profile.email}</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MON NIVEAU</h1>
          <p className="parameters-value">Sportif de haut niveau</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MES SPORTS</h1>
          <p className="parameters-value">Fitness / Running</p>
        </div>
        <div className="container-parameters">
          <h1 className="parameters-name">MODIFIER LE MOT DE PASSE</h1>
          <p className="parameters-value">*********</p>
        </div>
      </div>
      <SideBar />
    </section>
  );
}
