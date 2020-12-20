"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Order = require("./Order");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relations

//Order has many Cookies
db.Order.belongsToMany(db.Cookie, {
  through: db.OrderItem,
  foreignKey: "orderId",
});

//Cookie has many Orders
db.Cookie.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "cookieId",
});

//User has many Orders
db.User.hasMany(db.Order, { as: "orders", foreignKey: "userId" });

//Order belongs to one User
db.Order.belongsTo(db.User, { as: "user" });

// User has one Bakery
db.User.hasOne(db.Bakery, {
  as: "bakery",
  foreignKey: "userId",
});

//Bakery belongs to one User
db.Bakery.belongsTo(db.User, {
  as: "user",
});

//Bakery has many Cookies
db.Bakery.hasMany(db.Cookie, {
  as: "cookies",
  foreignKey: { fieldName: "bakeryId", allowNull: false },
});

// Cookie belongs to Bakery
db.Cookie.belongsTo(db.Bakery, { as: "bakery" });

module.exports = db;
