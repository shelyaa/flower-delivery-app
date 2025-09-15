import { useState } from "react";
import type { Flower } from "../../../types/Flower";
import { FlowerCard } from "./FlowerCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fetchFlowersByShop } from "../../../api/flowers";
import { FlowersGridSkeleton } from "../../common/FlowersGridSkeleton";
import PaginationRounded from "../../ui/Pagination";
import { useQuery } from "@tanstack/react-query";

type FlowersGridProps = {
  shopId: number;
  page: number;
  setPage: (page: number) => void;
};

type FlowersResponse = {
  items: Flower[];
  totalPages: number;
};

export const FlowersGrid = ({ shopId, page, setPage }: FlowersGridProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError, refetch } = useQuery<
    FlowersResponse,
    Error
  >({
    queryKey: ["flowers", shopId, sortOrder, page],
    queryFn: () => fetchFlowersByShop(shopId, sortOrder, page),
  });

  if (isLoading) return <FlowersGridSkeleton count={12} />;
  if (isError)
    return (
      <p className="flex justify-center m-auto  text-gray-500">
        We couldn't load flowers. Please try again later.
      </p>
    );

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
        {data?.items.map((flower) => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            onFavoriteToggle={refetch}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationRounded
          page={page}
          totalPages={data?.totalPages || 1}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
