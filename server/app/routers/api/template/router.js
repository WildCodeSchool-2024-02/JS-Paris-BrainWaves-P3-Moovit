const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  browse,
  browseByUser,
  readById,
  add,
  edit,
  destroy,
} = require("../../../controllers/templateActions");
const { verifyToken } = require("../../../services/verifyToken");
const { validateSchema, template } = require("../../../services/validateData");

router.get("/", browse);

// Authentification Wall 
router.use(verifyToken);

router.get("/all", browseByUser);
router.get("/detail/:id", readById);

router.post("/", validateSchema(template), add);

router.put("/:id", validateSchema(template), edit);

router.delete("/:id", destroy);

module.exports = router;
