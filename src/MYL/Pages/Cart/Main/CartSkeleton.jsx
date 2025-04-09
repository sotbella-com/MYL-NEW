import React from "react";

const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

const CartSkeleton = () => {
  return (
    <div className="w-[90vw] mx-auto my-5 font-jakarta">
      <style>{shimmerStyle}</style>

      {/* Header */}
      <div className="mb-6">
        <div className="w-40 h-6 md:h-8 shimmer bg-gray-300 rounded mb-2" />
        <div className="w-56 h-4 shimmer bg-gray-300 rounded mb-4 md:mb-8" />
      </div>

      {/* Table Header */}
      <div className="w-full py-2 md:py-4 px-4 md:px-6 border rounded-xl bg-[#F9F9F9] border-[#E4E4E4]">
        <div className="flex justify-between items-center">
          <div className="w-[60%]">
            <div className="w-24 h-6 md:h-8 shimmer bg-gray-300 rounded" />
          </div>
          <div className="w-[40%] hidden md:flex justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-16 h-6 md:h-8 shimmer bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Product Skeletons */}
      <div className="mt-6 space-y-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 md:p-6 border bg-[#F9F9F9] border-[#E4E4E4] rounded-[30px]"
          >
            <div className="flex gap-5 w-full md:w-[60%]">
              <div className="w-[120px] h-[130px] md:w-[280px] md:h-[300px] shimmer bg-gray-300 rounded-2xl" />
              <div className="flex flex-col justify-between gap-3 w-full">
                <div className="space-y-4">
                  <div>
                <div className="w-1/4 md:w-1/6 h-4 md:h-6 shimmer bg-gray-300 rounded" />
                <div className="w-full md:w-1/2 h-6 md:h-8 shimmer bg-gray-300 rounded mt-4" />
                </div>
                <div className="md:hidden flex justify-between">
                  <div className="w-1/4 h-6 shimmer bg-gray-300 rounded" />
                  <div className="w-1/4 h-6 shimmer bg-gray-300 rounded" />
                  <div className="w-1/4 h-6 shimmer bg-gray-300 rounded" />
                  </div>
                </div>
                
                <div className="md:block space-y-4 hidden">
                  <div className="w-1/4 h-6 shimmer bg-gray-300 rounded" />                  
                  <div className="w-1/4 h-6 shimmer bg-gray-300 rounded" />
                  </div>                  
                </div>
                <div className="hidden md:flex flex-col gap-2">
              </div>
            </div>
            {/* Price, Qty, Total - PC Only */}
            <div className="hidden md:flex justify-between items-center md:w-[40%] gap-4">
              <div className="w-16 h-6 shimmer bg-gray-300 rounded" />
              <div className="w-24 h-8 shimmer bg-gray-300 rounded" />
              <div className="w-20 h-6 shimmer bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* Summary Block */}
        <div className="p-6 bg-[#F9F9F9] border border-[#E4E4E4] rounded-[30px] w-full lg:w-1/2 space-y-8">
          <div className="w-1/3 h-10 shimmer bg-gray-300 rounded mb-4" />
            <div className="flex justify-between">
              <div className="w-1/4 h-8 shimmer bg-gray-300 rounded" />
              <div className="w-1/6 h-8 shimmer bg-gray-300 rounded" />
            </div>

            <div className="flex justify-between">
            <div className="w-1/3 h-8 shimmer bg-gray-300 rounded" />
            <div className="w-20 h-8 shimmer bg-gray-300 rounded" />
          </div>
          <hr className="border border-[#E4E4E4]" />
          <div className="flex justify-between">
            <div className="w-1/4 h-8 shimmer bg-gray-300 rounded" />
            <div className="w-1/6 h-8 shimmer bg-gray-300 rounded" />
          </div>
        </div>

        {/* Comment Block */}
        <div className="p-6 bg-[#F9F9F9] border border-[#E4E4E4] rounded-[30px] w-full lg:w-1/2 space-y-6">
          <div className="w-full h-[100px] md:h-[250px] shimmer bg-white border border-[#E4E4E4] rounded-2xl" />
          <div className="w-full h-16 shimmer bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
