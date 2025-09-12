import { OrderForm } from "../components/forms/OrderForm";
import { CartList } from "../components/features/cart/CartList";
import type { RootState } from "../store";
import { useAppSelector } from "../hooks/redux";

export const ShoppingCartPage = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <div className="flex gap-10 p-10">
      <OrderForm
        cartItems={cartItems}
        totalPrice={totalPrice}
      />

      <div className="flex-1 flex flex-col gap-6">
        <CartList />
        <div className="flex justify-between items-center border-t pt-4">
          <p className="font-bold text-lg">Total price: {totalPrice}$</p>
        </div>
      </div>
    </div>
  );
};
