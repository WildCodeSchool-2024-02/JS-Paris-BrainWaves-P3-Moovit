import { BsThreeDotsVertical } from "react-icons/bs";
import "./tipscard.css";

export default function TipsCard() {
  return (
    <section id="tipscard">
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
