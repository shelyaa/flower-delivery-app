import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/Order";
import { fetchOrderById } from "../api/orders";
import type { OrderItem as OrderItemType } from "../types/OrderItem";
import { OrderItem } from "../components/features/orders/OrderItem";
import { formatDate } from "../utils/formatDate";

export const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<Order, Error>({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(Number(orderId)),
    enabled: !!orderId,
  });

  if (isLoading)
    return (
      <p className="flex justify-center m-auto  text-gray-500">Loading...</p>
    );
  if (isError)
    return (
      <p className="flex justify-center m-auto  text-gray-500">
        We couldn't load your order. Please try again later.
      </p>
    );
  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-6 bg-gray-50 min-h rounded-lg max-w-3xl m-auto">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-black">
        Order Details
      </h2>

      <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <p className="text-lg font-bold text-black">Order #{order.id}</p>
          <span className="text-sm text-gray-400">
            {formatDate(order.created_at)}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          {order.OrderItems.map((item: OrderItemType) => (
            <OrderItem item={item} key={item.id} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-base">
          <p>
            <span className="font-semibold">Name:</span> {order.name}
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
    </div>
  );
};
