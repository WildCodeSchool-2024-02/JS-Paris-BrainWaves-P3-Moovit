const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, readByType } = require("../../../controllers/tipsActions");

// Route to get a list of items
router.get("/", browse);
router.get("/:type", readByType);

/* ************************************************************************* */

module.exports = router;