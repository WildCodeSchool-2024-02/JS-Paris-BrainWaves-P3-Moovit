import PropTypes from "prop-types";
import { useContext } from "react";
import { motion } from "framer-motion";
import DarkModeContext from "../../services/DarkModeContext";
import "./tipscard.css";

export default function TipsCard({ tip = undefined }) {
  const { mode } = useContext(DarkModeContext);
  const variants = {
    open: {
      opacity: 1,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };
  return (
    <motion.section
      id={`tipscard-${mode}`}
      variants={variants}
      animate="open"
      initial="closed"
    >
      <h1 className="card-title">Petit conseil | {tip?.type}</h1>
      <p>{tip?.content}</p>
    </motion.section>
  );
}

TipsCard.propTypes = {
  tip: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  }),
};

TipsCard.defaultProps = {
  tip: {
    type: "Rappel",
    content:
      "N'oublie pas de bien t'hydrater avant et après ton entraînement !",
  },
};
