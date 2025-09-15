import type {CartItem} from "../../types/CartItem";
import {useForm, Controller} from "react-hook-form";
import {createOrder} from "../../api/orders";
import {useAppDispatch} from "../../hooks/redux";
import {clearCart} from "../../store/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import {DeliveryMap} from "../features/map/DeliveryMap";
import {PatternFormat} from "react-number-format";
import {ODESA_COORDINATES} from "../../constants/map";
import {useState} from "react";
import {ErrorMessage} from "../common/ErrorMessage";

type OrderFormProps = {
  cartItems: CartItem[];
  totalPrice: number;
};

type FormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export const OrderForm = ({cartItems, totalPrice}: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(ODESA_COORDINATES);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const onSubmit = async (data: FormInputs) => {
    setSubmitError("");
    if (cartItems.length === 0) {
      setIsCartEmpty(true);
      return;
    }

    try {
      setLoading(true);
      const itemsForOrder = cartItems.map((item) => ({
        ...item,
        price: Number(item.price),
        order_id: 0,
        product_id: item.id,
      }));

      const newOrder = await createOrder({
        ...data,
        items: itemsForOrder,
        price: Number(totalPrice),
        timezone,
      });

      dispatch(clearCart());
      reset();
      navigate(`/orders/${newOrder.order_id}`);
    } catch (err) {
      console.error(err);
      setSubmitError("Order creation failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 md:min-w-[25vw] border p-6 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label className="flex flex-col">
        <span className="mb-1 font-medium">Name:</span>
        <input
          {...register("name", {required: "You need to enter a name."})}
          type="text"
          placeholder="Your name"
          className={`border rounded-md p-2 ${errors.name ? "border-red-600" : ""}`}
        />
        <ErrorMessage message={errors.name?.message} />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Email:</span>
        <input
          {...register("email", {
            required: "You need to enter an email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          type="email"
          placeholder="Your email"
          autoComplete="email"
          className={`border rounded-md p-2 ${errors.email ? "border-red-600" : ""}`}
        />
        <ErrorMessage message={errors.email?.message} />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">Phone:</span>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "You need to enter a phone number.",
            validate: (value) => {
              const phoneDigits = value.replace(/\D/g, "");
              if (!phoneDigits) return "You need to enter a phone number.";
              if (phoneDigits.length < 10) return "Invalid phone number.";
              return true;
            },
          }}
          render={({field}) => (
            <PatternFormat
              format="+38 (###) ###-##-##"
              mask="_"
              placeholder="Your phone"
              className={`border rounded-md p-2 ${errors.phone ? "border-red-600" : ""}`}
              value={field.value}
              onValueChange={(values) => field.onChange(values.formattedValue)}
            />
          )}
        />
        <ErrorMessage message={errors.phone?.message} />
      </label>

      <Controller
        control={control}
        name="address"
        rules={{
          required: "You need to enter an address.",
        }}
        render={({field}) => (
          <DeliveryMap
            userAddress={field.value}
            setUserAddress={field.onChange}
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            error={errors.address?.message}
          />
        )}
      />
      <ErrorMessage message={errors.address?.message} />

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
