import { useState } from "react";
import "./journal.css";
import * as datefns from "date-fns";
import Days from "../../components/Days/Days";
import Card from "../../components/Card/Card";

export default function Journal() {
  // Current date of today
  const [currentDate, setCurrentDate] = useState(new Date());

  // Formated day function "yyyy-MM-dd"
  const formated = (daysList) => {
    const resultList = [];
    const daysWeek = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
    for (let i = 0; i < daysList.length; i += 1) {
      resultList.push({
        date: datefns.format(daysList[i], "yyyy-MM-dd"),
        day: daysWeek[i],
      });
    }
    return resultList;
  };

  // Display the previous week
  const handlePrev = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7
      )
    );
  };

  // Display the next week
  const handleNext = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 7
      )
    );
  };

  // First day of the week
  const firstDay = datefns.startOfWeek(currentDate, { weekStartsOn: 1 });
  // Last day of the week
  const lastDay = datefns.endOfWeek(currentDate, { weekStartsOn: 1 });
  // List of days
  const daysOfWeek = formated(
    datefns.eachDayOfInterval({ start: firstDay, end: lastDay })
  );

  return (
    <section id="journal">
      <div className="journal-orange-block" />
      <div className="journal-days-container">
        <div className="journal-elements">
          <p>Name</p>
          <p>Sportif de haut niveau</p>
        </div>
        <p className="journal-motivation">
          Aujourd’hui, tu as 2 entraînements de prévu ! Courage, tu peux le
          faire
        </p>
        <Days
          daysOfWeek={daysOfWeek}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
      <div className="journal-training">
        <Card />
      </div>
    </section>
  );
}
