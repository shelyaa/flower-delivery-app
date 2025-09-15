import { OrderForm } from "../components/forms/OrderForm";
import { CartList } from "../components/features/cart/CartList";
import type { RootState } from "../store";
import { useAppSelector } from "../hooks/redux";

export const ShoppingCartPage = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-20 p-4 lg:p-10">
      <div className="block lg:hidden w-full mb-6">
        <CartList />
        <div className="flex justify-between items-center border-t pt-4">
          <p className="font-bold text-lg">Total price: {totalPrice}$</p>
        </div>
        <div className="mt-6">
          <OrderForm cartItems={cartItems} totalPrice={totalPrice} />
        </div>
      </div>

      <div className="hidden lg:block w-full lg:w-auto lg:max-w-md">
        <OrderForm cartItems={cartItems} totalPrice={totalPrice} />
      </div>

      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg:gap-6">
        <CartList />
        <div className="flex justify-between items-center border-t pt-4">
          <p className="font-bold text-lg">Total price: {totalPrice}$</p>
        </div>
      </div>
    </div>
  );
};
