import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import DarkModeContext from "../../services/DarkModeContext";
import "./tipscard.css";

export default function TipsCard() {
  const { mode } = useContext(DarkModeContext);
  return (
    <section id={`tipscard-${mode}`}>
      <h1 className="card-title">Petit conseil</h1>
      <p>
        Tu as un entraînement aujourd’hui :) N’oublie pas de t’échauffer, de
        t’hydrater !
      </p>
      <div className="card-points">
        <BsThreeDotsVertical />
      </div>
    </section>
  );
}
