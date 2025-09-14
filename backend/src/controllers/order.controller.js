const { orderService } = require("../services/order.service.js");

const getAllController = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOne(Number(id));
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch order" });
  }
};

const searchOrderController = async (req, res) => {
  try {
    const { email, phone, orderId } = req.query;

    if (!orderId && (!email || !phone)) {
      return res.status(400).json({
        error: "Provide orderId OR both email and phone.",
      });
    }

    const orders = await orderService.searchOrder(email, phone, orderId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Cannot find orders" });
  }
};
const createOrder = async (req, res) => {
  try {
    const { name, email, phone, address, items, price, timezone } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !items ||
      items.length === 0 ||
      !price
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const order = await orderService.createOrder({
      name,
      email,
      phone,
      price,
      address,
      items,
      timezone,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const orderController = {
  createOrder,
  getAllController,
  getOneController,
  searchOrderController,
};

module.exports = {
  orderController,
};
