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
    const [user] = await tables.user.readOne(req.params.id);
    delete user.password
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
    const [user] = await tables.user.readOne(newUser);
    delete user.password
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    await tables.user.update(req.body.name, req.body.id);
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

const nameUpdate = async (req, res, next) => {
  try {
    const response = await tables.user.insertName(req.body.name, req.body.id)
    if (response){
      res.sendStatus(204)
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
  nameUpdate,
};
