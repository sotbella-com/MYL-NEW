// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useCurrency from "../../Currency/useCurrency";
// import { getCurrencySymbol } from "../../Currency/currencyUtils";

// export function HistoryCardSkeleton() {
//   return (
//     <div className="flex flex-col max-w-[535px] p-4 border border-solid border-neutral-200 bg-stone-50 rounded-[30px] animate-pulse">
//       <div className="w-full px-4 py-3 bg-white rounded-[30px] shadow-sm"></div>
//       <div className="flex justify-between mt-6">
//         {[...Array(4)].map((_, index) => (
//           <div key={index} className="w-4 h-4 bg-gray-300 rounded-full"></div>
//         ))}
//       </div>
//       <div className="flex space-x-4 mt-3">
//         {[...Array(3)].map((_, index) => (
//           <div key={index} className="w-24 h-24 bg-gray-300 rounded-xl"></div>
//         ))}
//       </div>
//       <div className="mt-6 h-4 w-2/3 bg-gray-300 rounded"></div>
//       <div className="mt-2 h-8 w-20 bg-gray-300 rounded"></div>
//     </div>
//   );
// }

// export function HistoryCustomCardSkeleton() {
//   return (
//     <div className="flex flex-col max-w-[535px] p-4 border border-solid border-neutral-200 bg-stone-50 rounded-[30px] animate-pulse">
//       <div className="flex space-x-4 mt-3">
//         {[...Array(3)].map((_, index) => (
//           <div key={index} className="w-24 h-24 bg-gray-300 rounded-xl"></div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function HistoryCard({ orderDate, var_total_amount, products, status }) {
//   const navigate = useNavigate();
//   const { convertPrice, selectedCurrency } = useCurrency(); // Currency conversion hook

//   // Convert `var_total_amount` safely
//   const rawPrice = var_total_amount ? var_total_amount.toString().trim() : "0";
//   const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;

//   // Convert price from USD to the selected currency
//   const displayPrice = convertPrice(priceInUSD) || "0.00";

//   // Navigate to Order Details Page
//   const handleViewDetails = () => {
//     navigate("/order-details", {
//       state: { orderDate, var_total_amount, products, status },
//     });
//     window.scrollTo(0, 0);
//   };

//   const stages = [
//     "Order Placed",
//     "Cutting & Stitching",
//     "Finishing & Packing",
//     "Order Delivered",
//   ];
//   const currentStageIndex = stages.indexOf(status);
//   const displayedProducts = products.slice(0, 2);
//   const hiddenProductsCount = products.length > 2 ? products.length - 2 : 0;

//   useEffect(() => {}, [products]);

//   return (
//     <article className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px] hover:shadow-lg transition-shadow duration-300">
//       <div className="bg-[#ECEFF5] px-3 py-1 flex flex-col items-start rounded-[20px]">
//         <time className="w-2/7 mt-2 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-[30px] shadow-sm">
//           {orderDate}
//         </time>

//         <div className="flex items-center justify-between gap-1 w-full max-w-xl mx-auto py-5 relative">
//           {stages.map((stage, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center relative w-full"
//             >
//               {/* Tracking Line (Behind Status Dots) */}
//               {index < stages.length - 1 && (
//                 <div
//                   className={`absolute top-[12%] left-[50%] -translate-x-[5%] h-[2px] w-full ${
//                     index < currentStageIndex ? "bg-black" : "bg-gray-300"
//                   } z-0`}
//                 />
//               )}

//               {/* Status Dot */}
//               <div
//                 className={`z-10 rounded-full h-5 w-5 flex items-center justify-center ${
//                   index <= currentStageIndex ? "bg-black" : "bg-gray-300"
//                 }`}
//               />

//               {/* Stage Label */}
//               <h3 className="mt-2 text-center text-[8px] xl:text-xs font-semibold h-14">
//                 {stage}
//               </h3>
//             </div>
//           ))}
//         </div>

//         <section className="flex gap-2.5 mt-9 relative">
//           {products.slice(0, 2).map((product, index) => (
//             <img
//               key={index}
//               loading="lazy"
//               src={product.imageUrl}
//               alt={product.productName}
//               className="object-contain shrink-0 max-w-full rounded-xl aspect-[0.74] w-[70px] xl:w-[80px] hover:scale-105 transition-transform duration-300 cursor-pointer"
//             />
//           ))}

//           {/* Show "+N More" If More Than 2 Images Exist */}
//           {products.length > 2 && (
//             <div className="relative">
//               <img
//                 loading="lazy"
//                 src={products[2].imageUrl}
//                 alt="More Products"
//                 className="object-contain shrink-0 max-w-full rounded-xl aspect-[0.74] w-[70px] xl:w-[80px] opacity-50"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
//                 <span className="text-white text-[8px] xl:text-xs font-medium">
//                   +{products.length - 2} More
//                 </span>
//               </div>
//             </div>
//           )}
//         </section>
//       </div>
//       <section className="flex gap-10 justify-between mt-6 tracking-tight leading-tight">
//         <div className="my-auto text-black">
//           <h2 className="text-sm md:text-base xl:text-lg font-medium">
//             {displayedProducts.map((product, index) => (
//               <span key={index}>
//                 {product.productName.length > 14
//                   ? product.productName.slice(0, 14) + "..."
//                   : product.productName}
//                 {index < displayedProducts.length - 1 && ", "}
//               </span>
//             ))}
//             {hiddenProductsCount > 0 && (
//               <span className="text-gray-500"> +{hiddenProductsCount}</span>
//             )}
//           </h2>
//           {/* Display price with currency symbol */}
//           <p className="mt-2 text-2xl font-semibold">
//             {getCurrencySymbol(selectedCurrency)}
//             {displayPrice}
//           </p>
//         </div>
//         <div className="flex justify-center items-center">
//           <button
//             className="px-5 py-2 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//             onClick={handleViewDetails}
//           >
//             Details
//           </button>
//         </div>
//       </section>
//     </article>
//   );
// }

// export default HistoryCard;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrency from "../../Currency/useCurrency";
import { getCurrencySymbol } from "../../Currency/currencyUtils";

// Shimmer keyframes and class
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

// Shimmer Skeleton (Styled like HistoryCard)
export function HistoryCardSkeleton() {
  return (
    <div className="flex flex-col max-w-[535px] p-4 border border-solid border-neutral-200 bg-stone-50 rounded-[30px]">
      <style>{shimmerStyle}</style>

      <div className="w-32 h-10 bg-white rounded-[30px] shadow-sm shimmer"></div>
      <div className="flex justify-between mt-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-4 h-4 bg-gray-300 rounded-full shimmer"></div>
        ))}
      </div>
      <div className="flex space-x-4 mt-5 md:mt-20">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-24 h-28 bg-gray-300 rounded-xl shimmer"></div>
        ))}
      </div>
      <div className="mt-6 h-4 w-2/3 bg-gray-300 rounded shimmer"></div>
      <div className="mt-2 h-8 w-20 bg-gray-300 rounded shimmer"></div>
      <div className="mt-4 flex justify-end">
        <div className="w-24 h-10 bg-gray-300 rounded-full shimmer"></div>
      </div>
    </div>
  );
}

export function HistoryCustomCardSkeleton() {
  return (
    <div className="flex flex-col max-w-[535px] p-4 border border-solid border-neutral-200 bg-stone-50 rounded-[30px]">
      <style>{shimmerStyle}</style>
      <div className="flex space-x-4 mt-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-24 h-24 bg-gray-300 rounded-xl shimmer"></div>
        ))}
      </div>
    </div>
  );
}

function HistoryCard({ _id, orderDate, var_total_amount, products, status }) {
  const navigate = useNavigate();
  const { convertPrice, selectedCurrency } = useCurrency();

  const rawPrice = var_total_amount ? var_total_amount.toString().trim() : "0";
  const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
  const displayPrice = convertPrice(priceInUSD) || "0.00";

  const handleViewDetails = () => {
    navigate("/order-details", {
      state: { _id, orderDate, var_total_amount, products, status },
    });
    window.scrollTo(0, 0);
  };

  const stages = [
    "Order Placed",
    "Cutting & Stitching",
    "Finishing & Packing",
    "Order Delivered",
  ];
  const currentStageIndex = stages.indexOf(status);
  const displayedProducts = products.slice(0, 2);
  const hiddenProductsCount = products.length > 2 ? products.length - 2 : 0;

  useEffect(() => {}, [products]);

  return (
    <article className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px] hover:shadow-lg transition-shadow duration-300">
      <div className="bg-[#ECEFF5] px-3 py-1 flex flex-col items-start rounded-[20px]">
        <time className="w-2/7 mt-2 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-[30px] shadow-sm">
          {orderDate}
        </time>

        <div className="flex items-center justify-between gap-1 w-full max-w-xl mx-auto py-5 relative">
          {stages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center relative w-full">
              {index < stages.length - 1 && (
                <div
                  className={`absolute top-[12%] left-[50%] -translate-x-[5%] h-[2px] w-full ${
                    index < currentStageIndex ? "bg-black" : "bg-gray-300"
                  } z-0`}
                />
              )}
              <div
                className={`z-10 rounded-full h-5 w-5 flex items-center justify-center ${
                  index <= currentStageIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
              <h3 className="mt-2 text-center text-[8px] xl:text-xs font-semibold h-14">
                {stage}
              </h3>
            </div>
          ))}
        </div>

        <section className="flex gap-2.5 mt-9 relative">
          {displayedProducts.map((product, index) => (
            <img
              key={index}
              loading="lazy"
              src={product.imageUrl}
              alt={product.productName}
              className="object-contain shrink-0 max-w-full rounded-xl aspect-[0.74] w-[70px] xl:w-[80px] hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          ))}

          {products.length > 2 && (
            <div className="relative">
              <img
                loading="lazy"
                src={products[2].imageUrl}
                alt="More Products"
                className="object-contain shrink-0 max-w-full rounded-xl aspect-[0.74] w-[70px] xl:w-[80px] opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <span className="text-white text-[8px] xl:text-xs font-medium">
                  +{products.length - 2} More
                </span>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="flex gap-10 justify-between mt-6 tracking-tight leading-tight">
        <div className="my-auto text-black">
          <h2 className="text-sm md:text-base xl:text-lg font-medium">
            {displayedProducts.map((product, index) => (
              <span key={index}>
                {product.productName.length > 14
                  ? product.productName.slice(0, 14) + "..."
                  : product.productName}
                {index < displayedProducts.length - 1 && ", "}
              </span>
            ))}
            {hiddenProductsCount > 0 && (
              <span className="text-gray-500"> +{hiddenProductsCount}</span>
            )}
          </h2>
          <p className="mt-2 text-2xl font-semibold">
            {getCurrencySymbol(selectedCurrency)}
            {displayPrice}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="px-5 py-2 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            onClick={handleViewDetails}
          >
            Details
          </button>
        </div>
      </section>
    </article>
  );
}

export default HistoryCard;