import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "../../../api/shops";
import type { Shop } from "../../../types/Shop";
import { Skeleton } from "../../common/ShopsSidebarSkeleton";

type ShopsSidebarProps = {
  onSelectShop: (shopId: number) => void;
  shopId: number | null;
};

export const ShopsSidebar = ({ onSelectShop, shopId }: ShopsSidebarProps) => {
  const {
    data: shops = [],
    isLoading,
    isError,
  } = useQuery<Shop[], Error>({
    queryKey: ["shops"],
    queryFn: () => fetchShops(),
  });

  if (isError)
    return (
      <p className="flex justify-center m-auto  text-gray-500">
        We couldn't load your order. Please try again later.
      </p>
    );

  return (
    <div className="border-1 lg:h-[75vh] p-10 rounded-md w-80 h-max sm:w-90">
      <h2 className="text-xl font-bold mb-6 text-center">Shops</h2>
      {isLoading ? (
        <Skeleton count={5} />
      ) : (
        <div className="flex flex-col gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className={`${
                shopId === shop.id ? "text-main" : ""
              }  p-4 cursor-pointer rounded-md border-1 text-center font-medium hover:bg-[#535bf2] hover:text-white transition-colors`}
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
