/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import "./editprofile.css";
import { useContext, useEffect, useRef, useState } from "react";
import Sports from "../Sports/Sports";
import Level from "../Level/Level";
import DarkModeContext from "../../services/DarkModeContext";
import CancelButton from "../CancelButton/CancelButton";

export default function EditProfile({ open, handleClose, userSports, user }) {
  const api = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(false);
  const { sports } = useOutletContext();
  const { mode } = useContext(DarkModeContext);
  const name = useRef();

  // State to track active sports
  const [activeSports, setActiveSports] = useState({});

  const mapSport = (sportList) => {
    const newSport = { other: false };
    sportList.forEach((sp) => {
      const insert = sp.name;
      newSport[insert] = false;
    });
    setActiveSports(newSport);
  };

  // State to track active level
  const [activeLevel, setActiveLevel] = useState({
    none: false,
    moderate: false,
    pro: false,
  });

  // Data that will be send to the back end
  const [dataSports, setDataSports] = useState([]);
  const [dataLevel, setDataLevel] = useState([]);

  useEffect(() => {
    mapSport(sports);
  }, []);

  // Listening to activeSport to fill dataSports state
  useEffect(() => {
    const selectedSports = [];
    if (activeSports.fitness === true) {
      const tab = sports.find((sport) => sport.name === "fitness");
      selectedSports.push(tab.id);
    }
    if (activeSports.running === true) {
      const tab = sports.find((sport) => sport.name === "running");
      selectedSports.push(tab.id);
    }
    if (activeSports.poney === true) {
      const tab = sports.find((sport) => sport.name === "poney");
      selectedSports.push(tab.id);
    }
    setDataSports(selectedSports);
  }, [activeSports]);

  // Listening to activeLevel to fill dataLevel state
  useEffect(() => {
    if (activeLevel.none) {
      setDataLevel(1);
    }
    if (activeLevel.moderate) {
      setDataLevel(2);
    }
    if (activeLevel.pro) {
      setDataLevel(3);
    }
  }, [activeLevel]);

  // Display the sports and the level of the user when he click on update
  useEffect(() => {
    if (userSports) {
      userSports.forEach((userSport) => {
        const value = userSport.name;
        setActiveSports((prevActiveButtons) => ({
          ...prevActiveButtons,
          [value]: !prevActiveButtons[value],
          other: false,
        }));
      });
    }
    if (user.level === 1) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        none: true,
      }));
    }
    if (user.level === 2) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        moderate: true,
      }));
    }
    if (user.level === 3) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        pro: true,
      }));
    }
  }, [open]);

  const [isName, setIsName] = useState(false);
  const [isSport, setIsSport] = useState(false);
  const [isLevel, setIsLevel] = useState(false);
  // Async function to edit name
  const handleEdit = async () => {
    // Update name fetch
    try {
      const response = await fetch(`${api}/api/users/profile/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: name.current.value,
        }),
      });
      if (response.ok) {
        setIsName(true);
        toast.success("Ton nom a bien été modifié");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
    }
    // Update sports fetch
    try {
      const response = await fetch(`${api}/api/userhassport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          sports: dataSports,
        }),
      });
      if (response.ok) {
        setIsSport(true);
        toast.success("Tes sports ont bien été mis à jour");
      }
    } catch (err) {
      console.error(err);
    }
    // Update level fetch
    try {
      const response = await fetch(`${api}/api/users/profile/level`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          level: dataLevel,
        }),
      });
      if (response.ok) {
        setIsLevel(true);
        toast.success("Ton niveau a été mis à jour");
      }
    } catch (err) {
      console.error(err);
    }
    if (isLevel && isName && isSport) {
      handleClose();
    }
  };

  // Variants for animation modal
  const variants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      x: "100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <motion.section
        className={`edit-profile-popup-${mode}`}
        variants={variants}
        animate={open ? "open" : "closed"}
        initial="closed"
        exit="exit"
      >
        <h1>Modification du profil</h1>
        <div className="edit-container">
          <div className="name-input-container">
            <p className="label-edit">Prénom</p>
            <input
              type="text"
              placeholder="Choisi le bon pseudo"
              className={error ? "input-error" : ""}
              ref={name}
            />
            {error ? (
              <p className="error-message">Veuillez renseigner un prénom</p>
            ) : null}
          </div>
          <div className="name-input-container">
            <p className="label-edit">Sports</p>
            <Sports
              activeButtons={activeSports}
              setActiveButtons={setActiveSports}
              sports={sports}
            />
          </div>
          <div className="name-input-container">
            <p className="label-edit">Niveau</p>
            <Level
              activeButtons={activeLevel}
              setActiveButtons={setActiveLevel}
            />
          </div>
        </div>
        <div className="button-edit-container">
          <button
            type="button"
            className="validate-button"
            onClick={handleEdit}
          >
            Modifier le profil
          </button>
          <CancelButton onClick={handleClose} />
        </div>
      </motion.section>
    </Modal>
  );
}

EditProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userSports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    level: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
