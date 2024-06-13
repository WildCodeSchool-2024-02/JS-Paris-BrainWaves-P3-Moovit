import PropTypes from "prop-types";
import { useContext } from "react";
import { IoMdFitness } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import DarkModeContext from "../../services/DarkModeContext";

import "./card.css";

export default function Card({ card }) {
  const { mode } = useContext(DarkModeContext);
  return (
    <section id={`card-${mode}`}>
      <h1 className="card-title">{card.title}</h1>
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
      {card.is_completed == null ? (
        <button type="button" className="card-button-validate">
          Valider cet entrainement
        </button>
      ) : (
        <p>Feeback enregistré</p>
      )}
      <div className="card-points">
        <BsThreeDotsVertical />
      </div>
    </section>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    time_of_day: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    is_completed: PropTypes.bool,
  }).isRequired,
};
