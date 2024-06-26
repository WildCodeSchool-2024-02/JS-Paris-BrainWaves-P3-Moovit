import PropTypes from "prop-types";
import "./templateForm.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../contexts/User/User";

function TemplateForm({ id, training, handleClose }) {
  const api = import.meta.env.VITE_API_URL;
  const sports = useOutletContext();
  const { user } = useUser();

  const [title, setTitle] = useState(training?.title);
  const [duration, setDuration] = useState(training?.duration);
  const [details, setDetails] = useState(training?.details);
  const [sport, setSport] = useState(training?.sport_id);

  // Fonction qui gère l'affichage du formulaire selon que l'utilisateur crée ou édite son activité.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      fetch(`${api}/api/templates`, {
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
      });
    } else if (id) {
      fetch(`${api}/api/templates/${id}`, {
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
      });
    }
    handleClose();
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
      />
      <select
        id="sport-select"
        name="type"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
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
      <input
        type="text"
        id="duration"
        name="duration"
        value={duration}
        placeholder="Combien de temps ?"
        onChange={(e) => setDuration(e.target.value)}
      />
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
