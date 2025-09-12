import { useState } from "react";
import { FlowersGrid } from "../components/features/flowers/FlowersGrid";
import { ShopsSidebar } from "../components/features/shops/ShopsSidebar";
import { useSearchParams } from "react-router-dom";

export const FlowerShopsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shopIdParam = searchParams.get("shopId");
  const [activeShopId, setActiveShopId] = useState<number | null>(
    shopIdParam ? Number(shopIdParam) : null
  );

  const handleSelectShop = (id: number) => {
    setActiveShopId(id);
    setSearchParams({ shopId: id.toString() }); // зберігаємо в URL
  };

  return (
    <div className="flex gap-10 p-6">
      <div className="flex-none w-80">
        <ShopsSidebar onSelectShop={handleSelectShop} />
      </div>
      <div className="flex-1">
        {activeShopId ? (
          <FlowersGrid shopId={activeShopId} />
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500 h-[60vh]">
            Select a shop to see flowers
          </div>
        )}
      </div>
    </div>
  );
};
