/* eslint-disable import/no-unresolved */
import { useNavigate, useOutletContext } from "react-router-dom";
import "./sportpage.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../../contexts/User/User";
import DarkModeContext from "../../services/DarkModeContext";

export default function SportPage() {
  const api = import.meta.env.VITE_API_URL;
  const { sports } = useOutletContext();
  const { user } = useUser();
  const { mode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [activeButtons, setActiveButtons] = useState({
    fitness: false,
    running: false,
    poney: false,
    other: false,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleClick = (e) => {
    const { value } = e.currentTarget;
    setActiveButtons((prevActiveButtons) => ({
      ...prevActiveButtons,
      [value]: !prevActiveButtons[value],
      other: false,
    }));
  };

  const handleOther = () => {
    setActiveButtons({
      fitness: false,
      running: false,
      poney: false,
      other: !activeButtons.other,
    });
  };

  useEffect(() => {
    const selectedSports = [];
    if (activeButtons.fitness === true) {
      const tab = sports.find((sport) => sport.name === "fitness");
      selectedSports.push(tab.id);
    }
    if (activeButtons.running === true) {
      const tab = sports.find((sport) => sport.name === "running");
      selectedSports.push(tab.id);
    }
    if (activeButtons.poney === true) {
      const tab = sports.find((sport) => sport.name === "poney");
      selectedSports.push(tab.id);
    }
    setData(selectedSports);
  }, [activeButtons]);

  const addSport = async () => {
    try {
      const response = await fetch(`${api}/api/userhassport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          sports: data,
        }),
      });
      if (response.ok) {
        navigate("/login");
        toast.success(
          "Super ton compte a été créé ! Tu peux maintenant te connecter"
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="name-page">
      <div className="welcoming-message-container">
        <h1>Salut, et bienvenue sur Moov'it</h1>
        <p>
          Avant de commencer, nous aurions besoin d’en savoir un peu plus sur
          toi afin de personnaliser ton expérience.
        </p>
      </div>
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
      <div className="name-input-container">
        <button type="button" className="next-button" onClick={addSport}>
          Suivant
        </button>
        <p className="name-question-number">Question 2/3</p>
      </div>
    </section>
  );
}
