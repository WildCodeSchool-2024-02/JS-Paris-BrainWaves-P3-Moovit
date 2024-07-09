import PropTypes from "prop-types";
import { useContext } from "react";
import "./cancelbutton.css";
import DarkModeContext from "../../services/DarkModeContext";

export default function CancelButton({ onClick }) {
  const { mode } = useContext(DarkModeContext);
  return (
    <button type="button" className={`cancel-button-${mode}`} onClick={onClick}>
      Annuler
    </button>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
