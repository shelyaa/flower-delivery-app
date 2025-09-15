import { useState } from "react";
import { FlowersGrid } from "../components/features/flowers/FlowersGrid";
import { ShopsSidebar } from "../components/features/shops/ShopsSidebar";
import { useSearchParams } from "react-router-dom";

export const FlowerShopsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const shopIdParam = searchParams.get("shopId");
  const [activeShopId, setActiveShopId] = useState<number | null>(
    shopIdParam ? Number(shopIdParam) : null,
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectShop = (id: number) => {
    setActiveShopId(id);
    setSearchParams({ shopId: id.toString() });
    setIsSidebarOpen(false);
    setPage(1);
  };

  return (
    <div className="flex gap-10 p-6 relative flex-col md:flex-row">
      <button
        className="block sm:hidden mb-4 px-4 py-2 bg-main text-white rounded-md font-semibold h-10"
        onClick={() => setIsSidebarOpen(true)}
      >
        Select a shop
      </button>

      <div className="hidden sm:flex w-90">
        <ShopsSidebar onSelectShop={handleSelectShop} shopId={activeShopId} />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative bg-white w-full h-full shadow-xl z-50 p-4">
            <button
              className="absolute  right-1 -top-1 text-xl font-bold"
              onClick={() => setIsSidebarOpen(false)}
            >
              ×
            </button>
            <ShopsSidebar
              onSelectShop={handleSelectShop}
              shopId={activeShopId}
            />
          </div>
        </div>
      )}

      <div className="flex-1">
        {activeShopId ? (
          <FlowersGrid shopId={activeShopId} page={page} setPage={setPage} />
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500 h-[60vh]">
            Select a shop to see flowers
          </div>
        )}
      </div>
    </div>
  );
};
