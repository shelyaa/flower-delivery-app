const { flowerService } = require("../services/flower.service");

const getAllController = async (req, res) => {
  try {
    const shopId = req.query.shopId;
    const sort = req.query.sort;

    const flowers = await flowerService.getAll(shopId, sort);
    res.json(flowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};


const toggleFavoriteController = async (req, res) => {
  try {
    const id = req.params.id;
    const flower = await flowerService.toggleFavorite(id);
    res.json(flower);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

const flowerController = { getAllController, toggleFavoriteController };

module.exports = {
  flowerController,
};
