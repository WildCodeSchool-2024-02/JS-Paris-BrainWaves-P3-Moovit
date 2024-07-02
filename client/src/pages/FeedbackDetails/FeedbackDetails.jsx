/* eslint-disable import/no-unresolved */
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import "./feedbackdetails.css";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import SideBar from "../../components/SideBar/SideBar";
import CardMenu from "../../components/CardMenu/CardMenu";
import Validation from "../../components/Validation/Validation";
import Feedback from "../../components/Feedback/Feedback";
import { useUser } from "../../contexts/User/User";

export default function FeedbackDetails() {
  const api = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const { sports } = useOutletContext();
  const [feedback, setFeedback] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // Validation modal managing
  const [validation, setValidation] = useState(false);
  const handleCloseValidation = () => {
    setValidation(false);
    document.body.classList.remove("blocked");
  };
  const handleOpenValidation = () => {
    setValidation(true);
    document.body.classList.add("blocked");
  };

  // Delete feedback if yes is clicked
  const handleDeleteFeedback = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feedbacks/${feedback.id}/${feedback.training_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Feedback supprimé avec succès", {
          style: {
            background: "rgba(145, 225, 166, 0.8)",
            color: "black",
          },
        });
      } else {
        toast.error(
          "Une erreur est survenue, le feedback n'a pas pu être supprimé"
        );
      }
      handleCloseValidation();
      navigate("/journal");
    } catch (err) {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  // Open feedback State
  const [openFeedback, setOpenFeedback] = useState(false);

  // Managing opening and closing Modal (feedback)
  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };
  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  // Edit a feedback
  const handleEdit = () => {
    handleOpenFeedback();
  };

  // Open the modal validation
  const handleDelete = async () => {
    handleOpenValidation();
  };

  // State pour gestion de toast
  const [statusFeedback, setStatusFeedback] = useState(false);

  useEffect(() => {
    fetch(`${api}/api/feedbacks?id=${id}`)
      .then((response) => response.json())
      .then((response) => setFeedback(response[0]));
  }, [statusFeedback, api, id]);

  const variants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      x: "100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const idSport = sports?.find(
    (value) => feedback?.sport_id === value.id
  )?.name;

  return (
    <section className="feedbackdetail-page">
      <motion.div
        className="feedbackdetail-container"
        variants={variants}
        animate="open"
        initial="closed"
      >
        <div className="trainingCard-title">
          <h1 className="feedbackdetail-title">{feedback?.title}</h1>
          <CardMenu handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
        <div className="feedbackdetail-type-training">
          <IoMdFitness className="feedbackdetail-logo-type" />
          <p>
            Entraînement | {idSport ? idSport.charAt(0).toUpperCase() + idSport.slice(1) : idSport}
          </p>
        </div>
        <div className="feedbackdetail-duration-container">
          <CiClock2 className="feedbackdetail-logo-type" />
          <p className="feedbackdetail-duration-title">Durée réelle</p>
          <p className="feedbackdetail-duration">{feedback?.duration}</p>
        </div>
        <div className="feedbackdetail-feeling">
          {feedback?.global === "easy" && (
            <p className="feedbackdetail-question">
              Déroulé de la séance: <span className="response">Génial</span>
            </p>
          )}
          {feedback?.global === "medium" && (
            <p className="feedbackdetail-question">
              Déroulé de la séance: <span className="response">Mitigé</span>
            </p>
          )}
          {feedback?.global === "hard" && (
            <p className="feedbackdetail-question">
              Déroulé de la séance:
              <span className="response">Aucun plaisir</span>
            </p>
          )}
          {feedback?.difficulty === "easy" && (
            <p className="feedbackdetail-question">
              Pendant la séance: <span className="response">Très facile</span>
            </p>
          )}
          {feedback?.difficulty === "medium" && (
            <p className="feedbackdetail-question">
              Pendant la séance: <span className="response">Modéré</span>
            </p>
          )}
          {feedback?.difficulty === "hard" && (
            <p className="feedbackdetail-question">
              Pendant la séance:{" "}
              <span className="response">Très difficile</span>
            </p>
          )}
          {feedback?.after === "perfect" && (
            <p className="feedbackdetail-question">
              Après la séance: <span className="response">En pleine forme</span>
            </p>
          )}
          {feedback?.after === "good" && (
            <p className="feedbackdetail-question">
              Après la séance: <span className="response">Un peu fatigué</span>
            </p>
          )}
          {feedback?.after === "tired" && (
            <p className="feedbackdetail-question">
              Après la séance:
              <span className="response">J'ai besoin de repos</span>
            </p>
          )}
        </div>
        <div className="feedback-training-detail-container">
          <h1 className="feedback-training-details">
            Ce que tu as pensé de cet entraînement
          </h1>
          <p>{feedback?.details}</p>
        </div>
        <div className="feedback-training-detail-container">
          <h1 className="feedback-training-details">
            Détails de l'entraînement
          </h1>
          <p>{feedback?.training_details}</p>
        </div>
        <button
          type="button"
          className="feedbackdetail-button"
          onClick={() => navigate("/journal")}
        >
          Revenir au journal
        </button>
      </motion.div>
      <SideBar />
      {validation && (
        <Validation
          handleClose={handleCloseValidation}
          handleDeleteFeedback={handleDeleteFeedback}
          handleOpenValidation={handleOpenValidation}
        />
      )}
      <Feedback
        open={openFeedback}
        handleClose={handleCloseFeedback}
        feedbackId={feedback.id}
        setStatusFeedback={setStatusFeedback}
      />
      <Toaster />
    </section>
  );
}
