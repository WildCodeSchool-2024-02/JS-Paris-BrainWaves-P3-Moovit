/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import DarkModeContext from "../../services/DarkModeContext";
import "./tipscard.css";

export default function TipsCard({
  tip = {
    content:
      "Fixe-toi des objectifs réalistes et mesurables. Évite de te comparer aux autres et concentre-toi sur ta propre progression.",
    type: "Rappel",
  },
}) {
  const { mode } = useContext(DarkModeContext);
  return (
    <section id={`tipscard-${mode}`}>
      <h1 className="card-title">Petit conseil | {tip.type}</h1>
      <p>{tip.content}</p>
      <div className="card-points">
        <BsThreeDotsVertical />
      </div>
    </section>
  );
}

TipsCard.propTypes = {
  tip: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  })
};
