const { shopService } = require("../services/shop.service.js");

const getAllController = async (req, res) => {
  const shops = await shopService.getAll();

  res.json(shops);
};

const shopController = { getAllController };

module.exports = {
  shopController,
};
