import { useState } from "react";
import type { CartItem } from "../../types/CartItem";
import { createOrder } from "../../api/orders";
import { useAppDispatch } from "../../hooks/redux";
import { clearCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { DeliveryMap } from "../features/map/DeliveryMap";
import { PatternFormat } from "react-number-format";

type OrderFormProps = {
  cartItems: CartItem[];
  totalPrice: number;
};

export const OrderForm = ({ cartItems, totalPrice }: OrderFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [address, setAddress] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: 46.4802,
    lng: 30.742,
  });
  const [submitError, setSubmitError] = useState("");

  const shopCoordinates = { lat: 50.455, lng: 30.52 };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "", address: "" };
    if (!form.name.trim()) newErrors.name = "You need to enter a name.";
    if (!form.email.trim())
      newErrors.email = "You need to enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) newErrors.phone = "You need to enter a phone number.";
    else if (phoneDigits.length < 10) newErrors.phone = "Invalid phone number.";
    if (!address.trim()) newErrors.address = "You need to enter an address.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
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
          address,
          items: itemsForOrder,
          price: Number(totalPrice),
          timezone,
        });

        dispatch(clearCart());
        navigate(`/orders/${newOrder.order_id}`);
      } catch (err) {
        console.error(err);
        setSubmitError("Order creation failed. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 md:min-w-[25vw] border p-6 rounded-md"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="flex flex-col">
        <span className="mb-1 font-medium">Name:</span>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className={`border rounded-md p-2 ${
            errors.name ? "border-red-600" : ""
          }`}
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
          placeholder="Your email"
          className={`border rounded-md p-2 ${
            errors.email ? "border-red-600" : ""
          }`}
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Phone:</span>
        <PatternFormat
          format="+38 (###) ###-##-##"
          mask="_"
          name="phone"
          placeholder="Your phone"
          className={`border rounded-md p-2 ${
            errors.phone ? "border-red-600" : ""
          }`}
          value={form.phone}
          onValueChange={(values) => handlePhoneChange(values.formattedValue)}
        />
        {errors.phone && (
          <span className="text-sm text-red-600">{errors.phone}</span>
        )}
      </label>

      <DeliveryMap
        userAddress={address}
        setUserAddress={setAddress}
        userCoordinates={userCoordinates}
        setUserCoordinates={setUserCoordinates}
        shopCoordinates={shopCoordinates}
        errors={errors}
      />

      <button
        type="submit"
        disabled={loading}
        className="border border-black rounded-md px-4 py-2 mt-4 transition-all hover:bg-[#535bf2] hover:text-white hover:border-white"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {submitError && (
        <p className="mt-2 text-red-600 text-sm">{submitError}</p>
      )}

      {isCartEmpty && (
        <p className="mt-2 text-red-600 text-sm">
          Your cart is empty. Please add items to your cart.
        </p>
      )}
    </form>
  );
};
