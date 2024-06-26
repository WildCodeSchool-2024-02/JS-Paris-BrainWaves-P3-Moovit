const argon = require("argon2");

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon.hash(req.body.password);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword };
