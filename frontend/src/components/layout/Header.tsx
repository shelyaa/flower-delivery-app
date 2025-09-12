import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-8 flex justify-between items-center w-full">
      <Link to="/" className="text-2xl font-bold">
        Flower Shop
      </Link>
      <nav className="flex gap-6">
        <Link to="/" className="border-r-2 border-gray-500 pr-6">
          Shop
        </Link>
        <Link to="/cart" className="border-r-2 border-gray-500 pr-6">Shopping Cart</Link>
        <Link to="/order-history" className="">
          History
        </Link>
      </nav>
    </header>
  );
};
