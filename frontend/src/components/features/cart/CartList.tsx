import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import type { RootState } from "../../../store";
import {
  removeFromCart,
  updateQuantity,
} from "../../../store/slices/cartSlice";
import { useAppDispatch } from "../../../hooks/redux";

export const CartList = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity) }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md max-h-[400px] overflow-y-auto">
      {items.length === 0 ? (
        <div className="text-center text-gray-500">Cart is empty</div>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={handleUpdateQuantity}
            removeItem={handleRemove}
          />
        ))
      )}
    </div>
  );
};
