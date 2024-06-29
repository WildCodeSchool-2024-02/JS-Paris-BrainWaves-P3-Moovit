import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CardTemplate from "../../components/CardTemplate/CardTemplate";
import PopUpTemplate from "../../components/PopUp/PopUpTemplate/PopUpTemplate";
import SideBar from "../../components/SideBar/SideBar";
import "./templates.css";
import { useUser } from "../../contexts/User/User";

function Templates() {
  const api = import.meta.env.VITE_API_URL;

  const [templates, setTemplates] = useState([]);
  const [statusTemplate, setStatusTemplate] = useState(false);
  const { user } = useUser();

  const [currentTemplate, setCurrentTemplate] = useState(null);
  // Get template ID for edition
  const findCurrentTemplate = templates.find(
    (template) => template.id === currentTemplate
  );

  // Managing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentTemplate(null);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetch(`${api}/api/templates/all`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, [api, open, statusTemplate]);

  return (
    <>
      <section className="templates">
        <h1>Mes modèles</h1>
        {templates ? (
          templates.map((template) => (
            <CardTemplate
              key={`template-${template.id}`}
              card={template}
              setCurrentTemplate={setCurrentTemplate}
              handleOpen={handleOpen}
              setStatusTemplate={setStatusTemplate}
            />
          ))
        ) : (
          <p>Vous n'avez aucun modèle enregistré</p>
        )}
        <button
          type="button"
          className="journal-add-button"
          onClick={handleOpen}
        >
          <p>Ajouter un modèle</p>
          <FaPlus />
        </button>
        <PopUpTemplate
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          id={currentTemplate}
          training={findCurrentTemplate}
        />
      </section>
      <SideBar />
    </>
  );
}

export default Templates;
