const express = require("express");
const { add } = require("../../../controllers/userHasSport");

const router = express.Router();

router.post('/', add)

module.exports = router


