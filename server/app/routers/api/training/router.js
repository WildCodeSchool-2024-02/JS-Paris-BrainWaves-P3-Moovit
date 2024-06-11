const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read } = require("../../../controllers/trainingActions");

// Route to get a list of items
router.get("/", browse);

// Route to get all trainings by current day
router.get("/:id", read);

// Route to add a new item
// router.post("/", add);

/* ************************************************************************* */

module.exports = router;