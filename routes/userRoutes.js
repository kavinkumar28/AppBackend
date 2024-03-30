const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const auth = require("../middlewares/userAuth");

// SIGNUP
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email ID")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Your password should be at least 6 characters long"),
  ],
  userController.onSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email ID")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Please Enter a Valid Password!"),
  ],
  userController.onLogin
);

router.put("/cart/:id/:qty", auth, userController.editCart);

router.post("/cart/:id", auth, userController.addToCart);

router.get("/cart", auth, userController.getCart);

router.get("/order", auth, userController.getOrder);

router.get("/order/:id", auth, userController.getSelectedOrder);

router.post("/add-order", auth, userController.addOrder);

router.get("/profile", auth, userController.viewProfile);

router.post("/address", auth, userController.editAddress);

module.exports = router;
