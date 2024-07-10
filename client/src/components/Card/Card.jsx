import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { IoMdFitness } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import DarkModeContext from "../../services/DarkModeContext";
import "./card.css";
import CardMenu from "../CardMenu/CardMenu";

import Feedback from "../Feedback/Feedback";

export default function Card({
  card,
  handleOpen,
  setCurrentTraining,
  setStatusFeedback,
  setIdTraining,
  handleOpenValidation,
  setBoolTrain,
  setBoolFeed,
}) {

  const { mode } = useContext(DarkModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  // Open feedback State
  const [openFeedback, setOpenFeedback] = useState(false);

  // Managing opening and closing Modal (feedback)
  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };
  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  // Open the modal validation
  const handleDelete = async () => {
    setIdTraining(card.id);
    setAnchorEl(false);
    setBoolTrain(true);
    setBoolFeed(false);
    handleOpenValidation();
  };

  // Edit training with the cardMenu
  const handleEdit = () => {
    setCurrentTraining(card.id);
    handleOpen();
  };

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      opacity: 0.4,
      scale: 0.7,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.section
      id={`card-${mode}`}
      variants={variants}
      animate="open"
      initial="closed"
    >
      <section className="trainingCard-title">
        <h1 className="card-title">{card.title}</h1>
        <CardMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </section>
      <div className="card-type-training">
        <IoMdFitness />
        <p>Entraînement | {card.name[0].toUpperCase() + card.name.slice(1)}</p>
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
        <Link to={`/training/${card.id}`}>Voir le détail</Link>
        <button
          type="button"
          className="card-button-validate"
          onClick={handleOpenFeedback}
        >
          Valider
        </button>
      </section>
      <Feedback
        handleClose={handleCloseFeedback}
        open={openFeedback}
        id={card.id}
        setStatusFeedback={setStatusFeedback}
      />
    </motion.section>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time_of_day: PropTypes.string,
    duration: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string,
  }).isRequired,
  handleOpen: PropTypes.func.isRequired,
  setCurrentTraining: PropTypes.func.isRequired,
  setStatusFeedback: PropTypes.func.isRequired,
  setIdTraining: PropTypes.func.isRequired,
  handleOpenValidation: PropTypes.func.isRequired,
  setBoolTrain: PropTypes.func.isRequired,
  setBoolFeed: PropTypes.func.isRequired,
};
