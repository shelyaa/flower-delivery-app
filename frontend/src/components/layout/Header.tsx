import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-8 flex justify-between items-center w-full">
      <Link to="/" className="text-2xl font-bold">
        Flower Shop
      </Link>
      <nav className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            [
              "border-r-2 border-gray-500 pr-6",
              isActive ? "underline " : "",
            ].join(" ")
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            [
              "border-r-2 border-gray-500 pr-6",
              isActive ? "underline" : "",
            ].join(" ")
          }
        >
          Shopping Cart
        </NavLink>
        <NavLink
          to="/order-history"
          className={({ isActive }) =>
            ["", isActive ? "underline" : ""].join(" ")
          }
        >
          History
        </NavLink>
      </nav>
    </header>
  );
};
