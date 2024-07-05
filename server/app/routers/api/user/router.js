const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  add,
  edit,
  destroy,
  nameUpdate,
  levelUpdate,
} = require("../../../controllers/userActions");
const {login, refresh, logout } = require("../../../controllers/authActions")
const { hashPassword } = require("../../../services/hashPassword");
const { schema, validateSchema, nameSchema } = require("../../../services/validateData");

// Route to get a list of users
router.get("/", browse);

// Route to add a new user
router.post("/", validateSchema(schema), hashPassword, add);
router.post('/login', login)

router.put("/:id", edit);

router.delete("/:id", destroy);

router.get("/refresh/page", refresh);

router.get("/auth/logout", logout)

router.put("/profile/name", validateSchema(nameSchema), nameUpdate)
router.put("/profile/level", levelUpdate)

// Route to delete a training
router.delete("/:id", destroy);



/* ************************************************************************* */

module.exports = router;
