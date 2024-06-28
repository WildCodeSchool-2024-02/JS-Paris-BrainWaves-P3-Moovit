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

router.get("/", browse);

// Authentification Wall 
router.use(verifyToken);

router.get("/all", browseByUser);

router.get("/detail/:id", readById);

router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
