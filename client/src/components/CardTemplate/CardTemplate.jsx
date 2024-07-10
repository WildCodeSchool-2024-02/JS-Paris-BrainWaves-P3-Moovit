
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import DarkModeContext from "../../services/DarkModeContext";
import "./cardTemplate.css";
import CardMenu from "../CardMenu/CardMenu";

export default function CardTemplate({
  card,
  handleOpen,
  setCurrentTemplate,
  handleOpenValidation,
}) {
  const { mode } = useContext(DarkModeContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleEdit = () => {
    setCurrentTemplate(card.id);
    handleOpen();
  };

  const handleDelete = async () => {
    setCurrentTemplate(card.id)
    setAnchorEl(false);
    handleOpenValidation();
  }

  return (
    <section id={`card-template-${mode}`}>
      <section className="trainingCard-title">
        <h2 className="card-title">{card.title}</h2>
        <CardMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
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
  handleOpenValidation: PropTypes.func.isRequired,
};
