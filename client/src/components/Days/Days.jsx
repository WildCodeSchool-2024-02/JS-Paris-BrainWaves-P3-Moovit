/* eslint-disable import/no-duplicates */
import PropTypes from "prop-types";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./days.css";

export default function Days({ daysOfWeek, handlePrev, handleNext }) {
  return (
    <section id="days">
      <div className="days-monitor">
        <button type="button" className='days-prev-button' aria-label="require" onClick={handlePrev}>
          <IoIosArrowBack />
        </button>
        <button type="button" className="days-current-button"> Cette semaine </button>
        <button type="button" className='days-next-button' aria-label="require" onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </div>
      <div className="days-container">
        {daysOfWeek.map((day) => (
          <button
            className="days-buttons"
            type="button"
            key={day.date}
            value={day.date}
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
  handlePrev: PropTypes.func.isRequired
};
