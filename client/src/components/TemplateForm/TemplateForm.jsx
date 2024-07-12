/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { toast } from "sonner";
import "./templateForm.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../contexts/User/User";

function TemplateForm({ id, training, handleClose }) {
  const api = import.meta.env.VITE_API_URL;
  const { sports } = useOutletContext();
  const { user } = useUser();

  const [title, setTitle] = useState(training?.title);
  const [duration, setDuration] = useState(training?.duration);
  const [details, setDetails] = useState(training?.details);
  const [sport, setSport] = useState(training?.sport_id);

  // state for managing errors in form
  const [error, setError] = useState({});

  // managing form shown to user (case 1 : creation / case 2: edition)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    // case 1 : creation of a new template
    if (!id) {
      await fetch(`${api}/api/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          duration,
          details,
          sport_id: sport,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.details) {
            data.details.forEach((detail) => {
              setError((prev) => ({
                ...prev,
                [detail.context.key]: [detail.message],
              }));
            });
          } else {
            handleClose();
            toast.success("Ton modèle a bien été créé !", {
              style: {
                background: "rgba(145, 225, 166)",
                color: "black",
              },
            });
          }
        });
        // case 2 : edition of existing template
    } else if (id) {
      await fetch(`${api}/api/templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          duration,
          details,
          sport_id: sport,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.details)) {
            data.details.forEach((detail) => {
              setError((prev) => ({
                ...prev,
                [detail.context.key]: [detail.message],
              }));
            });
          } else {
            handleClose();
            toast.success("Tes modifications sont bien prises en compte !", {
              style: {
                background: "rgba(145, 225, 166)",
                color: "black",
              },
            });
          }
        });
    }
  };

  return (
    <form className="trainingForm" onSubmit={handleSubmit}>
      <h1>Créer une nouvelle activité</h1>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre de ton modèle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={error.title ? "input-error" : ""}
      />
      {error.title ? (
        <p className="error-message">
          Merci de donner un titre à ton entraînement
        </p>
      ) : null}
      <select
        id="sport-select"
        name="type"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        className={error.sport_id ? "input-error" : ""}
      >
        <option>Quel sport ? ⛹️</option>
        {sports
          ? sports.map((activity) => (
              <option
                key={`${activity.name}-${activity.id}`}
                value={activity.id}
              >
                {activity.name}
              </option>
            ))
          : null}
      </select>
      {error.sport_id ? (
        <p className="error-message">Merci de choisir un sport</p>
      ) : null}
      <input
        type="text"
        id="duration"
        name="duration"
        value={duration}
        placeholder="Combien de temps ?"
        onChange={(e) => setDuration(e.target.value)}
        className={error.duration ? "input-error" : ""}
      />
      {error.duration ? (
        <p className="error-message">
          Merci de renseigner une durée pour ton entraînement
        </p>
      ) : null}
      <textarea
        type="text"
        id="details"
        name="details"
        value={details}
        placeholder="Enregistre les détails de ton activité ici 👌"
        onChange={(e) => setDetails(e.target.value)}
      />
      <button type="submit" className="primary-button">
        Enregistrer
      </button>
      <button type="button" className="secondary-button" onClick={handleClose}>
        Annuler
      </button>
    </form>
  );
}

export default TemplateForm;

TemplateForm.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired, // ID de l'activité en cours d'édition
  training: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      sport: PropTypes.number,
    }),
    PropTypes.oneOf([undefined]),
  ]),
}.isRequired;
