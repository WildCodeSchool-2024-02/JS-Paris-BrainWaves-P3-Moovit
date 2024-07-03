import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardMenu from "../CardMenu/CardMenu";
import Feedback from "../Feedback/Feedback";
import "./feedbackCard.css";

export default function FeedbackCard({
  feedback = undefined,
  setStatusFeedback,
  setIdFeedback,
  setTrainingFeedback,
  handleOpenValidation,
  setBoolFeed,
  setBoolTrain,
}) {
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

  // Edit a feedback
  const handleEdit = () => {
    handleOpenFeedback();
  };

  // Open the modal validation
  const handleDelete = async () => {
    setIdFeedback(feedback.id);
    setTrainingFeedback(feedback.training_id);
    setAnchorEl(false);
    setBoolFeed(true);
    setBoolTrain(false);
    handleOpenValidation();
  };

  // Navigate to the detail page
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/feedback/${feedback.id}`);
  };

  const variants = {
    open: {
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      y: "100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.section
      className="feedback-card-container"
      variants={variants}
      animate="open"
      initial="closed"
    >
      <Feedback
        open={openFeedback}
        handleClose={handleCloseFeedback}
        feedbackId={feedback.id}
        setStatusFeedback={setStatusFeedback}
      />
      <section className="trainingCard-title">
        <h1 className="feedback-card-title">{feedback.title}</h1>
        <CardMenu
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </section>
      <section className="feedback-text">
        <p>
          Durée réelle{" "}
          <span className="feedback-card-duration">{feedback.duration}</span>
        </p>
        {feedback.global === "easy" && (
          <p>
            Déroulé de la séance <span className="emoji">🔥</span>
          </p>
        )}
        {feedback.global === "medium" && (
          <p>
            Déroulé de la séance <span className="emoji">👌</span>
          </p>
        )}
        {feedback.global === "hard" && (
          <p>
            Déroulé de la séance <span className="emoji">🥵</span>
          </p>
        )}
        {feedback.difficulty === "easy" && (
          <p>
            Pendant la séance <span className="emoji">💪</span>
          </p>
        )}
        {feedback.difficulty === "medium" && (
          <p>
            Pendant la séance <span className="emoji">😮‍💨</span>
          </p>
        )}
        {feedback.difficulty === "hard" && (
          <p>
            Pendant la séance <span className="emoji">🥵</span>
          </p>
        )}
        {feedback.after === "perfect" && (
          <p>
            Après la séance <span className="emoji">💪</span>
          </p>
        )}
        {feedback.after === "good" && (
          <p>
            Après la séance <span className="emoji">🥶</span>
          </p>
        )}
        {feedback.after === "tired" && (
          <p>
            Après la séance <span className="emoji">😴</span>
          </p>
        )}
      </section>
      <button
        type="button"
        className="feedback-button"
        onClick={handleNavigate}
      >
        Voir le détail de l'entraînement
      </button>
    </motion.section>
  );
}

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
      .isRequired,
    training_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    global: PropTypes.oneOf(["easy", "medium", "hard"]).isRequired,
    difficulty: PropTypes.oneOf(["easy", "medium", "hard"]).isRequired,
    after: PropTypes.oneOf(["perfect", "good", "tired"]).isRequired,
  }).isRequired,
  setStatusFeedback: PropTypes.func.isRequired,
  setIdFeedback: PropTypes.func.isRequired,
  setTrainingFeedback: PropTypes.func.isRequired,
  handleOpenValidation: PropTypes.func.isRequired,
  setBoolFeed: PropTypes.func.isRequired,
  setBoolTrain: PropTypes.func.isRequired,
};
