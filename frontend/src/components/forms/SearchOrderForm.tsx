import { useState } from "react";
import type { Order } from "../../types/Order";
import { searchOrder } from "../../api/orders";
import { PatternFormat } from "react-number-format";

type SearchOrderFormProps = {
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  loading: boolean;
};

export const SearchOrderForm = ({
  setOrders,
  setLoading,
  setError,
  loading,
}: SearchOrderFormProps) => {
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    orderId: "",
  });
  const [form, setForm] = useState({
    email: "",
    phone: "",
    orderId: "",
  });

  const validate = () => {
    const newErrors = { email: "", phone: "", orderId: "" };

    if (form.orderId.trim()) return newErrors;

    if (!form.email.trim()) {
      newErrors.email = "You need to enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "You need to enter a phone number.";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Invalid phone number.";
    }

    if (!form.orderId.trim() && (!form.email.trim() || !form.phone.trim())) {
      newErrors.orderId =
        "Enter email and phone OR order id to search an order.";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);

    if (Object.values(validation).every((v) => !v)) {
      try {
        setLoading(true);
        setError("");

        const { orderId, email, phone } = form;
        const orders = await searchOrder(Number(orderId), email, phone);
        setOrders(orders);
      } catch (err) {
        console.error(err);
        setError("We couldn't find any order with the provided details");
        setOrders([]);
      } finally {
        setForm({ email: "", phone: "", orderId: "" });
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4  border p-6 rounded-md"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="flex flex-col">
        <span className="mb-1 font-medium">Email:</span>
        <input
          name="email"
          type="email"
          className={`border rounded-md p-2 ${
            errors.email ? "border-red-800" : ""
          }`}
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-sm text-red-800">{errors.email}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Phone:</span>
        <PatternFormat
          format="+38 (###) ###-##-##"
          mask="_"
          name="phone"
          className={`border rounded-md p-2 ${
            errors.phone ? "border-red-800" : ""
          }`}
          placeholder="+38 (___) ___-__-__"
          value={form.phone}
          onValueChange={(values) => handlePhoneChange(values.formattedValue)}
        />
        {errors.phone && (
          <span className="text-sm text-red-800">{errors.phone}</span>
        )}
      </label>

      <p className="text-center mt-4">or</p>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Order id:</span>
        <input
          name="orderId"
          type="text"
          className={`border rounded-md p-2 ${
            errors.orderId ? "border-red-800" : ""
          }`}
          placeholder="Your order id"
          value={form.orderId}
          onChange={handleChange}
        />
        {errors.orderId && (
          <span className="text-sm text-red-800">{errors.orderId}</span>
        )}
      </label>

      <button
        className="border border-black rounded-md px-4 py-2 mt-4 transition-all hover:bg-[#535bf2] hover:text-white hover:border-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
