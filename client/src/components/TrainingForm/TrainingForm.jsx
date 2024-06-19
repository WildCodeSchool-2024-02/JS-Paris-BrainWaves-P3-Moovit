import PropTypes from "prop-types";
import "./trainingForm.css";
import { useEffect, useState } from "react";

function TrainingForm({ id, training, handleClose }) {
  const api = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState(training ? training.title : null);
  const [date, setDate] = useState(training ? training.date : null);
  const [timeOfDay, setTimeOfDay] = useState(
    training ? training.timeOfDay : null
  );
  const [duration, setDuration] = useState(training ? training.duration : null);
  const [details, setDetails] = useState(training ? training.details : null);
  const [sport, setSport] = useState(training ? training.sport : null);
  const [template, setTemplate] = useState(null);
  const [templates, setTemplates] = useState([])

  // Fonction qui gère l'affichage du formulaire selon que l'utilisateur crée ou édite son activité.
  const getTemplates = async () => {
    await fetch(`${api}/api/templates/2/all`)
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {getTemplates()}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      fetch(`${api}/api/trainings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          time_of_day: timeOfDay,
          duration,
          details,
          user_id: "1",
          sport_id: sport,
        }),
      });
    } else if (id) {
      fetch(`${api}/api/trainings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          time_of_day: timeOfDay,
          duration,
          details,
          user_id: "1",
          sport_id: sport,
        }),
      });
    }
    handleClose();
  };

  return (
    <form className="trainingForm" onSubmit={handleSubmit}>
      <h1>Créer une nouvelle activité</h1>

      <select
        type=""
        id="use-template"
        name="template"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      >
        <option>Est-ce que tu veux utiliser un modèle ?</option>
        {templates.length === 0 ? null : templates.map((temp) => (<option key={temp.id}>{temp.title}</option>))}
      </select>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre de ton entraînement"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Quel jour ?"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        type=""
        id="time-of-day-select"
        name="time-of-day"
        value={timeOfDay}
        onChange={(e) => setTimeOfDay(e.target.value)}
      >
        <option>Matin, Après-midi ou Soir ? 😉</option>
        <option>Matin</option>
        <option>Après-midi</option>
        <option>Soir</option>
      </select>
      <select
        id="sport-select"
        name="type"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      >
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
      <button type="button" className="secondary-button" onClick={handleClose}>
        Annuler
      </button>
    </form>
  );
}

export default TrainingForm;

TrainingForm.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired, // ID de l'activité en cours d'édition
  training: PropTypes.shape({
    title: PropTypes.string.isRequired, // Titre de l'activité
    date: PropTypes.string.isRequired, // Date de l'activité
    timeOfDay: PropTypes.string, // Moment de la journée de l'activité
    duration: PropTypes.string.isRequired, // Durée de l'activité
    details: PropTypes.string.isRequired, // Détails de l'activité
    sport: PropTypes.number, // ID du sport associé à l'activité
  }).isRequired,
};
