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
import { useUser } from "../../contexts/User/User";

export default function EditProfile({
  open,
  handleClose,
  userSports,
  setUpdate,
  update,
  newUser,
  error,
  setError,
}) {

  const {user, setUser} = useUser();

  const api = import.meta.env.VITE_API_URL;
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
  }, [update]);

  // Listening to activeSport to fill dataSports state
  const tabActive = Object.entries(activeSports);
  useEffect(() => {
    const selectedSports = [];
    tabActive.forEach((value) => {
      if (value[1] === true && value[0] !== "other") {
        const tab = sports.find((sport) => sport.name === value[0]);
        selectedSports.push(tab.id);
      }
    });
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
    setActiveLevel({
      none: false,
      moderate: false,
      pro: false,
    });
    setActiveSports({});
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
    if (newUser.level === 1) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        none: true,
      }));
    }
    if (newUser.level === 2) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        moderate: true,
      }));
    }
    if (newUser.level === 3) {
      setActiveLevel((prevActiveLevel) => ({
        ...prevActiveLevel,
        pro: true,
      }));
    }
  }, [open, update]);

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
          id: newUser.id,
          name: name.current.value,
        }),
      });
      if (!response.ok) {
        setError(true);
        return error;
      }
      setUser({...user, name: name.current.value})
    } catch (err) {
      setError(true);
      toast.error("Une erreur est survenue");
    }
    // Update sports fetch
    try {
      await fetch(`${api}/api/userhassport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newUser.id,
          sports: dataSports,
        }),
      });
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
    // Update level fetch
    try {
      const response = await fetch(`${api}/api/users/profile/level`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newUser.id,
          level: dataLevel,
        }),
      });
      if (response.ok) {
        setActiveLevel({
          none: false,
          moderate: false,
          pro: false,
        });
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
    handleClose();
    toast.success("Tes informations ont été mises à jour", {
      style: {
        background: "rgba(145, 225, 166)",
        color: "black",
      },
    });
    setUpdate((prev) => !prev);
    return error;
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
        <h1 className="edit-profile-title">Modification du profil</h1>
        <div className="edit-container">
          <div className="name-input-container">
            <p className="label-edit">Prénom</p>
            <input
              type="text"
              placeholder="Choisi le bon pseudo"
              defaultValue={newUser.name}
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
  newUser: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    name: PropTypes.string,
  }),
  setUpdate: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

EditProfile.defaultProps = {
  newUser: {
    id: undefined,
    level: 0,
    name: "",
  },
};
