const argon = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const [[user]] = await tables.user.readByEmail(req.body.email);
    if (user === null) res.status(422).json("unknown user");
    const verify = await argon.verify(user.password, req.body.password);
    if (verify) {
      delete user.password;
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res.json({ id: user.id, details: user, token });
    } else res.status(422).json("wrong credentials");
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
