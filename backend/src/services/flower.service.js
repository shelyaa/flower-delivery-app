const Flower = require("../models/Flower.model.js");

const getAll = async ({ limit, offset }, shopId, sortOrder = "ASC") => {
  const where = shopId ? { shop_id: shopId } : {};
  const { count, rows } = await Flower.findAndCountAll({
    where,
    limit,
    offset,
    order: [
      ["is_favorite", "DESC"],
      ["price", sortOrder],
    ],
  });

  return {
    items: rows,
    totalPages: Math.ceil(count / limit),
  };
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
