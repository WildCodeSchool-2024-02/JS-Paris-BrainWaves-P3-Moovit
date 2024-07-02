const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  try {
    const user = await tables.user.readOne(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { email, password, name, level } = req.body;
    const newUser = await tables.user.create(email, password, name, level);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    await tables.user.update(req.body, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  readById,
  add,
  edit,
  destroy,
};
