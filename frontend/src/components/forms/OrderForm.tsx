import { useState } from "react";
import type { CartItem } from "../../types/CartItem";
import { createOrder } from "../../api/orders";
import { useAppDispatch } from "../../hooks/redux";
import { clearCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

type OrderFormProps = {
  cartItems: CartItem[];
  totalPrice: number;
};

export const OrderForm = ({ cartItems, totalPrice }: OrderFormProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      emptyCart: "",
    };
    if (!form.name.trim()) newErrors.name = "You need to enter a name.";
    if (!form.email.trim())
      newErrors.email = "You need to enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim())
      newErrors.phone = "You need to enter a phone number.";
    else if (!/^\d{10,}$/.test(form.phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number.";
    if (!form.address.trim())
      newErrors.address = "You need to enter an address.";

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setIsCartEmpty(true);
      return;
    }

    const validation = validate();
    setErrors(validation);

    if (Object.values(validation).every((v) => !v)) {
      try {
        setLoading(true);
        const itemsForOrder = cartItems.map((item) => ({
          ...item,
          price: Number(item.price),
          order_id: 0,
          product_id: item.id,
        }));

        const newOrder = await createOrder({
          ...form,
          items: itemsForOrder,
          price: Number(totalPrice),
        });
        console.log(newOrder);
        dispatch(clearCart());
        navigate(`/orders/${newOrder.order_id}`);
      } catch (err) {
        console.error(err);
        alert("Помилка при створенні замовлення");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-80 border p-6 rounded-md"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="flex flex-col">
        <span className="mb-1 font-medium">Name:</span>
        <input
          name="name"
          type="text"
          className={`border rounded-md p-2 ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="text-sm text-red-600">{errors.name}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Email:</span>
        <input
          name="email"
          type="email"
          className={`border rounded-md p-2 ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Phone:</span>
        <input
          name="phone"
          type="tel"
          className={`border rounded-md p-2 ${
            errors.phone ? "border-red-500" : ""
          }`}
          placeholder="Your phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <span className="text-sm text-red-600">{errors.phone}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Address:</span>
        <input
          name="address"
          type="text"
          className={`border rounded-md p-2 ${
            errors.address ? "border-red-500" : ""
          }`}
          placeholder="Delivery address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && (
          <span className="text-sm text-red-600">{errors.address}</span>
        )}
      </label>
      <button
        className="border border-black rounded-md px-4 py-2 mt-4 transition-all hover:bg-[#535bf2] hover:text-white hover:border-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {isCartEmpty && (
        <p className="mt-2 text-red-600 text-sm">
          Your cart is empty. Please add items to your cart.
        </p>
      )}
    </form>
  );
};
