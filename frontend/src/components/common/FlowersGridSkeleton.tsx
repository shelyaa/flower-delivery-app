export const FlowersGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-xl shadow p-4 relative"
        >
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>

            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};
