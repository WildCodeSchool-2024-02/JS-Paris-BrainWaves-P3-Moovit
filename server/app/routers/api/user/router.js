const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, readById, add, edit, destroy } = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", browse);
router.get("/:id", readById);

// Route to add a new user
router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;