const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { APP_KEY } = require("../config/AppConst");
const { User, Food, Order } = require("../models");

exports.onSignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = errors.array();
    return next(err);
  }

  const { email, password, firstName, lastName } = req.body;

  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      return User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        address: null,
        phone: null,
        lat: null,
        lng: null,
        cart: [],
        order: [],
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { userId: user.id.toString(), email: user.email },
        APP_KEY,
        { expiresIn: "90d" }
      );

      res.status(200).json(token);
    })
    .catch((err) => {
      next(err);
    });
};

exports.onLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 422;
    err.data = errors.array();
    return next(err);
  }

  const { email, password } = req.body;

  let loginUser;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        const err = new Error("User does not exist with the provided email ID");
        err.statusCode = 401;
        throw err;
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        const err = new Error("Password does not match!");
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { userId: loginUser.id.toString(), email: loginUser.email },
        APP_KEY,
        { expiresIn: "90d" }
      );

      res.status(200).json(token);
    })
    .catch((err) => {
      next(err);
    });
};

// Rest of the functions like getCart, addToCart, editCart, getOrder, etc., need to be similarly modified using Sequelize methods to interact with PostgreSQL.
