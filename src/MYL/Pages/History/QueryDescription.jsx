// import React, { useState } from "react";

// // Shimmer animation styles
// const shimmerStyle = `
//   @keyframes shimmer {
//     0% { background-position: -200% 0; }
//     100% { background-position: 200% 0; }
//   }
//   .shimmer {
//     background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
//     background-size: 200% 100%;
//     animation: shimmer 1.2s infinite;
//   }
// `;

// // Skeleton version of QueryDescription
// export function QueryDescriptionSkeleton() {
//   return (
//     <>
//       <style>{shimmerStyle}</style>
//       <div className="w-full h-5 bg-gray-300 rounded shimmer" />
//     </>
//   );
// }

// // Main functional component
// function QueryDescription({ description, maxLength = 20 }) {
//   const [showFull, setShowFull] = useState(false);

//   const toggleShowFull = () => {
//     setShowFull((prev) => !prev);
//   };

//   if (!description) return null;

//   const isLong = description.length > maxLength;
//   const displayText = showFull || !isLong
//     ? description
//     : `${description.slice(0, maxLength)}...`;

//   return (
//     <h2 className="text-sm md:text-base xl:text-lg font-medium">
//       {displayText}
//       {isLong && (
//         <button
//           className="text-blue-500 underline ml-2"
//           onClick={toggleShowFull}
//         >
//           {showFull ? "See Less" : "See More"}
//         </button>
//       )}
//     </h2>
//   );
// }

// export default QueryDescription;


import React, { useState, useEffect } from "react";

export default function QueryDescription({ description = "" }) {
  const [showFull, setShowFull] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const MAX_LENGTH = 20;

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleShowFull = () => setShowFull((prev) => !prev);

  if (showSkeleton) return <QueryDescriptionSkeleton />;

  return (
    <h2 className="text-sm md:text-base xl:text-lg font-medium">
      {showFull || description.length <= MAX_LENGTH
        ? description
        : `${description.slice(0, MAX_LENGTH)}... `}
      {description.length > MAX_LENGTH && (
        <button
          className="text-blue-500 underline ml-2"
          onClick={toggleShowFull}
        >
          {showFull ? "See Less" : "See More"}
        </button>
      )}
    </h2>
  );
}

export function QueryDescriptionSkeleton() {
  return (
    <div className="w-2/3 h-5 bg-gray-300 shimmer rounded mb-2">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }
      `}</style>
    </div>
  );
}
