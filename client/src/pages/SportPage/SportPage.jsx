import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/User/User";
import Sports from "../../components/Sports/Sports";

export default function SportPage() {
  const api = import.meta.env.VITE_API_URL;
  const { sports } = useOutletContext();
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeButtons, setActiveButtons] = useState({});
  const [data, setData] = useState([]);

  const mapSport = (sportList) => {
    const newSport = { other: false };
    sportList.forEach((sp) => {
      const insert = sp.name;
      newSport[insert] = false;
    });
    setActiveButtons(newSport);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    mapSport(sports)
  }, []);

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
        navigate("/profile/level");
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
      <Sports
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
        sports={sports}
      />
      <div className="name-input-container">
        <button type="button" className="next-button" onClick={addSport}>
          Suivant
        </button>
        <p className="name-question-number">Question 2/3</p>
      </div>
    </section>
  );
}
