const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  readById,
  add,
  edit,
  destroy,
} = require("../../../controllers/userActions");
const {login, refresh, logout } = require("../../../controllers/authActions")
const { hashPassword } = require("../../../services/hashPassword");
const { schema, validateSchema } = require("../../../services/validateData");

// Route to get a list of users
router.get("/", browse);
router.get("/:id", readById);

// Route to add a new user
router.post("/", validateSchema(schema), hashPassword, add);
router.post('/login', login)

router.put("/:id", edit);

router.delete("/:id", destroy);

router.get("/refresh/page", refresh);

router.get("/auth/logout", logout)



/* ************************************************************************* */

module.exports = router;
