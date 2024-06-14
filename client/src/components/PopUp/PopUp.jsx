import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import TrainingForm from "../TrainingForm/TrainingForm";

function PopUp({ open, handleOpen, handleClose, getEditForm, id, training }) {
  return (
    <>
      <button type="button" className="second-button" onClick={handleOpen}>
        Open modal
      </button>
      <Modal open={open} onClose={handleClose}>
        <TrainingForm getEditForm={getEditForm} id={id} training={training} handleClose={handleClose}/>
      </Modal>
    </>
  );
}

export default PopUp;

PopUp.propTypes = {
  open: PropTypes.bool.isRequired, // Indique si la modal est ouverte
  handleOpen: PropTypes.func.isRequired, // Fonction pour ouvrir la modal
  handleClose: PropTypes.func.isRequired, // Fonction pour fermer la modal
  getEditForm: PropTypes.bool.isRequired, // Indique si le formulaire est utilisé pour éditer une activité existante
  id: PropTypes.number.isRequired, // ID de l'activité en cours d'édition
  training: PropTypes.shape({
    title: PropTypes.string.isRequired, // Titre de l'activité
    date: PropTypes.string.isRequired, // Date de l'activité
    timeOfDay: PropTypes.string.isRequired, // Moment de la journée de l'activité
    duration: PropTypes.string.isRequired, // Durée de l'activité
    details: PropTypes.string.isRequired, // Détails de l'activité
    sport: PropTypes.number.isRequired, // ID du sport associé à l'activité
  }).isRequired,
};
