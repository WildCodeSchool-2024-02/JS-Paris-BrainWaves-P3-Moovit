const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const trainingRouter = require("./training/router");

router.use("/trainings", trainingRouter);

/* ************************************************************************* */

module.exports = router;
