const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const trainings = await tables.training.readAll();
    res.status(200).json(trainings);
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  try {
    const training = await tables.training.readOne(req.params.id);
    if (training == null) {
      res.sendStatus(404);
    } else {
      res.json(training);
    }
  } catch (err) {
    next(err);
  }
};

const readDay = async (req, res, next) => {
  try {
    const todaysTrainings = await tables.training.readOneDay(
      req.auth.id,
      req.params.day
    );
    if (todaysTrainings == null) {
      res.sendStatus(404);
    } else {
      res.json(todaysTrainings);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { title, date, duration, details } = req.body;
    const newTraining = await tables.training.create(
      title,
      date,
      duration,
      details,
      req.body.time_of_day,
      req.auth.id,
      req.body.sport_id
    );
    res.status(201).json(newTraining);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const editTraining = await tables.training.update(req.body, req.params.id);
    if (editTraining) {
      const findTraining = await tables.training.readOne(req.params.id);
      res.status(200).json(findTraining);
    } else {
      res
        .status(400)
        .json({ message: "votre entraînement n'a pas pu être édité" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.training.deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const intervalWeek = async (req, res, next) => {
  try {
    const interval = await tables.training.readInterval(req.body, req.auth.id);
    res.json(interval);
  } catch (error) {
    next(error);
  }
};

const totalGamification = async (req, res, next) => {
  try {
    const [result] = await tables.training.totalValidate(req.auth.id)
    if (result.total > 0){
      const data = result.total * 10
      res.status(200).json(data)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  readById,
  add,
  edit,
  destroy,
  readDay,
  intervalWeek,
  totalGamification
};
