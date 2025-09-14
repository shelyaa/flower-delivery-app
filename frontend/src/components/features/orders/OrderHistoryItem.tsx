import type { Order } from "../../../types/Order";
import type { OrderItem as OrderItemType } from "../../../types/OrderItem";
import { OrderItem } from "./OrderItem";

type OrderItemProps = {
  order: Order;
};

export const OrderHistoryItem = ({ order }: OrderItemProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 ">
        <p className="text-lg font-bold">Order #{order.id}</p>
        <span className="text-sm text-gray-400">
          {new Date(order.created_at).toLocaleString("uk-UA", {
            timeZone: "Etc/GMT-6",
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
  );
};
