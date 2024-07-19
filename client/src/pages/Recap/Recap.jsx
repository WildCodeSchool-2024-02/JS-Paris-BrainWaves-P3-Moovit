import { useEffect, useState } from "react";
import * as datefns from "date-fns";
import "./recap.css";
import { useUser } from "../../contexts/User/User";
import SideBar from "../../components/SideBar/SideBar";

export default function Recap() {
  const { user } = useUser();
  // State to store the ratio of validate training
  const [ratio, setRatio] = useState(0);

  // State to store the number of validate sport per sport
  const [recap, setRecap] = useState([]);

  // State to display this month or the previous one
  const [now, setNow] = useState(true);

  const [today, setToday] = useState(new Date());
  const firstMonth = datefns.startOfMonth(today);
  const lastMonth = datefns.endOfMonth(today);

  const getRatio = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/ratio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            firstDay: firstMonth,
            lastDay: now ? today : lastMonth,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRatio(data);
      } else {
        setRatio(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRecap = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/recap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            firstDay: firstMonth,
            lastDay: now ? today : lastMonth,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecap(data);
      } else {
        setRecap([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRatio();
    getRecap();
  }, [today]);

  const handleNow = () => {
    setNow(true);
    setToday(new Date());
  };

  const handleNotNow = () => {
    setNow(false);
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    setToday(date);
  };

  return (
    <section className="recap">
      <section className="recap-container">
        <h1 className="recap-title">Ton recapitulatif</h1>
        <div className="month-selection">
          <button
            type="button"
            className={!now ? "month-active" : ""}
            onClick={handleNotNow}
          >
            Le mois dernier
          </button>
          <button
            type="button"
            className={now ? "month-active" : ""}
            onClick={handleNow}
          >
            Ce mois-ci
          </button>
        </div>
        <h1 className="subtitle">Nombre d'entraînements validés par sport :</h1>
        <div className="sport-list">
          {recap.length > 0 ? (
            recap.map((s) => (
              <div key={s.name} className="sport-detail-recap">
                <button type="button" className="button-recap">
                  {s.name[0].toUpperCase() + s.name.slice(1)}
                </button>
                <h1>
                  {s.total}{" "}
                  <span className="entrainement">
                    entraînement{s.total > 1 ? "s" : ""}
                  </span>
                </h1>
              </div>
            ))
          ) : (
            <p>Tu n'as pas validé d'entrainement ce mois-ci</p>
          )}
        </div>
        <h1 className="subtitle">Nombre total d'entraînements validés </h1>
        <section className="progress-max">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${ratio}%` }}>
              {ratio}%
            </div>
          </div>
        </section>
      </section>
      <SideBar />
    </section>
  );
}
