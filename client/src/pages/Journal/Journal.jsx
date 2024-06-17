/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./journal.css";
import * as datefns from "date-fns";
import { Toaster, toast } from "sonner";
import Days from "../../components/Days/Days";
import Card from "../../components/Card/Card";
import TipsCard from "../../components/TipsCard/TipsCard";
import SideBar from "../../components/SideBar/SideBar";

export default function Journal() {
  // Number of trainings today
  const todayTraining = useLoaderData();

  // Current date of today
  const [currentDate, setCurrentDate] = useState(new Date());

  // All the trainings for a given date
  const [trainings, setTrainings] = useState([]);
  // Loading state trainings
  const [loadingTrainings, setLoadingTrainings] = useState(false);

  // State for the day clicked formated "yyyy-MM-dd"
  const [dayTraining, setDayTraining] = useState(
    datefns.format(new Date(), "yyyy-MM-dd")
  );

  // State to count (for the week display)
  const [weekCounter, setWeekCounter] = useState(0);

  // State to get all Tips for a giving type
  const [tips, setTips] = useState([]);
  // Tips repos
  const tipsRepos = tips.filter((tip) => tip.type === "Repos");
  // Tips trainings
  const tipsTraining = tips.filter((tip) => tip.type === "Entraînement");
  // Loading state tips
  const [loadingTips, setLoadingTips] = useState(false);

  // Get datas to get trainings for a giving day
  useEffect(() => {
    setLoadingTips(false);
    setLoadingTrainings(false);
    fetch(`${import.meta.env.VITE_API_URL}/api/trainings/${dayTraining}/2`)
      .then((response) => response.json())
      .then((response) => {
        setTrainings(response);
        setLoadingTrainings(true);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/tips`)
      .then((response) => response.json())
      .then((response) => {
        setTips(response);
        setLoadingTips(true);
      });
  }, [dayTraining]);

  // Function to display a toast
  const getToasty = () => {
    if (todayTraining.length > 0) {
      toast.info(
        `Tu as ${todayTraining.length} entraînement${todayTraining.length > 1 ? "s" : ""} aujourd'hui. Courage tu peux le faire !`
      );
    } else {
      toast.info(
        "Tu n'as pas d'entraînement aujourd'hui. Profites en pour te reposer !"
      );
    }
  };
  useEffect(() => {
    getToasty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const { day, month, numb } = convert(dayTraining);

  // First day of the week
  const firstDay = datefns.startOfWeek(currentDate, { weekStartsOn: 1 });
  // Last day of the week
  const lastDay = datefns.endOfWeek(currentDate, { weekStartsOn: 1 });
  // List of days
  const daysOfWeek = formated(
    datefns.eachDayOfInterval({ start: firstDay, end: lastDay })
  );

  // Display the previous week
  const handlePrev = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );
    const dateFirstPrev = datefns.startOfWeek(date, { weekStartsOn: 1 });
    setCurrentDate(date);
    setWeekCounter((prev) => prev - 1);
    setDayTraining(datefns.format(dateFirstPrev, "yyyy-MM-dd"));
  };

  // Display the next week
  const handleNext = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );
    const dateFirstNext = datefns.startOfWeek(date, { weekStartsOn: 1 });
    setCurrentDate(date);
    setWeekCounter((prev) => prev + 1);
    setDayTraining(datefns.format(dateFirstNext, "yyyy-MM-dd"));
  };

  // Function to return to today
  const handleReturnToday = () => {
    setDayTraining(datefns.format(new Date(), "yyyy-MM-dd"));
    setCurrentDate(new Date());
    setWeekCounter(0);
  };

  return (
    <section className="journal">
      <div className="journal-first-container">
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
        <button type="button" className="journal-add-button">
          <p>Ajouter une activité</p>
          <FaPlus />
        </button>
        {loadingTrainings && (
          <div className="journal-card">
            {trainings.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
        {trainings.length > 0 && loadingTips && (
          <div className="journal-card">
            <TipsCard
              tip={tipsTraining[Math.ceil(Math.random() * tipsTraining.length)]}
            />
          </div>
        )}
        {trainings.length === 0 && loadingTips && (
          <div className="journal-card">
            <TipsCard
              tip={tipsRepos[Math.ceil(Math.random() * tipsRepos.length)]}
            />
          </div>
        )}
        {dayTraining !== datefns.format(new Date(), "yyyy-MM-dd") && (
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
            dayTraining={dayTraining}
            setDayTraining={setDayTraining}
            weekCounter={weekCounter}
            handleReturnToday={handleReturnToday}
          />
        </div>
      </div>
      <SideBar />
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(180, 210, 180)",
          },
          className: "class",
        }}
      />
    </section>
  );
}
