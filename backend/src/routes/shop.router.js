const { Router } = require("express");

const { shopController } = require("../controllers/shop.controller");

const shopRouter = Router();

shopRouter.get("/", shopController.getAllController);

module.exports = shopRouter;
