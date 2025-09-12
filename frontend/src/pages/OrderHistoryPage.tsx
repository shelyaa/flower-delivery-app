import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { fetchOrders } from "../api/orders";
import type { OrderItem as OrderItemType } from "../types/OrderItem";
import { OrderItem } from "../components/features/orders/OrderItem";

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError("Помилка при завантаженні замовлень");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>Замовлень ще немає</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg max-w-3xl m-auto">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight">
        Order Details
      </h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-sm rounded-2xl p-6 mb-8 transition hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <p className="text-lg font-bold">Order #{order.id}</p>
            <span className="text-sm text-gray-400">
              {new Date(order.created_at).toLocaleString("uk-UA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {order.OrderItems.map((item: OrderItemType) => (
              <OrderItem item={item} key={item.id} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-base">
            <p>
              <span className="font-semibold">Name</span> {order.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-semibold">Phone number:</span> {order.phone}
            </p>
            <p>
              <span className="font-semibold">Delivery Address:</span>{" "}
              {order.address}
            </p>
            <p>
              <span className="font-semibold">Total:</span>
              <span className="ml-1 font-bold">{order.price}$</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
