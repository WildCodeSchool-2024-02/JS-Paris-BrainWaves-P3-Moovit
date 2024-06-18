const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {browse, readById, add, edit, destroy} = require('../../../controllers/templateActions')

router.get("/", browse);
router.get("/:id", readById);
router.post("/", add)

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;