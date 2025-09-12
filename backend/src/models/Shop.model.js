const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'shops',
  timestamps: false, 
});

module.exports = Shop;
