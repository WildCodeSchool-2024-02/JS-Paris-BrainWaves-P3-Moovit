import { Modal } from "@mui/material";
import PropTypes from 'prop-types';
import "./privacy.css";

function PrivacyPolicy({ open, handleClose }) {
  
    return (
      <Modal open={open} onClose={handleClose}>
        <section className="privacy-main">

      <h1>Politique de Confidentialité</h1>

      <h2>Introduction</h2>
      <p>
        Bienvenue sur Moov'it. Nous nous engageons à protéger et à respecter
        votre vie privée. Cette politique de confidentialité explique comment
        nous recueillons, utilisons, divulguons et protégeons vos informations.
      </p>

      <h2>Informations que nous recueillons</h2>
      <p>Nous recueillons les types d'informations suivants :</p>
      <ul>
        <li>
          <strong>Informations personnelles :</strong> nom, adresse e-mail, âge,
          sexe.
        </li>
        <li>
          <strong>Informations de l'application :</strong> données d'activité
          physique, préférences d'entraînement, progrès.
        </li>
        <li>
          <strong>Données techniques :</strong> type d'appareil, système
          d'exploitation, adresse IP.
        </li>
      </ul>

      <h2>Utilisation des informations</h2>
      <p>Nous utilisons vos informations pour :</p>
      <ul>
        <li>Personnaliser votre expérience d'entraînement.</li>
        <li>Améliorer et développer les fonctionnalités de l'application.</li>
        <li>
          Communiquer avec vous concernant les mises à jour et les offres
          promotionnelles.
        </li>
        <li>
          Analyser l'utilisation de l'application pour mieux comprendre les
          préférences des utilisateurs.
        </li>
      </ul>

      <h2>Partage des informations</h2>
      <p>
        Nous ne partageons pas vos informations personnelles avec des tiers,
        sauf dans les cas suivants :
      </p>
      <ul>
        <li>Avec votre consentement explicite.</li>
        <li>Pour se conformer à des obligations légales.</li>
        <li>Pour protéger nos droits et notre propriété.</li>
      </ul>

      <h2>Sécurité des données</h2>
      <p>
        Nous mettons en œuvre des mesures de sécurité appropriées pour protéger
        vos informations contre l'accès non autorisé, la modification, la
        divulgation ou la destruction. Cependant, veuillez noter qu'aucune
        méthode de transmission sur Internet ou de stockage électronique n'est
        totalement sécurisée.
      </p>

      <h2>Vos droits</h2>
      <p>Vous avez le droit de :</p>
      <ul>
        <li>Accéder à vos informations personnelles.</li>
        <li>
          Demander la correction de vos informations personnelles si elles sont
          inexactes.
        </li>
        <li>Demander la suppression de vos informations personnelles.</li>
        <li>
          Retirer votre consentement au traitement de vos informations
          personnelles.
        </li>
      </ul>

      <h2>Modifications de cette politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique de confidentialité de temps
        en temps. Toute modification sera affichée sur cette page, et nous vous
        en informerons par e-mail ou via l'application.
      </p>

      <h2>Contact</h2>
      <p>
        Si vous avez des questions ou des préoccupations concernant cette
        politique de confidentialité, veuillez nous contacter à privacy@moovit.fr.
      </p>
      <button type='button' onClick={handleClose}>J'ai compris !</button>
    </section>
      </Modal>

  );
}

export default PrivacyPolicy;

PrivacyPolicy.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}