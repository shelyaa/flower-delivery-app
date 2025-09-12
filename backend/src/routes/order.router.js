const { Router } = require("express");
const { orderController } = require("../controllers/order.controller.js");


const orderRouter = Router();

orderRouter.get("/", orderController.getAllController);
orderRouter.get("/:id", orderController.getOneController);
orderRouter.post("/", orderController.createOrder);

module.exports = orderRouter;
