import React from "react";

const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
  }
`;

const OrderDetailsSkeleton = () => {
  return (
    <div className="w-[90vw] mx-auto my-10 font-jakarta">
      <style>{shimmerStyle}</style>

      {/* Header */}
      <div className="w-40 md:w-60 h-8 md:h-12 bg-gray-300 rounded shimmer mb-4 md:mb-10" />
      <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
        <div className="w-32 h-8 md:w-36 md:h-10 bg-gray-300 shimmer rounded-[30px]" />
        <div className="w-36 h-8 md:w-40 md:h-10 bg-gray-300 shimmer rounded-[30px]" />
      </div>

      {/* Product Cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-4 md:gap-5 mb-10 w-full"
        >
          <div className="bg-gray-300 shimmer h-[200px] w-[180px] md:w-[300px] md:h-[346px] rounded-lg" />
          <div className="flex flex-col flex-grow gap-4 pt-2 md:pt-0">
            <div className="flex justify-between items-center">
              <div className="w-1/2 md:w-1/6 h-4 md:h-5 bg-gray-300 shimmer rounded" />
              <div className="w-20 md:w-[100px] h-6 md:h-7 bg-gray-300 shimmer rounded" />
            </div>
            <div className="w-2/3 md:w-2/6 h-4 md:h-5 bg-gray-300 shimmer rounded" />
            <div className="w-1/2 md:w-1/6 h-4 md:h-5 bg-gray-300 shimmer rounded" />
          </div>
        </div>
      ))}

      {/* Summary Section */}
      <div className="p-4 md:p-6 bg-[#F9F9F9] border border-[#E4E4E4] rounded-[30px]">
        <div className="w-1/2 md:w-1/3 h-5 md:h-6 bg-gray-300 shimmer rounded mb-6" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center mb-5">
            <div className="w-1/3 h-4 md:h-5 bg-gray-300 shimmer rounded" />
            <div className="w-16 md:w-20 h-4 md:h-5 bg-gray-300 shimmer rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
