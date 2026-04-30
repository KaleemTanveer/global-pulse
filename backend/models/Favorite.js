const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Favorite = sequelize.define("Favorite", {
  countryCode: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = Favorite;