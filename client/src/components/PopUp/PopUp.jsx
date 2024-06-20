import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import TrainingForm from "../TrainingForm/TrainingForm";

function PopUp({ open, handleClose, id = null, training = undefined }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <TrainingForm id={id} training={training} handleClose={handleClose} />
    </Modal>
  );
}

export default PopUp;

PopUp.propTypes = {
  open: PropTypes.bool.isRequired, // Indique si la modale est ouverte
  handleClose: PropTypes.func.isRequired, // Fonction pour fermer la modale
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])]).isRequired, // ID de l'activité en cours d'édition
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
