const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const trainings = await tables.training.readAll();
        res.status(200).json(trainings)
    } catch (err) {
        next(err)
    }
}

const readById = async (req, res, next) => {
    try {
      const training = await tables.training.readOne(req.params.id);
      if (training == null) {
        res.sendStatus(404);
      } else {
        res.json(training);
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

const readToday = async (req, res, next) => {
    try {
      const todaysTrainings = await tables.training.readToday(req.params.id);
      if (todaysTrainings == null) {
        res.sendStatus(404);
      } else {
        res.json(todaysTrainings);
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

const add = async (req, res, next) => {
    try {
        const {title, date, duration, details} = req.body;
        const newTraining = await tables.training.create(
            title, date, duration, details, req.body.time_of_day, req.body.user_id, req.body.sport_id
        )
        res.status(201).json(newTraining)
    } catch(err) {
        next(err)
    }
}

const edit = async (req, res, next) => {
    try {
        await tables.training.update(req.body, req.params.id);
        res.sendStatus(204);
    } catch(err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        await tables.training.deleteOne(req.params.id)
        res.sendStatus(204)
    } catch(err) {
        next(err)
    }
}
 
  module.exports = {
    browse,
    readById,
    readToday,
    add,
    edit,
    destroy
  }