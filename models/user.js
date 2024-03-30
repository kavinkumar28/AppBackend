const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize
const Food = require('./food'); // Import Food model if not already imported
const Order = require('./order'); // Import Order model if not already imported

class User extends Model {
  addToCart(foodItem) {
    return new Promise((resolve, reject) => {
      const existingCartItem = this.cart.find(cartItem => cartItem.foodId === foodItem.id);
      const newQty = existingCartItem ? existingCartItem.qty + 1 : 1;

      if (existingCartItem) {
        existingCartItem.qty = newQty;
      } else {
        this.cart.push({ foodId: foodItem.id, qty: newQty });
      }

      this.save()
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  editCart(foodItem, newQty) {
    return new Promise((resolve, reject) => {
      if (newQty < 1) {
        this.cart = this.cart.filter(cartItem => cartItem.foodId !== foodItem.id);
        this.save()
          .then(() => resolve())
          .catch(err => reject(err));
      } else {
        const existingCartItem = this.cart.find(cartItem => cartItem.foodId === foodItem.id);
        if (existingCartItem) {
          existingCartItem.qty = newQty;
          this.save()
            .then(() => resolve())
            .catch(err => reject(err));
        } else {
          reject(new Error('Food item not found in cart.'));
        }
      }
    });
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
}, {
  sequelize,
  modelName: 'User',
});

// Define association with Food and Order models
User.belongsToMany(Food, { through: 'Cart', foreignKey: 'userId' });
Food.belongsToMany(User, { through: 'Cart', foreignKey: 'foodId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = User;
