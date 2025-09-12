const { Router } = require("express");
const { flowerController } = require("../controllers/flower.controller");


const flowerRouter = Router();

flowerRouter.get("/", flowerController.getAllController);
flowerRouter.patch("/:id/favorite", flowerController.toggleFavoriteController);

module.exports = flowerRouter;
