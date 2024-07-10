/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../../contexts/User/User";
import Level from "../../components/Level/Level";

export default function LevelPage() {
  const api = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeButtons, setActiveButtons] = useState({
    none: false,
    moderate: false,
    pro: false,
  });
  const [data, setData] = useState(0);

  useEffect(() => {
    if (activeButtons.none) {
      setData(1);
    }
    if (activeButtons.moderate) {
      setData(2);
    }
    if (activeButtons.pro) {
      setData(3);
    }
  }, [activeButtons]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleLevel = async () => {
    try {
      const response = await fetch(`${api}/api/users/profile/level`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          level: data,
        }),
      });
      if (response.ok) {
        toast.success(
          "Super ton compte a été créé ! Tu peux maintenant te connecter"
        );
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="name-page">
      <div className="welcoming-message-container">
        <h1>Parfait ! Dernière question</h1>
        <p>
          Afin de te proposer des entraînements adaptés à ton niveau, il ne nous
          manque plus que cette information !
        </p>
      </div>
      <Level
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
      />
      <div className="name-input-container">
        <button type="button" className="next-button" onClick={handleLevel}>
          Suivant
        </button>
        <p className="name-question-number">Quesion 3/3</p>
      </div>
    </section>
  );
}
