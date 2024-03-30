const { Restaurant, Food } = require('../models'); 
const { ValidationError } = require('sequelize');
const sequelize = require('../config/sequelize'); 

exports.addRestaurant = async (req, res, next) => {
  const { name, foodType, pincode, address, phone } = req.body;

  try {
    const restaurant = await Restaurant.create({
      name,
      foodType,
      pincode,
      address,
      phone,
    });

    return res.json(restaurant);
  } catch (err) {
    if (err instanceof ValidationError) {
      // Handle validation errors
      return res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

exports.viewAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

exports.addFood = async (req, res, next) => {
  const restaurantId = req.params.id;
  const { name, description, category, price, readyTime } = req.body;

  let transaction;
  try {
    transaction = await sequelize.transaction();

    const restaurant = await Restaurant.findByPk(restaurantId, { transaction });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const food = await Food.create({
      name,
      description,
      category,
      rating: 0,
      price,
      images: [], 
      readyTime,
    }, { transaction });

    await restaurant.addFood(food, { transaction });

    await transaction.commit();

    return res.status(200).json(food);
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};
