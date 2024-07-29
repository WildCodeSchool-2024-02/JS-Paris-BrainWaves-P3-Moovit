import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import TrainingForm from "../../TrainingForm/TrainingForm";

function PopUp({ open, handleClose, id, training, dayTraining }) {
  const styles = {
    modalStyle1: {
      overflowY: "auto",
    },
  };
  return (
    <Modal open={open} onClose={handleClose} style={styles.modalStyle1}>
      <div>
        <TrainingForm
          id={id}
          training={training}
          handleClose={handleClose}
          open={open}
          dayTraining={dayTraining}
        />
      </div>
    </Modal>
  );
}

export default PopUp;

PopUp.propTypes = {
  open: PropTypes.bool.isRequired, // Indique si la modale est ouverte
  handleClose: PropTypes.func.isRequired, // Fonction pour fermer la modale
  dayTraining: PropTypes.string,
  id: PropTypes.number,
  training: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired, // Titre de l'activité
      date: PropTypes.string.isRequired, // Date de l'activité
      timeOfDay: PropTypes.string, // Moment de la journée de l'activité
      is_completed: PropTypes.number,
      duration: PropTypes.string.isRequired, // Durée de l'activité
      details: PropTypes.string.isRequired, // Détails de l'activité
      sport: PropTypes.number, // ID du sport associé à l'activité
    }),
    PropTypes.oneOf([undefined]),
  ]),
};

PopUp.defaultProps = {
  id: null,
  training: undefined,
  dayTraining: undefined,
};
