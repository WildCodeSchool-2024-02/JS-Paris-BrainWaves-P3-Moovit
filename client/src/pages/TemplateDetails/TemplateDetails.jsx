import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp/PopUpTraining/PopUp";
import CardMenu from "../../components/CardMenu/CardMenu";
import DarkMode from "../../components/DarkMode/DarkMode";
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
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login')
    fetch(`${api}/api/templates/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTraining(data));
  }, []);

  return (
    <>
      <DarkMode />
      <section className="trainingCard">
        <section className="trainingCard-title">
          <h1>{training?.title}</h1>
          <CardMenu handleOpen={handleOpen} id={id} />
        </section>
        <section className="card-type-training">
          <p>Entraînement</p>
          <p>{training?.sport}</p>
        </section>
        <section className="card-time-training">
          <p>{training?.duration}</p>
        </section>
        <p>{training?.details}</p>

        <section className="trainingCard-title">
          <Link to="/templates">Revenir aux modèles</Link>
        </section>
      </section>
      <PopUp
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        id={id}
        training={training}
      />
    </>
  );
}

export default TemplateDetails;
