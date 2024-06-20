import PropTypes from "prop-types";
import "./trainingForm.css";
import { useEffect, useState } from "react";
import * as datefns from "date-fns";

function TrainingForm({ id, training, handleClose }) {
  const api = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [details, setDetails] = useState(null);
  const [sport, setSport] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [checked, setChecked] = useState(false);

  // Fonction qui gère l'affichage du formulaire selon que l'utilisateur crée ou édite son activité.
  const getTemplates = async () => {
    await fetch(`${api}/api/templates/2/all`)
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error(err));
  };

  const handleSave = () => {
    fetch(`${api}/api/templates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        duration,
        details,
        user_id: "2",
        sport_id: sport,
      }),
    });
  };

  useEffect(() => {
    if (templateId && templates.length !== 0) {
      const selectedTemplate = templates.find(
        (template) => +template.id === +templateId
      );
      setTitle(selectedTemplate.title);
      setDuration(selectedTemplate.duration);
      setDetails(selectedTemplate.details);
      setSport(selectedTemplate.sport_id);
    }
  }, [templateId, templates]);

  useEffect(() => {
    getTemplates();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checked) handleSave();
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
        value={templateId}
        defaultValue=""
        onChange={(e) => setTemplateId(e.target.value)}
      >
        <option value="" disabled>
          Est-ce que tu veux utiliser un modèle ?
        </option>
        {templates.length === 0
          ? null
          : templates.map((temp) => (
              <option key={temp.id} value={temp.id}>
                {temp.title}
              </option>
            ))}
      </select>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre de ton entraînement"
        value={title}
        defaultValue={training ? training.title : ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Quel jour ?"
        value={date}
        defaultValue={
          training
            ? training.date.slice(0, 10)
            : datefns.format(new Date(), "yyyy-MM-dd")
        }
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        type=""
        id="time-of-day-select"
        name="time-of-day"
        value={timeOfDay}
        defaultValue={training ? training.time_of_day : null}
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
        defaultValue={training ? training.sport_id : null}
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
        defaultValue={training ? training.duration : null}
        placeholder="Combien de temps ?"
        onChange={(e) => setDuration(e.target.value)}
      />
      <textarea
        type="text"
        id="details"
        name="details"
        value={details}
        defaultValue={training ? training.details : null}
        placeholder="Enregistre les détails de ton activité ici 👌"
        onChange={(e) => setDetails(e.target.value)}
      />
      {templateId ? null : (
        <div className="save-template">
          <input
            type="checkbox"
            className="save-button"
            id="save-button"
            name="save-button"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="save-button" id="save-label">
            Enregistrer dans mes modèles
          </label>
        </div>
      )}
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
    time_of_day: PropTypes.string, // Moment de la journée de l'activité
    duration: PropTypes.string.isRequired, // Durée de l'activité
    details: PropTypes.string.isRequired, // Détails de l'activité
    sport_id: PropTypes.number, // ID du sport associé à l'activité
  }).isRequired,
};
