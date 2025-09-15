export const OrderHistorySkeleton = ({ count = 2 }: { count?: number }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg max-w-3xl m-auto">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight bg-gray-200 rounded-lg w-48 h-8 animate-pulse"></h2>

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white shadow-sm rounded-2xl p-6 mb-8 animate-pulse"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-2 sm:mt-0"></div>
          </div>
          <div className="space-y-3 mb-4">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="h-12 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
            {Array.from({ length: 5 }).map((_, k) => (
              <div key={k} className="h-4 bg-gray-200 rounded w-40"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
