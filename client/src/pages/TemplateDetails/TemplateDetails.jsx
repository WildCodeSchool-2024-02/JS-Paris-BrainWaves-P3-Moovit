import { useLoaderData, Link, useParams } from "react-router-dom";
import { useState } from "react";
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import DarkMode from "../../contexts/DarkMode/DarkMode";
import "./templateDetails.css";

function TemplateDetails() {

  const [training] = useLoaderData();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <>
      <DarkMode />
      <section className="trainingCard">
        <section className="trainingCard-title">
          <h1>{training.title}</h1>
          <CardMenu handleOpen={handleOpen} id={id} />
        </section>
        <section className="card-type-training">
          <p>Entraînement</p>
          <p>{training.sport}</p>
        </section>
        <section className="card-time-training">
          <p>{training.duration}</p>
        </section>
        <p>{training.details}</p>

        <section className="trainingCard-title">
          <Link to="/templates">Revenir aux modèles</Link>
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
    </>
  );
}

export default TemplateDetails;
