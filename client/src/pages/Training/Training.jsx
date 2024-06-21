import { useLoaderData, Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import DarkMode from "../../components/DarkMode/DarkMode";
import DarkModeContext from "../../services/DarkModeContext";
import SideBar from "../../components/SideBar/SideBar";
import "./training.css";

function Training() {
  const { mode } = useContext(DarkModeContext);

  const [training] = useLoaderData();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <DarkMode />
      <section className="templates">
        <section className="trainingCard" id={`card-${mode}`}>
          <section className="trainingCard-title">
            <h1>{training.title}</h1>
            <CardMenu handleOpen={handleOpen} id={id} />
          </section>
          <section className="card-type-training">
            <p>Entraînement</p>
            <p>{training.sport}</p>
          </section>
          <section className="card-time-training">
            {training.time_of_day === "Matin" ? <p>Matin</p> : null}
            {training.time_of_day === "Après-midi" ? <p>Après-midi</p> : null}
            {training.time_of_day === "Soir" ? <p>Soir</p> : null}
            <p>{training.duration}</p>
          </section>
          <p>{training.details}</p>

          <section className="trainingCard-title">
            {training.is_completed === 0 ? (
              <button type="button" className="card-button-validate">
                Valider
              </button>
            ) : (
              <p>Feeback enregistré</p>
            )}
            <Link to="/journal">Revenir au journal</Link>
          </section>
        </section>
      </section>
      <PopUp
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        id={id}
        training={training}
      />
      <SideBar />
    </>
  );
}

export default Training;
