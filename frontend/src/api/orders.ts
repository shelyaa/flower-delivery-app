import type { NewOrder } from "../types/Order";

const API_BASE = import.meta.env.VITE_API_BASE;

export const createOrder = async (order: NewOrder) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Error receiving products");
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Error receiving orders");
  return res.json();
};

export const fetchOrderById = async (orderId: number) => {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) throw new Error("Error receiving order");
  return res.json();
};

export const searchOrder = async (
  orderId?: number,
  email?: string,
  phone?: string
) => {
  const params = new URLSearchParams();

  if (orderId) params.append("orderId", String(orderId));
  if (email) params.append("email", email);
  if (phone) params.append("phone", phone);

  const res = await fetch(`${API_BASE}/orders/search?${params.toString()}`);

  if (!res.ok) throw new Error("Error receiving stores");

  return res.json();
};
