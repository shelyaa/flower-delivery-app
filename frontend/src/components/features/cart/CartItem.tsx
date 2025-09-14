import type { CartItem as CartItemType } from "../../../types/CartItem";

type CartItemCardProps = {
  item: CartItemType;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

export const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: CartItemCardProps) => {
  return (
    <div className="flex items-center gap-4 border p-3 rounded-md">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">Price: {item.price}</p>
      </div>

      <input
        type="number"
        value={item.quantity}
        min={1}
        className="w-12 border rounded-md text-center"
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
      />

      <button
        className="hover:text-red-700 font-bold px-2 transition-colors"
        onClick={() => removeItem(item.id)}
      >
        ✕
      </button>
    </div>
  );
};
