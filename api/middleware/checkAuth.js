const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, config.getJWTToken());
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Auth failed",
      status: 403,
    });
  }
};
