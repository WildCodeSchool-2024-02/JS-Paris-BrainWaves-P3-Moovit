const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const trainingRouter = require("./training/router");

router.use("/trainings", trainingRouter);

const tipRouter = require("./tips/router");

router.use("/tips", tipRouter);

const userRouter = require("./user/router");

router.use("/users", userRouter);

const feedbackRouter = require("./feedback/router");

router.use("/feedbacks", feedbackRouter);

/* ************************************************************************* */

module.exports = router;
