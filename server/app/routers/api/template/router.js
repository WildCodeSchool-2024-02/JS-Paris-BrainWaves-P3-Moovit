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

router.get("/", browse);
router.get("/:id", readById);
router.get("/:id/all", browseByUser);
router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
