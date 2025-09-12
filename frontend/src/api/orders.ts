import type { NewOrder } from "../types/Order";

const API_BASE = "http://localhost:5000";

export const createOrder = async (order: NewOrder) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Помилка при отриманні квітів");
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Помилка при отриманні замовлень");
  return res.json();
};

export const fetchOrderById = async (orderId: number) => {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) throw new Error("Помилка при отриманні замовлення");
  return res.json();
};
