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
  // All the trainings
  const [trainings, setTrainings] = useState([]);
  // Day clicked
  const [activeButton, setActiveButton] = useState(
    datefns.format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    fetch("http://localhost:3310/api/trainings")
      .then((response) => response.json())
      .then((response) => setTrainings(response));
  }, []);

  // Days of the week
  const daysWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  // Months of the year
  const monthList = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  // Formated day function "yyyy-MM-dd"
  const formated = (daysList) => {
    const resultList = [];
    for (let i = 0; i < daysList.length; i += 1) {
      resultList.push({
        date: datefns.format(daysList[i], "yyyy-MM-dd"),
        day: daysWeek[i],
      });
    }
    return resultList;
  };

  // Function that convert a date from yyyy-MM-dd to an object with 3 string (Ex: 2024-06-11 -> {'Tuesday', '11', 'June')
  const convert = (date) => {
    const newDate = new Date(
      date.slice(0, 4),
      date.slice(5, 7) - 1,
      date.slice(8, 10)
    );
    let day = newDate.getDay();
    if (day === 0) {
      day = 7;
    }
    const month = newDate.getMonth();
    return {
      day: daysWeek[day - 1],
      month: monthList[month],
      numb: date.slice(8, 10),
    };
  };

  // Function convert apply on the state activeButton which refer to the day clicked
  const { day, month, numb } = convert(activeButton);

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
            <h1 className="journal-day-desktop">
              {day} {numb} {month}
            </h1>
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
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      </div>
      <div className="journal-third-container">
        <SideBar />
      </div>
    </section>
  );
}
