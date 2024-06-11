import { IoMdFitness } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./card.css";

export default function Card() {
  return (
    <section id="card">
      <h1 className="card-title">Entraînement du matin</h1>
      <div className="card-type-training">
        <IoMdFitness />
        <p>Entraînement | Fitness</p>
      </div>
      <div className="card-time-training">
        <div className="card-plus">
          <TbSunset2 />
          <p>Matin</p>
        </div>
        <div className="card-plus">
          <CiClock2 />
          <p>30 min</p>
        </div>
      </div>
      <button type="button" className="card-button-validate">
        Valider cet entrainement
      </button>
      <div className="card-points">
        <BsThreeDotsVertical />
      </div>
    </section>
  );
}
