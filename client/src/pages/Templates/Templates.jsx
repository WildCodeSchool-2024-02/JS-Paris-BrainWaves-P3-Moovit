import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CardTemplate from "../../components/CardTemplate/CardTemplate";
import PopUpTemplate from "../../components/PopUp/PopUpTemplate/PopUpTemplate";
import "./templates.css";

function Templates() {
  const templates = useLoaderData();

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
          <CardTemplate key={template.id} card={template} />
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
        training={templates[0]}
        id={templates[0].id}
      />
    </section>
  );
}

export default Templates;
