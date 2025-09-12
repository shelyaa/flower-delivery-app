import { useEffect, useState } from "react";
import { fetchShops } from "../../../api/shops";
import type { Shop } from "../../../types/Shop";
import { Skeleton } from "../../common/ShopsSidebarSkeleton";

type ShopsSidebarProps = {
  onSelectShop: (shopId: number) => void;
};

export const ShopsSidebar = ({ onSelectShop }: ShopsSidebarProps) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops()
      .then((data) => setShops(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-78 border-1 min-h-screen p-10 rounded-md">
      <h2 className="text-xl font-bold mb-6 text-center">Shops</h2>
      {loading ? (
        <Skeleton count={5} />
      ) : (
        <div className="flex flex-col gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="p-4 cursor-pointer rounded-md border-1 text-center font-medium hover:bg-[#535bf2] hover:text-white transition-colors"
              onClick={() => onSelectShop(shop.id)}
            >
              <p>{shop.name}</p>
              <p className="text-sm">{shop.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
