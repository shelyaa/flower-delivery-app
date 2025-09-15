import { useState } from "react";
import type { Order } from "../types/Order";
import { SearchOrderForm } from "../components/forms/SearchOrderForm";
import { OrderHistoryItem } from "../components/features/orders/OrderHistoryItem";

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div className="flex gap-10 flex-col md:flex-row">
      <div className="mt-20 w-full md:w-[25vw]">
        <SearchOrderForm
          setOrders={setOrders}
          setLoading={setLoading}
          loading={loading}
          setError={setError}
        />
      </div>
      <div className="md:p-6 rounded-lg m-auto max-w-3xl">
        {error ? (
          <p className="text-red-800 text-center">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            Enter email and phone OR order id to search an order
          </p>
        ) : (
          <div>
            <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-black">
              Order Details
            </h2>
            <div>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-sm rounded-2xl p-6 mb-8 transition hover:shadow-md w-sm md:w-3xl"
                >
                  <OrderHistoryItem order={order} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
