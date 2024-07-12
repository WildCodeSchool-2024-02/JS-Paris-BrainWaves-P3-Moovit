import PropTypes from "prop-types";
import { useContext } from "react";
import "./sports.css";
import DarkModeContext from "../../services/DarkModeContext";

export default function Sports({ activeButtons, setActiveButtons, sports }) {
  const { mode } = useContext(DarkModeContext);
  const handleClick = (e) => {
    const { value } = e.currentTarget;
    setActiveButtons((prevActiveButtons) => ({
      ...prevActiveButtons,
      [value]: !prevActiveButtons[value],
      other: false,
    }));
  };

  const handleOther = () => {
    setActiveButtons((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === "other" ? !prevState.other : false;
        return acc;
      }, {});
      return newState;
    });
  };
  
  return (
    <div className="section-sport">
      {sports.map((sport) => (
        <button
          type="button"
          key={sport.id}
          value={sport.name}
          onClick={handleClick}
          className={
            activeButtons[sport.name]
              ? `sport-container-${mode} active-sport`
              : `sport-container-${mode}`
          }
        >
          <p>{sport.name[0].toUpperCase() + sport.name.slice(1)}</p>
        </button>
      ))}
      <button
        type="button"
        value="other"
        onClick={handleOther}
        className={
          activeButtons.other
            ? `sport-container-${mode} active-sport`
            : `sport-container-${mode}`
        }
      >
        <p>Autres</p>
      </button>
    </div>
  );
}

Sports.propTypes = {
  activeButtons: PropTypes.objectOf(PropTypes.bool).isRequired,
  setActiveButtons: PropTypes.func.isRequired,
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
