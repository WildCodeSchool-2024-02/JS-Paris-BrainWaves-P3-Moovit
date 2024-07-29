const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (!authorization) throw new Error("authorization key is missing");

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      throw new Error("authorization type should be 'Bearer'");
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.auth = decoded;
    next();
  } catch (error) {
    res.sendStatus(401)
  }
};

module.exports = { verifyToken };
