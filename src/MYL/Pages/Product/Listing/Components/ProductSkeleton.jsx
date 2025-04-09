// import React from 'react';

// const ProductSkeletonComponentTailwind = () => {
//   return (
//     <div className="flex flex-col flex-1 max-lg:w-full">
//       <div className="flex flex-col grow leading-tight max-lg:mt-5">
//         <div className="flex w-full bg-gray-200 min-h-[455px] items-center justify-center rounded-md animate-pulse"></div>
//         <div className="flex flex-col mt-3 w-full">
//           <div className="flex flex-col w-full">
//             <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//             <div className="mt-2 w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
//             <div className="flex gap-2 items-center mt-2">
//               <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
//               <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//           <div className="flex gap-2 items-center mt-4 w-full">
//             <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
//             <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductSkeleton = ({ count = 8 }) => {
//   return (
//     <div className="w-[90vw] mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {Array(count).fill(0).map((_, index) => (
//           <ProductSkeletonComponentTailwind key={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductSkeleton;


import React, { useEffect, useState } from "react";

// Gradient shimmer style
const shimmerStyle = {
  backgroundImage:
    "linear-gradient(90deg, #f3f3f3 0%, #e0e0e0 50%, #f3f3f3 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

// Global shimmer animation keyframes
const GlobalShimmerStyle = () => (
  <style>
    {`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}
  </style>
);

// Skeleton Card (same size as real product card)
const ProductSkeletonItem = () => {
  return (
    <div className="flex flex-col flex-1 max-lg:w-full">
      <div className="flex flex-col grow leading-tight max-lg:mt-5">
        {/* Image Section */}
        <div className="w-full h-[455px] md:h-[548px] rounded-md bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0" style={shimmerStyle}></div>
        </div>

        {/* Content */}
        <div className="flex flex-col mt-3 w-full">
          <div className="flex flex-col w-full">
            <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0" style={shimmerStyle}></div>
            </div>
            <div className="mt-2 w-3/4 h-6 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0" style={shimmerStyle}></div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <div className="w-20 h-6 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0" style={shimmerStyle}></div>
              </div>
              <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0" style={shimmerStyle}></div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 items-center mt-4 w-full">
            <div className="w-20 h-10 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0" style={shimmerStyle}></div>
            </div>
            <div className="flex-1 h-10 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0" style={shimmerStyle}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Grid with timeout logic
const ProductSkeleton = ({ count = 8, duration = 1500, children }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return showSkeleton ? (
    <div className="w-[90vw] mx-auto mt-5 md:mt-10 lg:mt-15">
      <GlobalShimmerStyle />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <ProductSkeletonItem key={index} />
          ))}
      </div>
    </div>
  ) : (
    children || null
  );
};

export default ProductSkeleton;
