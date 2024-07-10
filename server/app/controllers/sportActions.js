const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.sport.readAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const readSports = async (req, res, next) => {
  try{
    const [sports] = await tables.sport.readOneWithSports(req.auth.id)
    if (!sports){
      return res.sendStatus(404)
    }
    return res.status(200).json(sports)
  } catch (err){
    return next(err)
  }
}


module.exports = { browse, readSports };
