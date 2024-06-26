const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  readById,
  readToday,
  add,
  edit,
  destroy,
  readDay,
} = require("../../../controllers/trainingActions");
const { verifyToken } = require("../../../services/verifyToken");

// Route to get a list of items
router.get("/", browse);
router.get("/:id", readById);

// Route to get all trainings for a user by current day
router.get("/today/:id", readToday);

// Route to get all trainings for a user at a giving date
router.get("/day/:day", verifyToken, readDay);

// Route to add a new item
router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
