const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, readSports } = require("../../../controllers/sportActions");
const { verifyToken } = require("../../../services/verifyToken");

// Route to get a list of users
router.get("/", browse);

router.get("/profile", verifyToken, readSports)

/* ************************************************************************* */

module.exports = router;
