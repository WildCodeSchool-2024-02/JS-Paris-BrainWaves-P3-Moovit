import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import DarkMode from "../../components/DarkMode/DarkMode";
import "./templateDetails.css";
import { useUser } from "../../contexts/User/User";

function TemplateDetails() {
  const api = import.meta.env.VITE_API_URL;
  const [training, setTraining] = useState(null);
  const { id } = useParams();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetch(`${api}/api/templates/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTraining(data));
  }, []);

  return (
    <>
      <DarkMode />
      <section className="trainingCard">
        <section className="trainingCard-title">
          <h1 className="templatedetail-title">{training?.title}</h1>
          <CardMenu handleOpen={handleOpen} id={id} />
        </section>
        <section className="card-type-training">
          <IoMdFitness className="templatedetail-logo-type" />
          <p>
            Entraînement | 
            {training?.name
              ? training.name.charAt(0).toUpperCase() + training.name.slice(1)
              : null}
          </p>
        </section>
        <section className="feedbackdetail-duration-container">
          <CiClock2 className="templatedetail-logo-type" />
          <p>{training?.duration}</p>
        </section>
        <h2 className="feedback-training-details">
            Détails de l'entraînement
          </h2>
        <p>{training?.details}</p>

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
