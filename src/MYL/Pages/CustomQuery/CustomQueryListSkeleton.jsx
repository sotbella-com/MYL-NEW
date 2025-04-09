import React from "react";

const CustomQueryListSkeleton = () => {
  return (
    <div className="p-6 bg-white mt-8 animate-pulse">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <h1 className="font-jakarta text-xl md:text-6xl font-medium mb-10 text-center shimmer w-3/4 md:w-1/2 mx-auto h-16 rounded" />

      <div className="w-full max-w-[90vw] mx-auto">
        {/* Table Header Skeleton */}
        <div className="flex gap-2 items-center bg-[#F9F9F9] border border-[#E4E4E4] p-3 md:p-4 rounded-lg text-sm md:text-[22px] font-semibold">
          <div className="flex-1 shimmer h-6 rounded" />
          <div className="flex-1 shimmer h-6 rounded" />
          <div className="flex-1 shimmer h-6 rounded" />
        </div>

        {/* Row Skeletons */}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 rounded-lg my-4 p-2 md:p-4 bg-[#F9F9F9] border border-[#E4E4E4] text-sm md:text-[22px] font-normal"
          >
            <div className="flex-1 shimmer h-6 rounded" />
            <div className="flex-1 shimmer h-6 rounded mx-4" />
            <div className="flex-1 shimmer h-10 rounded w-24 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomQueryListSkeleton;
