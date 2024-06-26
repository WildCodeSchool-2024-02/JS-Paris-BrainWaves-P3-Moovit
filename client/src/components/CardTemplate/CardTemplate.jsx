import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import DarkModeContext from "../../services/DarkModeContext";

import "./cardTemplate.css";
import CardMenu from "../CardMenu/CardMenu";
import { useUser } from "../../contexts/User/User";

const api = import.meta.env.VITE_API_URL;

export default function CardTemplate({ card, handleOpen, setCurrentTemplate, setStatusTemplate }) {
  const { mode } = useContext(DarkModeContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`${api}/api/templates/${card.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setStatusTemplate(prev => !prev)
    navigate("/templates");
  };

  const handleEdit = () => {
    setCurrentTemplate(card.id);
    handleOpen();
  };

  return (
    <section id={`card-template-${mode}`}>
      <section className="trainingCard-title">
        <h1 className="card-title">{card.title}</h1>
        <CardMenu handleEdit={handleEdit} handleDelete={handleDelete} />
      </section>
      <div className="card-type-training">
        <IoMdFitness />
        <p>Entraînement | {card.name}</p>
      </div>
      <div className="card-time-training">
        {card.duration ? (
          <div className="card-plus">
            <CiClock2 />
            <p>{card.duration}</p>
          </div>
        ) : null}
      </div>
      <section className="trainingCard-title">
        <Link to={`/templates/${card.id}`}>Voir ce modèle</Link>
      </section>
    </section>
  );
}

CardTemplate.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time_of_day: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([undefined]),
    ]),
    duration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([undefined]),
    ]),
    is_completed: PropTypes.bool,
  }).isRequired,
  handleOpen: PropTypes.func.isRequired,
  setCurrentTemplate: PropTypes.func.isRequired,
  setStatusTemplate: PropTypes.func.isRequired
};
