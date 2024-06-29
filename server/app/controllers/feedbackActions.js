const tables = require("../../database/tables");

const browse = async ( req, res, next ) => {
  try {
    const feedbacks = await tables.feedback.readAll(req.query);
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};


const add = async (req, res, next) => {
  try {
    const newFeedback = await tables.feedback.create(req.body);
    if (newFeedback == null) {
      res.sendStatus(404).json({ Statut: "Ajout échoué" });
    } else {
      res.status(201).json({ Statut: "Ajout résussi" });
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await tables.feedback.update(req.body, req.params.id);
    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.feedback.deleteOne(req.params.id);
    await tables.feedback.changeStatus(req.params.training);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const readFeedbackDay = async (req, res, next) => {
  try {
    const feedbacks = await tables.feedback.readByDay(req.params.day);
    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  add,
  browse,
  edit,
  destroy,
  readFeedbackDay,
};
