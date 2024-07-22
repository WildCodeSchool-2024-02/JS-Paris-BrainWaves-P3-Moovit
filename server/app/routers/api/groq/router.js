const express = require("express");
const { main } = require("../../../controllers/groq");

const router = express.Router();

router.post('/', main)

module.exports = router