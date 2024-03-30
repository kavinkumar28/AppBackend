const { Food, Restaurant } = require('../models');
const { Op } = require('sequelize');

const ITEM_PER_PAGE = 50;

exports.getAvailableFoods = async (req, res, next) => {
  const page = +req.query.page || 1;

  try {
    const { count, rows: foods } = await Food.findAndCountAll({
      offset: (page - 1) * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
    });

    return res.status(200).json({ totalFoods: count, foods });
  } catch (err) {
    next(err);
  }
};

exports.getTopRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: Food }],
      limit: 10,
      order: [['rating', 'DESC']],
    });

    return res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

exports.getAllFoodsFromRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findByPk(restaurantId, {
      include: [{ model: Food }],
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    return res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

exports.getFoodDetails = async (req, res, next) => {
  const foodId = req.params.id;

  try {
    const food = await Food.findByPk(foodId);

    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    return res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};

exports.getInThirtyMinutes = async (req, res, next) => {
  const page = +req.query.page || 1;

  try {
    const { count, rows: foods } = await Food.findAndCountAll({
      where: { readyTime: { [Op.lt]: 31 } },
      offset: (page - 1) * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
    });

    return res.status(200).json({ totalFoods: count, foods });
  } catch (err) {
    next(err);
  }
};
