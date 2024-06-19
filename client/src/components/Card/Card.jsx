import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { IoMdFitness } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import DarkModeContext from "../../services/DarkModeContext";

import "./card.css";
import CardMenu from "../CardMenu/CardMenu";

const api = import.meta.env.VITE_API_URL;

export default function Card({
  card,
  handleOpen,
  setCurrentTraining
}) {
  const { mode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const completeTraining = () =>
    fetch(`${api}/api/trainings/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: 1 }),
    });

  const handleDelete = () => {
    fetch(`${api}/api/trainings/${card.id}`, {
      method: "DELETE",
    });
    navigate("/journal");
  };

  const handleEdit = () => {
    setCurrentTraining(card.id);
    handleOpen();
  };

  return (
    <section id={`card-${mode}`}>
      <section className="trainingCard-title">
        <h1 className="card-title">{card.title}</h1>
        <CardMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </section>
      <div className="card-type-training">
        <IoMdFitness />
        <p>Entraînement | Fitness</p>
      </div>
      <div className="card-time-training">
        <div className="card-plus">
          <TbSunset2 />
          <p>{card.time_of_day}</p>
        </div>
        <div className="card-plus">
          <CiClock2 />
          <p>{card.duration}</p>
        </div>
      </div>
      <section className="trainingCard-title">
        {card.is_completed == null ? (
          <button
            type="button"
            className="card-button-validate"
            onClick={completeTraining}
          >
            Valider
          </button>
        ) : (
          <p>Feeback enregistré</p>
        )}
        <Link to={`/training/${card.id}`}>Détails</Link>
      </section>
    </section>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time_of_day: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    is_completed: PropTypes.bool,
  }).isRequired,
  handleOpen: PropTypes.func.isRequired,
  setCurrentTraining: PropTypes.func.isRequired,
};
