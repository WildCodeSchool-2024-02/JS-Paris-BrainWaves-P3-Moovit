import { useEffect, useRef, useState } from "react";
import "./namepage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User/User";

export default function NamePage() {
  const api = import.meta.env.VITE_API_URL;
  const name = useRef();
  const { user } = useUser();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleNext = async () => {
    try {
      const response = await fetch(`${api}/api/users/profile/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: name.current.value,
        }),
      });
      if (response.ok) {
        navigate("/profile/sport");
      } else {
        setError(true);
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
      <div className="name-input-container">
        <input
          type="text"
          placeholder="C'est quoi ton prénom"
          className={error ? "input-error" : ""}
          ref={name}
        />
        {error ? (
          <p className="error-message">Veuillez renseigner un prénom</p>
        ) : null}
        <button type="button" className="next-button" onClick={handleNext}>
          Suivant
        </button>
        <p className="name-question-number">Question 1/3</p>
      </div>
    </section>
  );
}
