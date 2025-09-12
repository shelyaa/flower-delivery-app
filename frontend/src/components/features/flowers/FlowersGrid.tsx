import { useEffect, useState } from "react";
import type { Flower } from "../../../types/Flower";
import { FlowerCard } from "./FlowerCard";
import { Skeleton } from "../../common/ShopsSidebarSkeleton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fetchFlowersByShop } from "../../../api/flowers";

type FlowersGridProps = {
  shopId: number;
};

export const FlowersGrid = ({ shopId }: FlowersGridProps) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchFlowers = async () => {
    try {
      const data = await fetchFlowersByShop(shopId, sortOrder);
      setFlowers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, [shopId, sortOrder]);

  if (loading) return <Skeleton />;

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSortOrder("asc")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            sortOrder === "asc"
              ? "bg-main text-white border-main"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          <ArrowUpwardIcon fontSize="small" />
          price
        </button>

        <button
          onClick={() => setSortOrder("desc")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            sortOrder === "desc"
              ? "bg-main text-white border-main"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          <ArrowDownwardIcon fontSize="small" />
          price
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flowers.map((flower) => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            onFavoriteToggle={fetchFlowers} // після toggle знову fetch
          />
        ))}
      </div>
    </div>
  );
};
