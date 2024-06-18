/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./journal.css";
import * as datefns from "date-fns";
import { Toaster, toast } from "sonner";
import Days from "../../components/Days/Days";
import Card from "../../components/Card/Card";
import TipsCard from "../../components/TipsCard/TipsCard";
import SideBar from "../../components/SideBar/SideBar";
import DarkMode from "../../contexts/DarkMode/DarkMode";
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";

export default function Journal() {

  const [currentTraining, setCurrentTraining] = useState(null)

    // Managing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentTraining(null)};



  // Current date
  const [currentDate, setCurrentDate] = useState(new Date());
  // All the trainings
  const [trainings, setTrainings] = useState([]);
  // Day clicked
  const [activeButton, setActiveButton] = useState(
    datefns.format(new Date(), "yyyy-MM-dd")
  );
  // State qui contient la date cliqué (initialement à today)
  const [dayTraining, setDayTraining] = useState("today");

  // State to count
  const [weekCounter, setWeekCounter] = useState(0);

  // Get datas to get trainings for a giving day
  useEffect(() => {
    fetch(`http://localhost:3310/api/trainings/${dayTraining}/2`)
      .then((response) => response.json())
      .then((response) => setTrainings(response));
  }, [dayTraining, open]);


  useEffect(() => {
    if (trainings.length > 0) {
      toast.info(
        `Tu as ${trainings.length} entraînement${trainings.length > 1 ? "s" : ""} aujourd'hui. Courage tu peux le faire !`
      );
    } else {
      toast.info(
        "Tu n'as pas d'entraînement aujourd'hui. Profites en pour te reposer !"
      );
    }
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
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );
    setCurrentDate(date);
    setActiveButton(datefns.format(date, "yyyy-MM-dd"));
    setWeekCounter((prev) => prev - 1);
    setDayTraining(datefns.format(date, "yyyy-MM-dd"));
  };

  // Display the next week
  const handleNext = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );
    setCurrentDate(date);
    setActiveButton(datefns.format(date, "yyyy-MM-dd"));
    setWeekCounter((prev) => prev + 1);
    setDayTraining(datefns.format(date, "yyyy-MM-dd"));
  };

  // Function to return to today
  const handleReturnToday = () => {
    setDayTraining(datefns.format(new Date(), "yyyy-MM-dd"));
    setActiveButton(datefns.format(new Date(), "yyyy-MM-dd"));
    setCurrentDate(new Date());
    setWeekCounter(0);
  };

  // First day of the week
  const firstDay = datefns.startOfWeek(currentDate, { weekStartsOn: 1 });
  // Last day of the week
  const lastDay = datefns.endOfWeek(currentDate, { weekStartsOn: 1 });
  // List of days
  const daysOfWeek = formated(
    datefns.eachDayOfInterval({ start: firstDay, end: lastDay })
  );

  // Get training ID for edition
  const findCurrentTraining = trainings.find((training) => (training.id === currentTraining))


  return (
    <section className="journal">
      <div className="journal-first-container">
        <div className="journal-dark-button-mobile">
          <DarkMode />
        </div>
        <div className="journal-orange-block">
          <div className="journal-elements">
            <h1 className="journal-day-desktop">
              {day} {numb} {month}
            </h1>
          </div>
          {trainings.length === 0 ? (
            <p className="journal-motivation">
              Aujourd’hui, tu n'as rien de prévu ! Profites en pour te reposer.
            </p>
          ) : (
            <p className="journal-motivation">
              Aujourd’hui, tu as {trainings.length} entraînement
              {trainings.length > 1 ? "s" : ""} de prévu ! Courage, tu peux le
              faire.
            </p>
          )}
        </div>
        <button type="button" className="journal-add-button" onClick={handleOpen}>
          <p>Ajouter une activité</p>
          <FaPlus />
        </button>
        <div className="journal-card">
          {trainings.map((card) => (
            <Card key={card.id} card={card} handleOpen={handleOpen} setCurrentTraining={setCurrentTraining}/>
          ))}
        </div>
        <div className="journal-card">
          <TipsCard />
        </div>
        {activeButton !== datefns.format(new Date(), "yyyy-MM-dd") && (
          <button
            type="button"
            className="days-button-today-mobile"
            onClick={handleReturnToday}
          >
            Retour à aujourd'hui
          </button>
        )}
      </div>
      <div className="journal-second-container">
        <div className="journal-days-container">
          <Days
            daysOfWeek={daysOfWeek}
            handlePrev={handlePrev}
            handleNext={handleNext}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setDayTraining={setDayTraining}
            weekCounter={weekCounter}
            handleReturnToday={handleReturnToday}
          />
        </div>
      </div>
      <div className="journal-third-container">
        <SideBar />
        <div className="journal-dark-button-desktop">
          <DarkMode />
        </div>
      </div>
      <PopUp
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        training={findCurrentTraining}
        id={currentTraining}
      />
      <Toaster />
    </section>
  );
}
