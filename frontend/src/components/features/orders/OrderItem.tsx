import type { OrderItem as OrderItemType } from "../../../types/OrderItem";

type OrderItemProps = {
  item: OrderItemType;
};

export const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition overflow-auto">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-40 h-40 object-cover rounded-md shadow-sm"
      />
      <div className="flex justify-between w-full items-center">
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-gray-500 text-sm">x {item.quantity}</p>
        </div>
        <p className="text-sm font-medium text-gray-800">{item.price}$</p>
      </div>
    </div>
  );
};
