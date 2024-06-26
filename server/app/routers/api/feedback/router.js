const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  add,
  browse,
  destroy,
  edit,
  readFeedbackDay,
} = require("../../../controllers/feedbackActions");

// Route to get a list of feedbacks
router.get("/", browse);

// Route to get all feedbacks for a given day
router.get("/:day", readFeedbackDay);

// Route to add a new feedback
router.post("/", add);

// Route to delete a feedback
router.delete("/:id/:training", destroy);

// Route to edit a feedback
router.put("/:id", edit);

/* ************************************************************************* */

module.exports = router;
