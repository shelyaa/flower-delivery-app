const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: process.env.PGPORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // дозволяє підключатись до Neon без сертифікату
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
