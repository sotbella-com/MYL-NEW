// import React, { useEffect, useState } from "react";
// import HistoryCard, {
//   HistoryCardSkeleton,
//   HistoryCustomCardSkeleton,
// } from "./HistoryCard";

// import CustomQueryList from "../CustomQuery/CustomQueryList";

// // import { exportToCSV, exportToPDF } from "../Product/Listing/Components/exportData";
// import axios from "axios";
// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// import CustomQuesryList from "../CustomQuery/CustomQueryList";

// function HistoryList() {
//   const [queries, setQueries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAllRecent, setShowAllRecent] = useState(false);
//   const [showAllHistory, setShowAllHistory] = useState(false);
//   // const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       // setIsLoading(true);
//       try {
//         const response = await axios.get(`${baseURL}/v1/queries`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         });
//         setTimeout(() => {
//           setQueries(response.data.data);
//           setIsLoading(false);
//         }, 2000); // 3 seconds delay for skeletons
//       } catch (error) {
//         setIsLoading(false);
//       }
//     };

//     fetchQueries();
//   }, []);

//   const baseUrl = import.meta.env.VITE_APP_BASE_URL;

//   const [queriesCustom, setCustomQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);
//   const [showAllCustomQuery, setShowAllCustomQuery] = useState(false);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");
//       try {
//         const response = await axios.get(`${baseUrl}/v1/user/custom-query`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCustomQueries(response.data.data || []);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQueries();
//   }, []);

//   const openModal = (fileUrl) => {
//     setSelectedFileUrl(fileUrl);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedFileUrl(null);
//   };
//   const stages = [
//     "Order Placed",
//     "Cutting & Stitching",
//     "Finishing & Packing",
//     "Order Delivered",
//   ];

//   const MAX_LENGTH = 20;

//   function QueryDescription({ description }) {
//     const [showFull, setShowFull] = useState(false);

//     const toggleShowFull = () => {
//       setShowFull((prev) => !prev);
//     };

//     return (
//       <h2 className="text-sm md:text-base xl:text-lg font-medium">
//         {showFull || description.length <= MAX_LENGTH
//           ? description
//           : `${description.slice(0, MAX_LENGTH)}... `}
//         {description.length > MAX_LENGTH && (
//           <button
//             className="text-blue-500 underline ml-2"
//             onClick={toggleShowFull}
//           >
//             {showFull ? "See Less" : "See More"}
//           </button>
//         )}
//       </h2>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col w-[90vw] mx-auto mt-20 mb-10">
//         {/* Title & See All Button */}
//         <div className="flex justify-between items-center w-full">
//           <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
//             Recent Orders
//           </div>

//           {/* Show "See All" button only if there are more than 3 products */}
//           {queries.length > 3 && (
//             <button
//               className="text-black font-medium underline cursor-pointer"
//               onClick={() => setShowAllRecent((prev) => !prev)}
//             ></button>
//           )}
//         </div>

//         {/* Grid Layout for Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <HistoryCardSkeleton key={index} duration={1500}/>
//             ))
//           ) : queries.length === 0 ? (
//             <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//               No Queries Found
//             </div>
//           ) : (
//             queries
//               .slice(0, showAllRecent ? queries.length : 3) // ✅ Only shows 3 products unless "See All" is clicked
//               .map((query, index) => (
//                 <HistoryCard
//                   key={index}
//                   orderDate={new Date(
//                     query.dt_createddate
//                   ).toLocaleDateString()}
//                   var_total_amount={query.var_total_amount}
//                   products={query.fk_product_arr.map((product) => ({
//                     productName: product.fk_product_name || "Unknown Product",
//                     sku: product.sku || "Unknown SKU",
//                     quantity:
//                       product.quantity?.$numberInt || product.quantity || 0,
//                     imageUrl:
//                       product.imageUrl || "https://via.placeholder.com/50",
//                     price: product.price || 0,
//                   }))}
//                   status={query.chr_status || "Order Placed"}
//                 />
//               ))
//           )}
//         </div>
//       </div>

//       <div className="flex flex-col w-[90vw] mx-auto mt-20 mb-10">
//         {/* Title & See All Button */}
//         <div className="flex justify-between items-center w-full">
//           <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
//             History Orders ({queries.length})
//           </div>

//           {/* Show "See All" button only if there are more than 3 products */}
//           {queries.length > 3 && (
//             <button
//               className="text-black font-medium underline cursor-pointer"
//               onClick={() => setShowAllHistory((prev) => !prev)}
//             >
//               {showAllHistory ? "See Less" : "See All"}
//             </button>
//           )}
//         </div>

//         {/* Grid Layout for Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <HistoryCardSkeleton key={index} duration={1500} />
//             ))
//           ) : queries.length === 0 ? (
//             <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//               No Queries Found
//             </div>
//           ) : (
//             queries
//               .slice(0, showAllHistory ? queries.length : 3) // ✅ Only shows 3 products unless "See All" is clicked
//               .map((query, index) => (
//                 <HistoryCard
//                   key={index}
//                   orderDate={new Date(
//                     query.dt_createddate
//                   ).toLocaleDateString()}
//                   var_total_amount={query.var_total_amount}
//                   products={query.fk_product_arr.map((product) => ({
//                     productName: product.fk_product_name || "Unknown Product",
//                     sku: product.sku || "Unknown SKU",
//                     quantity:
//                       product.quantity?.$numberInt || product.quantity || 0,
//                     imageUrl:
//                       product.imageUrl || "https://via.placeholder.com/50",
//                     price: product.price || 0,
//                   }))}
//                   status={query.chr_status || "Order Placed"}
//                 />
//               ))
//           )}
//         </div>

//         <div className="mt-20">

//           <h1 className="font-jakarta text-xl md:text-6xl font-medium mb-10 text-center">
//             <div className="flex justify-between items-center w-full">
//               <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black ">
//                 Your Custom Queries ({queriesCustom.length})
//               </div>

//               {/* Show "See All" button only if there are more than 3 products */}
//               {queriesCustom.length > 3 && (
//                 <button
//                   className="text-black font-medium underline cursor-pointer text-sm"
//                   onClick={() => setShowAllCustomQuery((prev) => !prev)}
//                 >
//                   {showAllCustomQuery ? "See Less" : "See All"}
//                 </button>
//               )}
//             </div>
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//             {loading ? (
//               Array.from({ length: 6 }).map((_, index) => (
//                 <HistoryCardSkeleton key={index} duration={1500} />
//               ))
//             ) : queriesCustom.length === 0 ? (
//               <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//                 No Queries Found
//                 {queriesCustom.length}
//               </div>
//             ) : (
//               queriesCustom
//                 .slice(0, showAllCustomQuery ? queriesCustom.length : 3) // ✅ Only shows 3 products unless "See All" is clicked
//                 .map((query, index) => (
//                   <div>
//                     <article className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px] hover:shadow-lg transition-shadow duration-300">
//                       <div className="bg-[#ECEFF5] px-3 py-1 flex flex-col items-start rounded-[20px]">
//                         <time className="w-2/7 mt-2 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-[30px] shadow-sm">
//                           {query.created_date}
//                         </time>
//                         <div className="flex items-center justify-between gap-1 w-full max-w-xl mx-auto py-5 relative">
//                           {stages.map((stage, index) => (
//                             <div
//                               key={index}
//                               className="flex flex-col items-center relative w-full"
//                             >
//                               {/* Tracking Line (Behind Status Dots) */}
//                               {index < stages.length - 1 && (
//                                 <div
//                                   className={`absolute top-[12%] left-[50%] -translate-x-[5%] h-[2px] w-full ${
//                                     index < 1 ? "bg-black" : "bg-gray-300"
//                                   } z-0`}
//                                 />
//                               )}

//                               {/* Status Dot */}
//                               <div
//                                 className={`z-10 rounded-full h-5 w-5 flex items-center justify-center ${
//                                   index <= 0 ? "bg-black" : "bg-gray-300"
//                                 }`}
//                               />

//                               {/* Stage Label */}
//                               <h3 className="mt-2 text-center text-[8px] xl:text-xs font-semibold h-14">
//                                 {stage}
//                               </h3>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <section className="flex gap-10 justify-between mt-6 tracking-tight leading-tight">
//                         <div className="my-auto text-black">
//                           <h2 className="text-sm md:text-base xl:text-lg font-medium">
//                             <QueryDescription description={query.description} />
//                           </h2>
//                         </div>
//                         <div className="flex justify-center items-center">
//                           <button
//                             className="px-5 py-2 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//                             onClick={() =>
//                               window.open(
//                                 query.fileUrl,
//                                 "_blank",
//                                 "noopener,noreferrer"
//                               )
//                             }
//                           >
//                             View File
//                           </button>
//                         </div>
//                       </section>
//                     </article>
//                   </div>
//                 ))
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default HistoryList;

// import React, { useEffect, useState } from "react";
// import HistoryCard, {
//   HistoryCardSkeleton,
//   HistoryCustomCardSkeleton,
// } from "./HistoryCard";
// import QueryDescription, { QueryDescriptionSkeleton } from "./QueryDescription";
// import axios from "axios";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// function HistoryList() {
//   const [queries, setQueries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAllRecent, setShowAllRecent] = useState(false);
//   const [showAllHistory, setShowAllHistory] = useState(false);

//   const [queriesCustom, setCustomQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAllCustomQuery, setShowAllCustomQuery] = useState(false);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/v1/queries`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         });
//         setTimeout(() => {
//           setQueries(response.data.data);
//           setIsLoading(false);
//         }, 2000);
//       } catch (error) {
//         setIsLoading(false);
//       }
//     };
//     fetchQueries();
//   }, []);

//   useEffect(() => {
//     const fetchCustomQueries = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${baseURL}/v1/user/custom-query`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         });
//         setCustomQueries(response.data.data || []);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomQueries();
//   }, []);

//   const stages = [
//     "Order Placed",
//     "Cutting & Stitching",
//     "Finishing & Packing",
//     "Order Delivered",
//   ];

//   return (
//     <>
//       <div className="flex flex-col w-[90vw] mx-auto mt-20 mb-10">
//         <div className="flex justify-between items-center w-full">
//           <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
//             Recent Orders
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <HistoryCardSkeleton key={index} />
//             ))
//           ) : queries.length === 0 ? (
//             <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//               No Queries Found
//             </div>
//           ) : (
//             queries
//               .slice(0, showAllRecent ? queries.length : 3)
//               .map((query, index) => (
//                 <HistoryCard
//                   key={index}
//                   orderDate={new Date(
//                     query.dt_createddate
//                   ).toLocaleDateString()}
//                   var_total_amount={query.var_total_amount}
//                   products={query.fk_product_arr.map((product) => ({
//                     productName: product.fk_product_name || "Unknown Product",
//                     sku: product.sku || "Unknown SKU",
//                     quantity:
//                       product.quantity?.$numberInt || product.quantity || 0,
//                     imageUrl:
//                       product.imageUrl || "https://via.placeholder.com/50",
//                     price: product.price || 0,
//                   }))}
//                   status={query.chr_status || "Order Placed"}
//                 />
//               ))
//           )}
//         </div>
//       </div>

//       <div className="flex flex-col w-[90vw] mx-auto mt-20 mb-10">
//         <div className="flex justify-between items-center w-full">
//           <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
//             History Orders ({queries.length})
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <HistoryCardSkeleton key={index} />
//             ))
//           ) : queries.length === 0 ? (
//             <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//               No Queries Found
//             </div>
//           ) : (
//             queries
//               .slice(0, showAllHistory ? queries.length : 3)
//               .map((query, index) => (
//                 <HistoryCard
//                   key={index}
//                   orderDate={new Date(
//                     query.dt_createddate
//                   ).toLocaleDateString()}
//                   var_total_amount={query.var_total_amount}
//                   products={query.fk_product_arr.map((product) => ({
//                     productName: product.fk_product_name || "Unknown Product",
//                     sku: product.sku || "Unknown SKU",
//                     quantity:
//                       product.quantity?.$numberInt || product.quantity || 0,
//                     imageUrl:
//                       product.imageUrl || "https://via.placeholder.com/50",
//                     price: product.price || 0,
//                   }))}
//                   status={query.chr_status || "Order Placed"}
//                 />
//               ))
//           )}
//         </div>

//         <div className="mt-20">
//           <h1 className="font-jakarta text-xl md:text-6xl font-medium mb-10 text-center">
//             <div className="flex justify-between items-center w-full">
//               <div className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
//                 Your Custom Queries ({queriesCustom.length})
//               </div>
//             </div>
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
//             {loading ? (
//               Array.from({ length: 6 }).map((_, index) => (
//                 <HistoryCustomCardSkeleton key={index} />
//               ))
//             ) : queriesCustom.length === 0 ? (
//               <div className="col-span-full text-center text-lg md:text-5xl font-semibold">
//                 No Queries Found
//               </div>
//             ) : (
//               queriesCustom
//                 .slice(0, showAllCustomQuery ? queriesCustom.length : 3)
//                 .map((query, index) => (
//                   <article
//                     key={index}
//                     className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px] hover:shadow-lg transition-shadow duration-300"
//                   >
//                     <div className="bg-[#ECEFF5] px-3 py-1 flex flex-col items-start rounded-[20px]">
//                       <time className="w-2/7 mt-2 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-[30px] shadow-sm">
//                         {query.created_date}
//                       </time>
//                       <div className="flex items-center justify-between gap-1 w-full max-w-xl mx-auto py-5 relative">
//                         {stages.map((stage, stageIndex) => (
//                           <div
//                             key={stageIndex}
//                             className="flex flex-col items-center relative w-full"
//                           >
//                             {stageIndex < stages.length - 1 && (
//                               <div
//                                 className={`absolute top-[12%] left-[50%] -translate-x-[5%] h-[2px] w-full ${
//                                   stageIndex < 1 ? "bg-black" : "bg-gray-300"
//                                 } z-0`}
//                               />
//                             )}
//                             <div
//                               className={`z-10 rounded-full h-5 w-5 flex items-center justify-center ${
//                                 stageIndex <= 0 ? "bg-black" : "bg-gray-300"
//                               }`}
//                             />
//                             <h3 className="mt-2 text-center text-[8px] xl:text-xs font-semibold h-14">
//                               {stage}
//                             </h3>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <section className="flex gap-10 justify-between mt-6 tracking-tight leading-tight">
//                       <div className="my-auto text-black">
//                         {loading ? (
//                           <QueryDescriptionSkeleton />
//                         ) : (
//                           <QueryDescription description={query.description} />
//                         )}
//                       </div>
//                       <div className="flex justify-center items-center">
//                         <button
//                           className="px-5 py-2 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//                           onClick={() => window.open(query.fileUrl, "_blank")}
//                         >
//                           View File
//                         </button>
//                       </div>
//                     </section>
//                   </article>
//                 ))
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default HistoryList;

import React, { useEffect, useState } from "react";
import HistoryCard, {
  HistoryCardSkeleton,
  HistoryCustomCardSkeleton,
} from "./HistoryCard";
import axios from "axios";
import QueryDescription, { QueryDescriptionSkeleton } from "./QueryDescription";
import { useExport } from "../Product/Listing/Components/ExportContext";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

function HistoryList() {
  const { setExportData } = useExport();
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const [queriesCustom, setCustomQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllCustomQuery, setShowAllCustomQuery] = useState(false);


  useEffect(() => {
    if (queries.length > 0) {
      setExportData(queries);
    }
  }, [queries]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${baseURL}/v1/queries`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setTimeout(() => {
          setQueries(response.data.data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchQueries();
  }, []);

  useEffect(() => {
    const fetchCustomQueries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/v1/user/custom-query`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setTimeout(() => {
          setCustomQueries(response.data.data || []);
          setLoading(false);
        }, 1500);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCustomQueries();
  }, []);

  const stages = [
    "Order Placed",
    "Cutting & Stitching",
    "Finishing & Packing",
    "Order Delivered",
  ];

  return (
    <div
      id="export-area"
      className="flex flex-col w-[90vw] mx-auto mt-20 mb-10"
    >
      {/* Recent Orders */}
      <div className="flex justify-between items-center w-full">
        <h1 className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
          Recent Queries
        </h1>
        {queries.length > 3 && (
          <button
            className="text-black font-medium underline cursor-pointer"
            onClick={() => setShowAllRecent((prev) => !prev)}
          >
            {showAllRecent ? "See Less" : "See All"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <HistoryCardSkeleton key={index} />
            ))
          : queries
              .slice(0, showAllRecent ? queries.length : 3)
              .map((query, index) => (
                <HistoryCard
                  key={index}
                  _id={query._id} // ✅ Add this
                  orderDate={new Date(
                    query.dt_createddate
                  ).toLocaleDateString()}
                  var_total_amount={query.var_total_amount}
                  products={query.fk_product_arr.map((product) => ({
                    ProductId: product.fk_product,
                    productName: product.fk_product_name || "Unknown Product",
                    sku: product.sku || "Unknown SKU",
                    quantity:
                      product.quantity?.$numberInt || product.quantity || 0,
                    imageUrl:
                      product.imageUrl || "https://via.placeholder.com/50",
                    price: product.price || 0,
                  }))}
                  status={query.chr_status || "Order Placed"}
                />
              ))}
      </div>

      {/* History Orders */}
      <div className="mt-20">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
            History ({queries.length})
          </h1>
          {queries.length > 3 && (
            <button
              className="text-black font-medium underline cursor-pointer"
              onClick={() => setShowAllHistory((prev) => !prev)}
            >
              {showAllHistory ? "See Less" : "See All"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <HistoryCardSkeleton key={index} />
              ))
            : queries
                .slice(0, showAllHistory ? queries.length : 3)
                .map((query, index) => (
                  <HistoryCard
                  key={index}
                  _id={query._id} // ✅ Add this
                  orderDate={new Date(
                    query.dt_createddate
                  ).toLocaleDateString()}
                  var_total_amount={query.var_total_amount}
                  products={query.fk_product_arr.map((product) => ({
                    ProductId: product.fk_product,
                    productName: product.fk_product_name || "Unknown Product",
                    sku: product.sku || "Unknown SKU",
                    quantity:
                      product.quantity?.$numberInt || product.quantity || 0,
                    imageUrl:
                      product.imageUrl || "https://via.placeholder.com/50",
                    price: product.price || 0,
                  }))}
                  status={query.chr_status || "Order Placed"}
                />
                ))}
        </div>
      </div>

      {/* Custom Queries */}
      <div className="mt-20">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-jakarta text-2xl md:text-3xl xl:text-5xl font-medium text-black">
            Your Custom Queries ({queriesCustom.length})
          </h1>
          {queriesCustom.length > 3 && (
            <button
              className="text-black font-medium underline cursor-pointer"
              onClick={() => setShowAllCustomQuery((prev) => !prev)}
            >
              {showAllCustomQuery ? "See Less" : "See All"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 font-medium">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={index}
                  className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px]"
                >
                  <div className="bg-gray-100 px-3 py-1 flex flex-col items-start rounded-[20px]">
                    <div className="w-24 h-6 bg-gray-300 shimmer rounded mb-4"></div>
                    <div className="flex items-center gap-1 w-full py-5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 bg-gray-300 rounded-full shimmer mx-1"
                        />
                      ))}
                    </div>
                  </div>
                  <section className="flex gap-10 justify-between mt-6">
                    <QueryDescriptionSkeleton />
                    <div className="w-20 h-9 bg-gray-300 shimmer rounded-full" />
                  </section>
                </article>
              ))
            : queriesCustom
                .slice(0, showAllCustomQuery ? queriesCustom.length : 3)
                .map((query, index) => (
                  <article
                    key={index}
                    className="flex flex-col overflow-hidden px-3 pt-3 pb-5 bg-stone-50 border border-solid border-neutral-200 rounded-[30px] hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="bg-[#ECEFF5] px-3 py-1 flex flex-col items-start rounded-[20px]">
                      <time className="w-2/7 mt-2 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-[30px] shadow-sm">
                        {query.created_date}
                      </time>
                      <div className="flex items-center justify-between gap-1 w-full max-w-xl mx-auto py-5 relative">
                        {stages.map((stage, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center relative w-full"
                          >
                            {i < stages.length - 1 && (
                              <div
                                className={`absolute top-[12%] left-[50%] -translate-x-[5%] h-[2px] w-full ${
                                  i < 1 ? "bg-black" : "bg-gray-300"
                                } z-0`}
                              />
                            )}
                            <div
                              className={`z-10 rounded-full h-5 w-5 flex items-center justify-center ${
                                i <= 0 ? "bg-black" : "bg-gray-300"
                              }`}
                            />
                            <h3 className="mt-2 text-center text-[8px] xl:text-xs font-semibold h-14">
                              {stage}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                    <section className="flex gap-10 justify-between mt-6">
                      <div className="my-auto text-black">
                        <QueryDescription description={query.description} />
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          className="px-5 py-2 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          onClick={() => window.open(query.fileUrl, "_blank")}
                        >
                          View File
                        </button>
                      </div>
                    </section>
                  </article>
                ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryList;
