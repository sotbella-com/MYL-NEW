import React from "react";

const QuerySkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-16 w-full mx-auto animate-pulse">
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

      <div className="flex flex-col justify-between lg:flex-row gap-10 w-full my-10">
        {/* Left Skeleton - QueryDescription */}
        <div className="w-full lg:w-[56%] space-y-4">
          <div className="h-20 w-full shimmer rounded mb-10" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-full md:w-3/4 shimmer rounded" />
          ))}
          <div className="h-8 w-1/6 shimmer rounded mt-10" />
        </div>

        {/* Right Skeleton - QueryForm */}
        <div className="w-full lg:max-w-lg p-8 bg-gray-100 rounded-3xl mx-auto">
          <div className="h-8 w-full shimmer rounded" />
          <div className="h-4 w-full shimmer rounded mt-2" />

          {/* File upload */}
          <div className="space-y-2 mt-6">
            <div className="h-6 w-3/4 shimmer rounded" />
            <div className="h-10 w-full shimmer rounded" />
          </div>

          {/* Description */}
          <div className="space-y-2 mt-6">
            <div className="h-5 w-1/3 shimmer rounded" />
            <div className="h-28 w-full shimmer rounded" />
          </div>

          {/* Button */}
          <div className="h-14 w-full shimmer rounded-xl mt-6" />
        </div>
      </div>
    </div>
  );
};

export default QuerySkeleton;
