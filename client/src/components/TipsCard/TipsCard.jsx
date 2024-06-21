import PropTypes from "prop-types";
import { useContext } from "react";
import DarkModeContext from "../../services/DarkModeContext";
import "./tipscard.css";

export default function TipsCard({ tip = undefined }) {
  const { mode } = useContext(DarkModeContext);
  return (
    <section id={`tipscard-${mode}`}>
      <h1 className="card-title">Petit conseil | {tip.type}</h1>
      <p>{tip.content}</p>
    </section>
  );
}

TipsCard.propTypes = {
  tip: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};
