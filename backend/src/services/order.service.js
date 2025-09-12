const Order = require("../models/Order.model.js");
const OrderItem = require("../models/OrderItem.model.js");
const sequelize = require("../db");

const getAll = async () => {
  const result = await Order.findAll({
    include: [{ model: OrderItem }],
    order: [['created_at', "DESC"]]
  });

  return result;
};

const getOne = async (orderId) => {
  const order = await Order.findOne({
    where: { id: orderId },
    include: [{ model: OrderItem, as: "OrderItems" }],
  });

  if (!order) throw new Error("Order not found");

  return order;
};
const createOrder = async ({ name, email, phone, address, items, price }) => {
  const transaction = await sequelize.transaction();

  try {
    const order = await Order.create(
      { name, email, phone, address, price },
      { transaction }
    );

    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create(
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            image_url: item.image_url,
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    return {
      order_id: order.id,
      message: "Order created successfully",
      items: orderItems,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const orderService = { createOrder, getAll, getOne };

module.exports = {
  orderService,
};
