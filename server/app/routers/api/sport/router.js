const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse } = require("../../../controllers/sportActions");

// Route to get a list of users
router.get("/", browse);

/* ************************************************************************* */

module.exports = router;
