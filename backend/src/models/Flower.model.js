const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Flower = sequelize.define(
  "Flower",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING },
    shop_id: { type: DataTypes.INTEGER, allowNull: false },
    is_favorite: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "flowers",
    timestamps: false,
  }
);

module.exports = Flower;
