const { orderService } = require("../services/order.service.js");

const getAllController = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
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

const createOrder = async (req, res) => {
  try {
    const { name, email, phone, address, items, price } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !items ||
      items.length === 0 ||
      !price
    ) {
      return res.status(400).json({ error: "Всі поля обов’язкові" });
    }

    const order = await orderService.createOrder({
      name,
      email,
      phone,
      price,
      address,
      items,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const orderController = { createOrder, getAllController, getOneController };

module.exports = {
  orderController,
};
