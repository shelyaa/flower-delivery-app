const Flower = require("../models/Flower.model.js");

const getAll = async (shopId, sortOrder = "ASC") => {
  const where = shopId ? { shop_id: shopId } : {};
  return await Flower.findAll({
    where,
    order: [
      ["is_favorite", "DESC"],
      ["price", sortOrder],
    ],
  });
};

const toggleFavorite = async (id) => {
  const flower = await Flower.findByPk(id);
  if (!flower) throw new Error("Flower not found");

  flower.is_favorite = !flower.is_favorite;
  await flower.save();
  return flower;

};

const flowerService = { getAll, toggleFavorite };

module.exports = {
  flowerService,
};
