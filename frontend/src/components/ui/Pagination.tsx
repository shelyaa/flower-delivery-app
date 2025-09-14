import { useEffect } from "react";

interface Props {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

const PaginationRounded = ({ page, totalPages, onChange }: Props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    totalPages > 1 && (
      <div className="flex gap-2 font-manrope text-sm font-medium">
        <button
          onClick={() => onChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Назад
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? "bg-red-800 text-white " : "hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Вперед
        </button>
      </div>
    )
  );
};

export default PaginationRounded;
