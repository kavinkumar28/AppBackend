const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet"); // secure headers
const compression = require("compression"); // compress assets
const morgan = require("morgan"); // logging
const { MONGODB_URI } = require("./config/AppConst");

/**
 * Controllers
 */
const AppError = require("./controllers/errorController");

/**
 * Routes
 */
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodsRoute");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/**
 * Database Connection
 */
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'your_postgresql_host',
  username: 'your_postgresql_username',
  password: 'your_postgresql_password',
  database: 'your_postgresql_database',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

/**
 * Middlewares
 */

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRoutes); // --- User Acccess
app.use("/food", foodRoutes); // -- Product Access
app.use("/admin", adminRoutes); // --- Admin Access
app.use(AppError.unAuthorised); // -- Error Handler

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  res.status(status).json({ data: data });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
