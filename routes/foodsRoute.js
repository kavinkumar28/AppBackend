const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

/**
 * PUBLIC ROUTES
 */
router.get("/in-30-min", foodController.getInThirtyMinutes);

router.get("/:id", foodController.getFoodDetails);

router.get("/top/restaurants", foodController.getTopRestaurants);

router.get("/restaurant/:id", foodController.getAllFoodsFromRestaurant);

router.get("/", foodController.getAvailableFoods);

// Assuming you have a middleware for handling invalid endpoints
router.use((req, res, next) => {
  const error = new Error("Invalid endpoint");
  error.statusCode = 404;
  next(error);
});

module.exports = router;
