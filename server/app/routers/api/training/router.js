const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  readById,
  add,
  edit,
  destroy,
  readDay,
  intervalWeek,
} = require("../../../controllers/trainingActions");
const { verifyToken } = require("../../../services/verifyToken");
const { validateSchema, training } = require("../../../services/validateData");

router.get("/", browse); // get all trainings for all users

// Authentification Wall 
router.use(verifyToken);

// get a training by id
router.get("/:id", readById);

// Route to get all trainings for a user at a giving date
router.get("/day/:day", readDay);

// Route to add a new training
router.post("/", validateSchema(training), add);

// Route to edit a training
router.put("/:id", validateSchema(training), edit);

// Route to delete a training
router.delete("/:id", destroy);

// Route to get all trainings for one given week
router.post("/interval", intervalWeek)

/* ************************************************************************* */

module.exports = router;
