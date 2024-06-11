const tables = require("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const trainings = await tables.training.readAll();
        res.status(200).json(trainings)
    } catch (err) {
        next(err)
    }
}

const read = async (req, res, next) => {
    try {
      const todaysTrainings = await tables.training.readByDay(req.params.id);
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

  module.exports = {
    browse,
    read
  }