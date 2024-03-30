const jwt = require("jsonwebtoken");
const { APP_KEY } = require("../config/AppConst");

module.exports = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) {
    const err = new Error("Authorization error");
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, APP_KEY);
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }

  if (!decodedToken) {
    const err = new Error("Unable to authenticate");
    err.statusCode = 401;
    return next(err);
  }

  req.userId = decodedToken.userId;
  next();
};
