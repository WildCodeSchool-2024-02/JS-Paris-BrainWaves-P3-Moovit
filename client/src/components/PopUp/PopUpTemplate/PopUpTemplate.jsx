import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import TemplateForm from "../../TemplateForm/TemplateForm";

function PopUp({ open, handleClose, id, training }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <TemplateForm id={id} training={training} handleClose={handleClose} />
      </div>
    </Modal>
  );
}

export default PopUp;

PopUp.defaultProps = {
  id: null,
  training: undefined,
};

PopUp.propTypes = {
  open: PropTypes.bool.isRequired, // Indique si la modale est ouverte
  handleClose: PropTypes.func.isRequired, // Fonction pour fermer la modale
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined, null]),
  ]),
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
