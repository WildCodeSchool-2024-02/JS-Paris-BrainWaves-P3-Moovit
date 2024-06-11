import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./journal.css";
import * as datefns from "date-fns";
import Days from "../../components/Days/Days";
import Card from "../../components/Card/Card";
import TipsCard from "../../components/TipsCard/TipsCard";
import SideBar from "../../components/SideBar/SideBar";

export default function Journal() {
  // Current date of today
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/trainings")
      .then((response) => response.json())
      .then((response) => setTrainings(response));
  }, []);

  // Formated day function "yyyy-MM-dd"
  const formated = (daysList) => {
    const resultList = [];
    const daysWeek = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
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
      <div className="journal-first-container">
        <div className="journal-orange-block">
          <div className="journal-elements">
            <p className="journal-day-mobile">Name</p>
            <p className="journal-day-mobile">Sportif de haut niveau</p>
            <h1 className="journal-day-desktop">Mercredi 12 Juin</h1>
          </div>
          <p className="journal-motivation">
            Aujourd’hui, tu as 2 entraînements de prévu ! Courage, tu peux le
            faire
          </p>
        </div>
        <button type="button" className="journal-add-button">
          <p>Ajouter une activité</p>
          <FaPlus />
        </button>
        <div className="journal-card">
          {trainings.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <div className="journal-card">
          <TipsCard />
        </div>
      </div>
      <div className="journal-second-container">
        <div className="journal-days-container">
          <Days
            daysOfWeek={daysOfWeek}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </div>
      <div className="journal-third-container">
        <SideBar />
      </div>
    </section>
  );
}
