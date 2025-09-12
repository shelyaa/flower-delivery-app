import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Header />

      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
