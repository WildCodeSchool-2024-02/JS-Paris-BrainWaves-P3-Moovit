import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CardTemplate from "../../components/CardTemplate/CardTemplate";
import PopUpTemplate from "../../components/PopUp/PopUpTemplate/PopUpTemplate";
import "./templates.css";

function Templates() {
  const templates = useLoaderData();
  const [currentTemplate, setCurrentTemplate] = useState(null)
    // Get template ID for edition
    const findCurrentTemplate = templates.find((template) => (template.id === currentTemplate))

  // Managing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="templates">
      <h1>Mes modèles</h1>
      {templates ? (
        templates.map((template) => (
          <CardTemplate key={template.id} card={template} setCurrentTemplate={setCurrentTemplate} handleOpen={handleOpen} />
        ))
      ) : (
        <p>Vous n'avez aucun modèle enregistré</p>
      )}
      <button type="button" className="journal-add-button" onClick={handleOpen}>
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
  );
}

export default Templates;
