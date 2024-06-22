/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import "./feedback.css";
import { toast } from "sonner";

export default function Feedback({
  open,
  handleClose,
  id,
  feedbackId,
  setStatusFeedback,
}) {
  const api = import.meta.env.VITE_API_URL;

  // Ref for the duration field
  const duration = useRef();

  // Ref for the feeling during the training
  const global = useRef();

  // Ref for the training difficulty
  const difficulty = useRef();

  // Ref for the feeling after the training
  const after = useRef();

  // Ref for the details
  const details = useRef();

  // State for get feedback data (editing)
  const [feedbackEdit, setFeedbackEdit] = useState([]);

  // State d'erreur
  const [errors, setErrors] = useState({});

  // useEffect to fetch feedback data
  useEffect(() => {
    if (feedbackId) {
      fetch(`${api}/api/feedbacks?id=${feedbackId}`)
        .then((response) => response.json())
        .then((response) => {
          setFeedbackEdit(response);
        });
    }
  }, [feedbackId, api]);

  // Function to handle a feedback (edit or add)
  const handleClick = async () => {
    // Front error handling if one field is empty
    const newErrors = {};
    if (duration.current.value === "")
      newErrors.duration = "Veuillez remplir ce champ";
    if (global.current.value === "")
      newErrors.global = "Veuillez remplir ce champ";
    if (difficulty.current.value === "")
      newErrors.difficulty = "Veuillez remplir ce champ";
    if (after.current.value === "")
      newErrors.after = "Veuillez remplir ce champ";
    if (details.current.value === "")
      newErrors.details = "Veuillez remplir ce champ";
    // Errros adding in the setter
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      if (feedbackId) {
        try {
          // Feedback PUT route
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/feedbacks/${feedbackId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                duration: duration.current.value,
                global: global.current.value,
                difficulty: difficulty.current.value,
                after: after.current.value,
                details: details.current.value,
                training_id: id,
              }),
            }
          );
          if (response.ok) {
            handleClose();
            setStatusFeedback((prevStatus) => !prevStatus);
            toast.success("Feedback modifié avec success");
          } else {
            handleClose();
            toast.error(
              "Une erreur est survenue, le feedback n'a pas pu être enregistré"
            );
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          // Feedback POST route
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/feedbacks/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                duration: duration.current.value,
                global: global.current.value,
                difficulty: difficulty.current.value,
                after: after.current.value,
                details: details.current.value,
                training_id: id,
              }),
            }
          );
          // Set is_completed to 1 in training table
          const response2 = await fetch(
            `${import.meta.env.VITE_API_URL}/api/trainings/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ is_completed: 1 }),
            }
          );
          if (response.ok && response2.ok) {
            handleClose();
            setStatusFeedback((prevStatus) => !prevStatus);
            toast.success("Feedback enregistré avec succes");
          } else {
            handleClose();
            toast.error(
              "Une erreur est survenue, le feedback n'a pas pu être enregistré"
            );
          }
        } catch (err) {
          toast.error("Une erreur est survenue, veuillez réessayer plus tard");
        }
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className="trainingForm">
        <h1>C'est l'heure du Feedback </h1>
        <input
          type="text"
          id="duration"
          name="duration"
          className={errors.duration ? "feedback-error" : "feedback-ok"}
          placeholder="Ca a duré combien de temps ?"
          defaultValue={feedbackEdit ? feedbackEdit[0]?.duration : ""}
          ref={duration}
        />
        <select
          type=""
          id="session-feeling"
          name="session-feeling"
          className={errors.global ? "feedback-error" : "feedback-ok"}
          ref={global}
          defaultValue=""
        >
          <option value="" disabled>
            La séance s'est bien passée ?
          </option>
          <option value="easy">🔥 Très bien passée !</option>
          <option value="medium">👌 Tranquille</option>
          <option value="hard">🥵 C'était pas évident</option>
        </select>
        <select
          type=""
          id="session-effort"
          name="session-effort"
          className={errors.difficulty ? "feedback-error" : "feedback-ok"}
          ref={difficulty}
          defaultValue=""
        >
          <option value="" disabled>
            Quelle a été ta perception de l'effort ?
          </option>
          <option value="easy">💪 Facile</option>
          <option value="medium">😮‍💨 Fatiguant</option>
          <option value="hard">🥵 Epuisant</option>
        </select>
        <select
          type=""
          id="mood-feeling"
          name="mood-feeling"
          className={errors.after ? "feedback-error" : "feedback-ok"}
          ref={after}
          defaultValue=""
        >
          <option value="" disabled>
            Comment te sens-tu après ?
          </option>
          <option value="perfect">💪 Super j'en veux encore</option>
          <option value="good">🥶 Je sens la fatigue arriver</option>
          <option value="tired">😴 J'ai besoin de repos</option>
        </select>
        <textarea
          type="text"
          id="details"
          name="details"
          placeholder="Dis m'en plus"
          className={errors.details ? "feedback-error" : "feedback-ok"}
          defaultValue={feedbackEdit ? feedbackEdit[0]?.details : ""}
          ref={details}
        />
        {(errors.duration ||
          errors.difficulty ||
          errors.global ||
          errors.after ||
          errors.details) && (
          <p className="error-message">
            Renseigne bien tous les champs pour traquer ta progression !
          </p>
        )}
        <button type="button" className="primary-button" onClick={handleClick}>
          Enregistrer
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={handleClose}
        >
          Annuler
        </button>
      </form>
    </Modal>
  );
}

Feedback.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])]),
  feedbackId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]),
  setStatusFeedback: PropTypes.func.isRequired,
};

Feedback.defaultProps = {
  id: undefined,
  feedbackId: undefined,
};
