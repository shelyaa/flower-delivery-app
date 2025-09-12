import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { FlowerShopsPage } from "./pages/FlowerShopsPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FlowerShopsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};
