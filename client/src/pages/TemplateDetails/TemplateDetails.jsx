/* eslint-disable import/no-unresolved */
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdFitness } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { toast, Toaster } from "sonner";
import PopUpTemplate from "../../components/PopUp/PopUpTemplate/PopUpTemplate";
import CardMenu from "../../components/CardMenu/CardMenu";
import SideBar from "../../components/SideBar/SideBar";
import Validation from "../../components/Validation/Validation";
import "./templateDetails.css";
import { useUser } from "../../contexts/User/User";

function TemplateDetails() {
  const api = import.meta.env.VITE_API_URL;
  const [training, setTraining] = useState(null);
  const { id } = useParams();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetch(`${api}/api/templates/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTraining(data));
  }, [training]);

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

  // Delete template if yes is clicked
  const handleDeleteTemplate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/templates/${training.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Modèle supprimé avec succès", {
          style: {
            background: "rgba(145, 225, 166, 0.8)",
            color: "black",
          },
        });
      } else {
        toast.error(
          "Une erreur est survenue, le modèle n'a pas pu être supprimé"
        );
      }
      handleCloseValidation();
      navigate("/templates");
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

  return (
    <>
      <section className="template-details-page">
        <motion.div
          className="template-details-container"
          variants={variants}
          animate="open"
          initial="closed"
        >
          <section className="trainingCard-title">
            <h1 className="templatedetail-title">{training?.title}</h1>
            <CardMenu
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              id={id}
            />
          </section>
          <section className="card-type-training">
            <IoMdFitness className="templatedetail-logo-type" />
            <p>
              Entraînement |
              {training?.name
                ? training.name.charAt(0).toUpperCase() + training.name.slice(1)
                : null}
            </p>
          </section>
          <section className="feedbackdetail-duration-container">
            <CiClock2 className="templatedetail-logo-type" />
            <p>{training?.duration}</p>
          </section>
          <h2 className="feedback-training-details">
            Détails de l'entraînement
          </h2>
          <p>{training?.details}</p>

          <section className="trainingCard-title">
            <button
              type="button"
              className="template-details-button"
              onClick={() => navigate("/templates")}
            >
              Revenir aux modèles
            </button>
          </section>
        </motion.div>
        <PopUpTemplate
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          id={id}
          training={training}
        />
        <Toaster />
        <SideBar />
      </section>
      {validation && (
        <Validation
          handleClose={handleCloseValidation}
          handleDeleteItem={handleDeleteTemplate}
          message="Es-tu sûr de vouloir supprimer ce modèle ?"
        />
      )}
    </>
  );
}

export default TemplateDetails;
