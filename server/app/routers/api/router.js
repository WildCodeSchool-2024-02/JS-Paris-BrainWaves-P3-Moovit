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

const templateRouter = require("./template/router");

router.use("/templates", templateRouter);

const feedbackRouter = require("./feedback/router");

router.use("/feedbacks", feedbackRouter);

const sportRouter = require("./sport/router");

router.use("/sports", sportRouter);

const userHasSport = require("./userHasSport/router");

router.use("/userhassport", userHasSport)

const groqRouter = require("./groq/router")

router.use('/groq', groqRouter)

/* ************************************************************************* */

module.exports = router;
