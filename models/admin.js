const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize

const Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
