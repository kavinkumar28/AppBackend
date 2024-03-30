const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

/**
 * PRIVATE ROUTES [Authorization required]
 */
router.post("/add-restaurant", adminController.addRestaurant);

router.post("/add-food/:id", adminController.addFood);

router.get("/view-restaurants", adminController.viewAllRestaurant);

// Assuming you have a middleware for handling invalid endpoints
router.use((req, res, next) => {
  const error = new Error("Invalid endpoint");
  error.statusCode = 404;
  next(error);
});

module.exports = router;
