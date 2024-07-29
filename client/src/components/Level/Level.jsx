import PropTypes from "prop-types";
import { useContext } from "react";
import "./level.css";
import DarkModeContext from "../../services/DarkModeContext";

export default function Level({ activeButtons, setActiveButtons }) {
  const { mode } = useContext(DarkModeContext);
  const handleNone = () => {
    setActiveButtons({
      none: true,
      moderate: false,
      pro: false,
    });
  };

  const handleModerate = () => {
    setActiveButtons({
      none: false,
      moderate: true,
      pro: false,
    });
  };

  const handlePro = () => {
    setActiveButtons({
      none: false,
      moderate: false,
      pro: true,
    });
  };
  return (
    <div className="button-level-container">
      <button
        type="button"
        className={
          activeButtons.none
            ? `level-button-${mode} active-sport`
            : `level-button-${mode}`
        }
        onClick={handleNone}
      >
        J’aimerai bien me mettre au sport
      </button>
      <button
        type="button"
        className={
          activeButtons.moderate
            ? `level-button-${mode} active-sport`
            : `level-button-${mode}`
        }
        onClick={handleModerate}
      >
        Je fais du sport de temps en temps
      </button>
      <button
        type="button"
        className={
          activeButtons.pro
            ? `level-button-${mode} active-sport`
            : `level-button-${mode}`
        }
        onClick={handlePro}
      >
        Je fais du sport tous les jours
      </button>
    </div>
  );
}

Level.propTypes = {
  activeButtons: PropTypes.shape({
    none: PropTypes.bool.isRequired,
    moderate: PropTypes.bool.isRequired,
    pro: PropTypes.bool.isRequired,
  }).isRequired,
  setActiveButtons: PropTypes.func.isRequired,
};
