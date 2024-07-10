/* eslint-disable import/no-unresolved */
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast, Toaster } from 'sonner';
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import DarkMode from "../../components/DarkMode/DarkMode";
import SideBar from "../../components/SideBar/SideBar";
import Validation from "../../components/Validation/Validation";

import "./training.css";
import { useUser } from "../../contexts/User/User";

function TrainingDetails() {
  const { user } = useUser();
  const { sports } = useOutletContext();

  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [training, setTraining] = useState();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
  const handleDeleteTraining = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trainings/${training.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Entraînement supprimé avec succès", {
          style: {
            background: "rgba(145, 225, 166, 0.8)",
            color: "black",
          },
        });
      } else {
        toast.error(
          "Une erreur est survenue, l'entraînement n'a pas pu être supprimé"
        );
      }
      handleCloseValidation();
      navigate("/journal");
    } catch (err) {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const handleEdit = () => {
    handleOpen();
    setAnchorEl(false);
  };

  const handleDelete = async () => {
    handleOpenValidation();
    setAnchorEl(false);
  };

 

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

  useEffect(() => {
    if (!user) navigate("/login");
    fetch(`${api}/api/trainings/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTraining(data));
  }, [training]);

  const idSport = sports?.find(
    (value) => training?.sport_id === value.id
  )?.name;

  return (
    <>
      <DarkMode />
      <section className="training-details-page">
        <motion.div
          className="training-details-container"
          variants={variants}
          animate="open"
          initial="closed"
        >
          <section className="trainingCard-title">
            <h1>{training?.title}</h1>
            <CardMenu
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              id={id}
            />
          </section>
          <section className="feedbackdetail-type-training">
            <IoMdFitness className="training-details-logo-type" />
            <p>
              Entraînement |{" "}
              {idSport
                ? idSport.charAt(0).toUpperCase() + idSport.slice(1)
                : idSport}
            </p>
          </section>
          <section className="training-details-time-training">
            <CiClock2 className="training-details-logo-type" />
            {training?.time_of_day === "Matin" ? <p>Matin</p> : null}
            {training?.time_of_day === "Après-midi" ? <p>Après-midi</p> : null}
            {training?.time_of_day === "Soir" ? <p>Soir</p> : null}
            <p>| {training?.duration}</p>
          </section>
          <p className="feedbackdetail-duration">{training?.details}</p>

          <section className="training-details-footer">
            {training?.is_completed === 0 ? (
              <button type="button" className="card-button-validate">
                Valider
              </button>
            ) : (
              <p>Feeback enregistré</p>
            )}
            <button type="button" className="card-button-validate">
              Revenir au journal
            </button>
          </section>
        </motion.div>
      </section>
      <PopUp
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        id={parseInt(id, 10)}
        training={training}
      />
      {validation && (
        <Validation
          handleClose={handleCloseValidation}
          handleDeleteItem={handleDeleteTraining}
        />
      )}
      <Toaster />
      <SideBar />
    </>
  );
}

export default TrainingDetails;
