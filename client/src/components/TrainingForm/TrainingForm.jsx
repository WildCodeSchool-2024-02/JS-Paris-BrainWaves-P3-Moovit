import PropTypes from "prop-types";
import "./trainingForm.css";
import { useState } from "react";

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

  // Fonction qui gère l'affichage du formulaire selon que l'utilisateur crée ou édite son activité.

  const handleSubmit = () => {
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
          user_id: 1,
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
          user_id: 1,
          sport_id: sport,
        }),
      });
    }
    handleClose();
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handleSport = (e) => {
    e.preventDefault();
    setSport(parseInt(e.target.value, 10));
  };

  const handleTime = (e) => {
    e.preventDefault();
    setTimeOfDay(e.target.value);
  };
  const handleDuration = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
  };
  const handleDetails = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  return (
    <form className="trainingForm" onSubmit={handleSubmit}>
      <h1>Créer une nouvelle activité</h1>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre de ton entraînement"
        value={title}
        onChange={handleTitle}
      />
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Quel jour ?"
        value={date}
        onChange={handleDate}
      />
      <select
        type=""
        id="time-of-day-select"
        name="time-of-day"
        value={timeOfDay}
        onChange={handleTime}
      >
        <option value="" disabled selected>
          Matin, Après-midi ou Soir ? 😉
        </option>
        <option>Matin</option>
        <option>Après-midi</option>
        <option>Soir</option>
      </select>
      <select
        id="sport-select"
        name="type"
        value={sport}
        onChange={handleSport}
      >
        <option value="" disabled selected>
          Quel sport ? ⛹️
        </option>
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
        onChange={handleDuration}
      />
      <textarea
        type="text"
        id="details"
        name="details"
        value={details}
        placeholder="Enregistre les détails de ton activité ici 👌"
        onChange={handleDetails}
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
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
    .isRequired,
  handleClose: PropTypes.func.isRequired, // ID de l'activité en cours d'édition
  training: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired, // Titre de l'activité
      date: PropTypes.string.isRequired, // Date de l'activité
      timeOfDay: PropTypes.string, // Moment de la journée de l'activité
      duration: PropTypes.string.isRequired, // Durée de l'activité
      details: PropTypes.string.isRequired, // Détails de l'activité
      sport: PropTypes.number, // ID du sport associé à l'activité
    }),
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
