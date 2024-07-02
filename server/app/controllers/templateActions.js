const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const templates = await tables.template.readAll();
    res.status(200).json(templates);
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  try {
    const [template] = await tables.template.readTemplate(req.params.id);
    if (template == null) {
      res.sendStatus(404);
    } else {
      res.json(template);
    }
  } catch (err) {
    next(err);
  }
};

const browseByUser = async (req, res, next) => {
  try {
    const template = await tables.template.readAllByUser(req.auth.id);
    res.status(200).json(template);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { title, duration, details } = req.body;
    const newTemplate = await tables.template.create(
      title,
      duration,
      details,
      req.auth.id,
      req.body.sport_id
    );
    res.status(201).json(newTemplate);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    await tables.template.update(req.body, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.template.deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browseByUser,
  readById,
  edit,
  add,
  destroy,
};
