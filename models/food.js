const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize

class Food extends Model {}

Food.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  readyTime: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.FLOAT, // Assuming rating is a float value
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Assuming images is an array of strings
  },
}, {
  sequelize,
  modelName: 'Food',
});

module.exports = Food;
