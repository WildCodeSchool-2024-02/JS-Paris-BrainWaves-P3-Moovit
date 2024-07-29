import PropTypes from "prop-types";
import * as datefns from "date-fns";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import "./days.css";

export default function Days({
  daysOfWeek,
  handlePrev,
  handleNext,
  dayTraining,
  setDayTraining,
  weekCounter,
  handleReturnToday,
  getInterval,
  handleOpenCalendar,
}) {
  // Function that handle display
  const handleDisplay = (day) => {
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
          <button
            type="button"
            className="days-current-button"
            onClick={handleOpenCalendar}
          >
            <p>Cette semaine</p>
            <CiCalendarDate className="icon-calendar" />
          </button>
        )}
        {weekCounter === -1 && (
          <button
            type="button"
            className="days-current-button"
            onClick={handleOpenCalendar}
          >
            <p>La semaine dernière</p>
            <CiCalendarDate className="icon-calendar" />
          </button>
        )}
        {weekCounter === 1 && (
          <button
            type="button"
            className="days-current-button"
            onClick={handleOpenCalendar}
          >
            <p>La semaine prochaine</p>
            <CiCalendarDate className="icon-calendar" />
          </button>
        )}
        {weekCounter < -1 && (
          <button
            type="button"
            className="days-current-button"
            onClick={handleOpenCalendar}
          >
            <p>Il y a {-weekCounter} semaine(s)</p>
            <CiCalendarDate className="icon-calendar" />
          </button>
        )}
        {weekCounter > 1 && (
          <button
            type="button"
            className="days-current-button"
            onClick={handleOpenCalendar}
          >
            <p>Dans {weekCounter} semaine(s)</p>
            <CiCalendarDate className="icon-calendar" />
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
              dayTraining === day.date
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
            {getInterval.includes(day.date) && (
              <p className="days-statut">Test</p>
            )}
            {!getInterval.includes(day.date) && (
              <p className="days-rest">Repos</p>
            )}
          </button>
        ))}
      </div>
      {dayTraining !== datefns.format(new Date(), "yyyy-MM-dd") && (
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
  dayTraining: PropTypes.string.isRequired,
  setDayTraining: PropTypes.func.isRequired,
  weekCounter: PropTypes.number.isRequired,
  handleReturnToday: PropTypes.func.isRequired,
  getInterval: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOpenCalendar: PropTypes.func.isRequired,
};
