const Shop = require("../models/Shop.model");

const getAll = async () => {
  const result = await Shop.findAll();

  return result;
};

const shopService = { getAll };

module.exports = {
  shopService,
};
