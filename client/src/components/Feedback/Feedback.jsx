/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import Modal from "@mui/material/Modal";

export default function Feedback({ open, handleClose, id, feedbackId }) {
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

  // State de gestion d'erreur
  const [fill, setFill] = useState(true);

  const handleClick = async () => {
    if (
      duration.current.value === "" ||
      global.current.value === "" ||
      difficulty.current.value === "" ||
      after.current.value === ""
    ) {
      setFill(false);
    } else {
      try {
        if (!feedbackId) {
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
          fetch(`${import.meta.env.VITE_API_URL}/api/trainings/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_completed: 1 }),
          });
          if (response.ok) {
            handleClose();
          } else {
            setFill(false);
          }
        } else if (feedbackId) {
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
          } else {
            setFill(false);
          }
        }
      } catch (error) {
        toast.alert('Erreur interne veuillez réesayer plus tard')
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
          placeholder="Ca a duré combien de temps ?"
          ref={duration}
        />
        <select
          type=""
          id="session-feeling"
          name="session-feeling"
          ref={global}
        >
          <option value="" disabled selected>
            La séance s'est bien passée ?
          </option>
          <option value="easy">🔥 Très bien passée !</option>
          <option value="medium">👌 Tranquille</option>
          <option value="hard">🥵 C'était pas évident</option>
        </select>
        <select
          type=""
          id="session-feeling"
          name="session-feeling"
          ref={difficulty}
        >
          <option value="" disabled selected>
            Quelle a été ta perception de l'effort ?
          </option>
          <option value="easy">💪 Facile</option>
          <option value="medium">😮‍💨 Fatiguant</option>
          <option value="hard">🥵 Epuisant</option>
        </select>
        <select type="" id="mood-feeling" name="mood-feeling" ref={after}>
          <option value="" disabled selected>
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
          ref={details}
        />
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
        {fill && <p>Renseigne tous les champs</p>}
      </form>
      <Toaster />
    </Modal>
  );
}

Feedback.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
    .isRequired,
  feedbackId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
