const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize
const Food = require('./food'); // Import Food model if not already imported

class Order extends Model {}

Order.init({
  orderID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT, // Adjust the data type as needed
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
  },
  paidThrough: {
    type: DataTypes.STRING,
  },
  paymentResponse: {
    type: DataTypes.STRING,
  },
  orderStatus: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Order',
});

Order.belongsToMany(Food, { through: 'OrderItem' });
Food.belongsToMany(Order, { through: 'OrderItem' });

module.exports = Order;
