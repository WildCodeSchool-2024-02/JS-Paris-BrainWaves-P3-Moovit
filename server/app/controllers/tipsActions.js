const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const tips = await tables.tip.readAll();
    res.status(200).json(tips);
  } catch (err) {
    next(err);
  }
};

const readByType = async (req, res, next) => {
  try {
    const [tips] = await tables.tip.readType(req.params.type);
    res.status(200).json(tips);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  readByType,
};
