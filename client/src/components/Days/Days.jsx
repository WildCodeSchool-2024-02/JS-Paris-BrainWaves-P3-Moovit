/* eslint-disable import/no-duplicates */
import PropTypes from "prop-types";
import * as datefns from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./days.css";

export default function Days({
  daysOfWeek,
  handlePrev,
  handleNext,
  activeButton,
  setActiveButton,
  setDayTraining,
  weekCounter,
  handleReturnToday,
}) {
  
  // Function that handle display
  const handleDisplay = (day) => {
    setActiveButton(day.date);
    setDayTraining(day.date);
  };

  return (
    <section id="days">
      <div className="days-monitor">
        <button
          type="button"
          className="days-prev-button"
          aria-label="require"
          onClick={handlePrev}
        >
          <IoIosArrowBack />
        </button>
        {weekCounter === 0 && (
          <button type="button" className="days-current-button">
            Cette semaine
          </button>
        )}
        {weekCounter < 0 && (
          <button type="button" className="days-current-button">
            Il y a {-weekCounter} semaine(s)
          </button>
        )}
        {weekCounter > 0 && (
          <button type="button" className="days-current-button">
            Dans {weekCounter} semaine(s)
          </button>
        )}
        <button
          type="button"
          className="days-next-button"
          aria-label="require"
          onClick={handleNext}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="days-container">
        {daysOfWeek.map((day) => (
          <button
            className={
              activeButton === day.date
                ? "days-buttons day-active"
                : "days-buttons"
            }
            type="button"
            key={day.date}
            value={day.date}
            onClick={() => handleDisplay(day)}
          >
            <p className="days-day-desktop">{day.day}</p>
            <p className="days-day">{day.day.slice(0, 3)}</p>
            <p className="days-number">
              {day.date.slice(day.date.length - 2, day.date.length)}
            </p>
            <p className="days-statut">statut</p>
            <p className="days-statut-desktop">1 entrainement</p>
          </button>
        ))}
      </div>
      {activeButton !== datefns.format(new Date(), "yyyy-MM-dd") && (
        <button
          type="button"
          className="days-button-today"
          onClick={handleReturnToday}
        >
          Retour à aujourd'hui
        </button>
      )}
    </section>
  );
}
Days.propTypes = {
  daysOfWeek: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  activeButton: PropTypes.string.isRequired,
  setActiveButton: PropTypes.func.isRequired,
  setDayTraining: PropTypes.func.isRequired,
  weekCounter: PropTypes.number.isRequired,
  handleReturnToday: PropTypes.func.isRequired,
};
