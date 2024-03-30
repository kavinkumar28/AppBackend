const jwt = require("jsonwebtoken");
const AppError = require("../controllers/errorController");
const { User } = require("../models");
const { APP_KEY } = require("../config/AppConst");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return AppError.unAuthorised();
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, APP_KEY, async (err, payload) => {
    if (err) {
      return AppError.onError(res, "Authorization verification failed!");
    }
    const { userId } = payload;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return AppError.onError(res, "User not found");
      }
      req.user = user;
      next();
    } catch (err) {
      return AppError.onError(res, "Error fetching user from database");
    }
  });
};
