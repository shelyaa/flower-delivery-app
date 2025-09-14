export const Skeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-300 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};
