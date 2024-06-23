import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useContext } from "react";
import DarkModeContext from "../../services/DarkModeContext";
import "./validation.css";

export default function Validation({ handleClose, handleDeleteFeedback }) {
  const { mode } = useContext(DarkModeContext);
  return (
    <section className="validation-modal">
      <motion.div
        className={`validation-container-${mode}`}
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
          scale: {
            type: "spring",
            stiffness: 300,
            restDelta: 0.001,
          },
        }}
      >
        <p>Es-tu sur de vouloir supprimer ce feedback ?</p>
        <div className="validation-button-container">
          <button
            type="button"
            className="validation-yes"
            onClick={handleDeleteFeedback}
          >
            OUI
          </button>
          <button type="button" className="validation-no" onClick={handleClose}>
            NON
          </button>
        </div>
      </motion.div>
    </section>
  );
}

Validation.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleDeleteFeedback: PropTypes.func.isRequired,
};
