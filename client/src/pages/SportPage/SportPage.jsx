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
    mapSport(sports);
  }, []);

  // Listening to activeSport to fill dataSports state
  const tabActive = Object.entries(activeButtons);
  useEffect(() => {
    const selectedSports = [];
    tabActive.forEach((value) => {
      if (value[1] === true && value[0] !== "other") {
        const tab = sports.find((sport) => sport.name === value[0]);
        selectedSports.push(tab.id);
      }
    });
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
