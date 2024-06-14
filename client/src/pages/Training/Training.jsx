import { useLoaderData, Link, useParams } from "react-router-dom";
import { useState } from "react";
import PopUp from "../../components/PopUp/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import "./training.css";

const api = import.meta.env.VITE_API_URL;

function Training() {
  const [training] = useLoaderData();
  const { id } = useParams();
  const [getEditForm, setGetEditForm] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const completeTraining = () =>
      fetch(`${api}/api/trainings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: 1 }),
    });

  return (
    <>
      <section className="trainingCard">
        <section className="trainingCard-title">
          <h1>{training.title}</h1>
          <CardMenu set={setGetEditForm} handleOpen={handleOpen} id={id} />
        </section>
        <section className="card-type-training">
          <p>Entraînement</p>
          <p>Fitness</p>
        </section>
        <section className="card-time-training">
          {training.time_of_day === "Matin" ? <p>Matin</p> : null}
          {training.time_of_day === "Après-midi" ? <p>Après-midi</p> : null}
          {training.time_of_day === "Soir" ? <p>Soir</p> : null}
          <p>{training.duration}</p>
        </section>
        <p>{training.details}</p>

        
          <button
            type="button"
            className="trainingCardbutton card-button-validate"
            onClick={completeTraining}
          >
            Valider mon entraînement
          </button>
        <Link to="/">Revenir au journal</Link>
      </section>
      <PopUp
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        getEditForm={getEditForm}
        id={id}
        training={training}
      />
    </>
  );
}

export default Training;
