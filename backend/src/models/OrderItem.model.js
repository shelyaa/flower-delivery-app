const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Order = require("./Order.model");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

module.exports = OrderItem;
