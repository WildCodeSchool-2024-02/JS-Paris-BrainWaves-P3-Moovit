import PropTypes from 'prop-types'
import "./templateForm.css";
import { useState } from "react";

function TemplateForm({id, training, handleClose}) {
  const api = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState(training ? training.title : null);
  const [duration, setDuration] = useState(training ? training.duration : null);
  const [details, setDetails] = useState(training ? training.details : null);
  const [sport, setSport] = useState(training ? training.sport : null)

  // Fonction qui gère l'affichage du formulaire selon que l'utilisateur crée ou édite son activité.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) { 
    fetch(`${api}/api/templates`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, duration, details, user_id: 1, sport_id: sport})
    })
  } else if (id) {
    fetch(`${api}/api/templates/${id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, duration, details, user_id: 1, sport_id: sport})
    })
  }
  handleClose()
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
      <select id="sport-select" name="type" value={sport} onChange={(e) => setSport(e.target.value)}>
        <option>Quel sport ? ⛹️</option>
        <option value="1">Fitness</option>
        <option value="2">Running</option>
        <option value="3">Poney</option>
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
      <button type="button" className="secondary-button" onClick={handleClose}>Annuler</button>
    </form>
  );
}

export default TemplateForm;

TemplateForm.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired, // ID de l'activité en cours d'édition
  training: PropTypes.shape({
    title: PropTypes.string.isRequired, // Titre de l'activité
    duration: PropTypes.string.isRequired, // Durée de l'activité
    details: PropTypes.string.isRequired, // Détails de l'activité
    sport: PropTypes.number // ID du sport associé à l'activité
  }).isRequired
  
};