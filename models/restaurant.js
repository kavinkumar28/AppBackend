const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize
const Food = require('./food'); // Import Food model if not already imported

class Restaurant extends Model {}

Restaurant.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foodType: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.FLOAT, // Adjust the data type as needed
  },
  lng: {
    type: DataTypes.FLOAT, // Adjust the data type as needed
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT, // Adjust the data type as needed
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
}, {
  sequelize,
  modelName: 'Restaurant',
});

// Define association with Food model
Restaurant.hasMany(Food, { foreignKey: 'restaurantId' });
Food.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Restaurant;
