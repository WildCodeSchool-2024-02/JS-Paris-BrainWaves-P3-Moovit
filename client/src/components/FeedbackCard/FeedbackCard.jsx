/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
import CardMenu from "../CardMenu/CardMenu";
import Feedback from "../Feedback/Feedback";
import "./feedbackCard.css";

export default function FeedbackCard({
  feedback = undefined,
  setStatusFeedback,
}) {
  const api = import.meta.env.VITE_API_URL;

  // Open feedback State
  const [openFeedback, setOpenFeedback] = useState(false);

  // Managing opening and closing Modal (feedback)
  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };
  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  // Delete a feedback
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${api}/api/feedbacks/${feedback.id}/${feedback.training_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Feedback supprimé avec succès");
      } else {
        toast.error(
          "Une erreur est survenue, le feedback n'a pas pu être supprimé"
        );
      }
      setStatusFeedback((prevStatus) => !prevStatus);
    } catch (err) {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  // Edit a feedback
  const handleEdit = () => {
    handleOpenFeedback();
  };

  return (
    <section className="feedback-card-container">
      <Feedback
        open={openFeedback}
        handleClose={handleCloseFeedback}
        feedbackId={feedback.id}
        setStatusFeedback={setStatusFeedback}
      />
      <section className="trainingCard-title">
        <h1 className="feedback-card-title">{feedback.title}</h1>
        <CardMenu handleDelete={handleDelete} handleEdit={handleEdit} />
      </section>
      <section className="feedback-text">
        <p>Durée réelle {feedback.duration}</p>
        {feedback.global === "easy" && <p>Déroulé de la séance 🔥</p>}
        {feedback.global === "medium" && <p>Déroulé de la séance 👌</p>}
        {feedback.global === "hard" && <p>Déroulé de la séance 🥵</p>}
        {feedback.difficulty === "easy" && <p>Pendant la séance 💪</p>}
        {feedback.difficulty === "medium" && <p>Pendant la séance 😮‍💨</p>}
        {feedback.difficulty === "hard" && <p>Pendant la séance 🥵</p>}
        {feedback.after === "perfect" && <p>Après la séance 💪</p>}
        {feedback.after === "good" && <p>Après la séance 🥶</p>}
        {feedback.after === "tired" && <p>Après la séance 😴</p>}
      </section>
      <button type="button" className="feedback-button">
        Voir le détail de l'entraînement
      </button>
    </section>
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
};
