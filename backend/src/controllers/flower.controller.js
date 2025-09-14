const { flowerService } = require("../services/flower.service");

const getAllController = async (req, res) => {
  try {
    const shopId = req.query.shopId;
    const sort = req.query.sort;
    const { limit = 12, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const flowers = await flowerService.getAll(
      { limit: Number(limit), offset },
      shopId,
      sort
    );
    res.json(flowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const toggleFavoriteController = async (req, res) => {
  try {
    const id = req.params.id;
    const flower = await flowerService.toggleFavorite(id);
    res.json(flower);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const flowerController = { getAllController, toggleFavoriteController };

module.exports = {
  flowerController,
};
