import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between items-start self-center my-10 text-black w-[90vw] animate-pulse">
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

      {/* Left Skeleton - Images */}
      <div className="w-full lg:w-[65%] space-y-4">
        <div className="hidden lg:flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[160vh] w-full shimmer rounded-lg" />
          ))}
        </div>
        <div className="block lg:hidden">
          <div className="h-[120vh] w-full shimmer rounded-lg" />
        </div>
      </div>

      {/* Right Skeleton */}
      <div className="flex flex-col w-full lg:w-[35%] space-y-4">
        <div className="h-8 w-3/4 shimmer rounded" />
        <div className="h-6 w-1/3 shimmer rounded mb-2" />
        <div className="h-10 w-1/4 shimmer rounded" />

        {/* Sizes */}
        <div>
          <div className="h-6 w-1/3 shimmer rounded mb-3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-14 shimmer rounded" />
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="h-12 w-full shimmer rounded mt-4" />

        {/* Info Grid */}
        <div className="flex flex-wrap gap-5 items-center px-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col grow shrink text-center gap-2">
                <div className="h-6 w-1/2 shimmer rounded mx-auto" />
                <div className="h-4 w-2/3 shimmer rounded mx-auto" />
              </div>
              {i < 2 && (
                <div className="shrink border border-neutral-200 h-20 shadow-sm" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3 mt-4">
          <div className="h-8 w-1/3 shimmer rounded" />
          <div className="h-4 w-full shimmer rounded" />
          <div className="h-4 w-5/6 shimmer rounded" />
          <div className="h-4 w-3/4 shimmer rounded" />
          <div className="h-4 w-1/4 shimmer rounded" />
          <div className="h-4 w-1/2 shimmer rounded" />
          <div className="h-4 w-1/2 shimmer rounded" />
          <div className="h-4 w-5/6 shimmer rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;