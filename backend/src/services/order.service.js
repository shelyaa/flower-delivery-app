const Order = require("../models/Order.model.js");
const OrderItem = require("../models/OrderItem.model.js");
const sequelize = require("../db");

const getAll = async () => {
  const result = await Order.findAll({
    include: [{ model: OrderItem }],
    order: [["created_at", "DESC"]],
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

const searchOrder = async (email, phone, orderId) => {
  let where = {};

  if (orderId) {
    const orderIdNumber = Number(orderId);
    if (isNaN(orderIdNumber)) {
      throw new Error("Invalid orderId");
    }
    where.id = orderIdNumber;
  } else if (email && phone) {
    where = { email, phone };
  } else {
    throw new Error("Invalid search parameters");
  }

  const orders = await Order.findAll({
    where,
    include: [{ model: OrderItem, as: "OrderItems" }],
  });

  if (!orders || orders.length === 0) throw new Error("Orders not found");

  return orders;
};

const createOrder = async ({
  name,
  email,
  phone,
  address,
  items,
  price,
  timezone,
}) => {
  const transaction = await sequelize.transaction();

  try {
    const order = await Order.create(
      { name, email, phone, address, price, timezone },
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

const orderService = { createOrder, getAll, getOne, searchOrder };

module.exports = {
  orderService,
};
