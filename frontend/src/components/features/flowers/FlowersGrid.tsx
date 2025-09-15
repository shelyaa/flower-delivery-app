import { useEffect, useState } from "react";
import type { Flower } from "../../../types/Flower";
import { FlowerCard } from "./FlowerCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fetchFlowersByShop } from "../../../api/flowers";
import { FlowersGridSkeleton } from "../../common/FlowersGridSkeleton";
import PaginationRounded from "../../ui/Pagination";

type FlowersGridProps = {
  shopId: number;
  page: number;
  setPage: (page: number) => void;
};

export const FlowersGrid = ({ shopId, page, setPage }: FlowersGridProps) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(1);

  const fetchFlowers = async () => {
    setLoading(true);
    try {
      const data = await fetchFlowersByShop(shopId, sortOrder, page);
      setFlowers(data.items);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, sortOrder, page]);

  if (loading) return <FlowersGridSkeleton count={12} />;

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
          <ArrowUpwardIcon fontSize="small" /> price
        </button>

        <button
          onClick={() => setSortOrder("desc")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            sortOrder === "desc"
              ? "bg-main text-white border-main"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          <ArrowDownwardIcon fontSize="small" /> price
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flowers.map((flower) => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            onFavoriteToggle={fetchFlowers}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationRounded
          page={page}
          totalPages={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
