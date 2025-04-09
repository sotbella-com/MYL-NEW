// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { MdOutlineRemoveShoppingCart } from "react-icons/md";
// import CustomQueryListSkeleton from "./CustomQueryListSkeleton";

// // Base URL for API endpoints

// const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// const CustomQueryList = () => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedFileUrl, setSelectedFileUrl] = useState(null);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");
//       try {
//         const response = await axios.get(`${baseUrl}/v1/user/custom-query`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQueries(response.data.data || []);
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
//     window.open(fileUrl, "_blank"); // Opens the file in a new tab
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedFileUrl(null);
//   };

//   return (
//     <div className="p-6 bg-white mt-8">
//       <h1 className="font-jakarta text-xl md:text-6xl font-medium mb-10 text-center">
//         {loading
//           ? "Loading..."
//           : queries.length > 0
//           ? "Your Custom Queries"
//           : ""}
//       </h1>

//       {loading ? (
//         <CustomQueryListSkeleton />
//       ) : queries.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64">
//           <MdOutlineRemoveShoppingCart className="h-16 w-16 text-black" />
//           <h1 className="font-jakarta text-center text-lg md:text-6xl font-medium mt-4">
//             No Custom Queries Found
//           </h1>
//         </div>
//       ) : (
//         <div className="w-full max-w-[90vw] mx-auto">
//           {/* Header Section */}
//           <div className="flex gap-2 items-center bg-[#F9F9F9] border border-[#E4E4E4] p-3 md:p-4 rounded-lg text-sm md:text-[22px] font-semibold">
//             <div className="font-jakarta flex-1 flex items-center">
//               S.No
//               {/* Divider Line (Right beside S.No) */}
//               <div className="hidden md:block w-px h-5 bg-gray-400 ml-2 md:ml-4"></div>
//             </div>

//             <div className="font-jakarta flex-1 text-center">Description</div>

//             <div className="font-jakarta flex-1 flex justify-end items-center">
//               {/* Divider Line (Left beside Attachment) */}
//               <div className="hidden md:block w-px h-5 bg-gray-400 mr-2 md:mr-4"></div>
//               Attachment
//             </div>
//           </div>

//           {/* Query Items */}
//           {queries.map((query, index) => (
//             <div
//               key={query._id}
//               className="flex items-center justify-between gap-2 rounded-lg my-4 p-2 md:p-4 bg-[#F9F9F9] border border-[#E4E4E4] text-sm md:text-[22px] font-normal"
//             >
//               <div className="flex-1 flex items-center">
//                 <span>{String(index + 1).padStart(2, "0")}</span>
//                 {/* Divider Line (Right beside S.No) */}
//                 <div className="w-px h-7 bg-gray-400 ml-7 md:ml-12"></div>
//               </div>

//               <div className="flex-1 text-center truncate max-w-[200px] leading-tight">
//                 {query.description}
//               </div>

//               <div className="flex-1 flex justify-end items-center">
//                 {/* Divider Line (Left beside Attachment) */}
//                 <div className="w-px h-7 bg-gray-400 mr-2 md:mr-10"></div>
//                 {query.fileUrl ? (
//                   <button
//                     onClick={() => openModal(query.fileUrl)}
//                     className="bg-black text-white px-4 py-2 lg:py-3 rounded hover:bg-gray-800 transition-all text-xs md:text-[22px]"
//                   >
//                     View file
//                   </button>
//                 ) : (
//                   <span className="text-gray-500">No Attachment</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         // {/* <div className="overflow-x-auto w-full max-w-[90vw] mx-auto">
//         //   <table className="w-full border border-gray-300 text-left">
//         //     <thead>
//         //       <tr className="bg-[#F9F9F9] text-gray-800 text-lg font-semibold">
//         //         <th className="px-6 py-3 border-b border-gray-300">S.No</th>
//         //         <th className="px-6 py-3 border-b border-gray-300 text-center">
//         //           Description
//         //         </th>
//         //         <th className="px-6 py-3 border-b border-gray-300 text-right">
//         //           Attachment
//         //         </th>
//         //       </tr>
//         //     </thead>

//         //     <tbody>
//         //       {queries.map((query, index) => (
//         //         <tr
//         //           key={query._id}
//         //           className="bg-white hover:bg-gray-100 transition duration-200"
//         //         >

//         //           <td className="px-6 py-4 border-b border-gray-300 text-left font-semibold text-lg">
//         //             {String(index + 1).padStart(2, "0")}
//         //           </td>

//         //           <td className="px-6 py-4 border-b border-gray-300 text-center truncate max-w-[300px]">
//         //             {query.description.length > 50
//         //               ? `${query.description.slice(0, 50)}...`
//         //               : query.description}
//         //           </td>

//         //           <td className="px-6 py-4 border-b border-gray-300 text-right">
//         //             {query.fileUrl ? (
//         //               <button
//         //                 onClick={() => openModal(query.fileUrl)}
//         //                 className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-all"
//         //               >
//         //                 View File
//         //               </button>
//         //             ) : (
//         //               <span className="text-gray-500">No Attachment</span>
//         //             )}
//         //           </td>
//         //         </tr>
//         //       ))}
//         //     </tbody>
//         //   </table>
//         // </div>
//       )}

//       {/* Modal for file preview */}
//       {/* <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Attachment Viewer"
//         className="flex justify-center items-center h-full"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
//       >
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90%] overflow-auto">
//           <button
//             onClick={closeModal}
//             className="text-black bg-gray-200 px-4 py-2 rounded float-right m-5"
//           >
//             Close
//           </button>
//           {selectedFileUrl && (
//             <div className="mt-6">
//               {selectedFileUrl.endsWith(".pdf") ? (
//                 <iframe
//                   src={selectedFileUrl}
//                   title="PDF Viewer"
//                   className="w-full h-96"
//                   frameBorder="0"
//                 ></iframe>
//               ) : (
//                 <img
//                   src={selectedFileUrl}
//                   alt="Attachment"
//                   className="w-full"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </Modal> */}
//     </div>
//   );
// };

// export default CustomQueryList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import CustomQueryListSkeleton from "./CustomQueryListSkeleton";
import { useExport } from "../Product/Listing/Components/ExportContext";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const CustomQueryList = () => {
  const { setExportData } = useExport();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  // useEffect(() => {
  //   const fetchQueries = async () => {
  //     const token = localStorage.getItem("accessToken");
  //     try {
  //       const res = await axios.get(`${baseUrl}/v1/user/custom-query`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setQueries(res.data.data || []);
  //     } catch (err) {
  //       console.error("Fetch error", err);
  //     } finally {
  //       setTimeout(() => setLoading(false), 1500); // Maintain shimmer for 1.5s
  //     }
  //   };

  //   fetchQueries();
  // }, []);

  // const openModal = (url) => {
  //   setSelectedFileUrl(url);
  //   window.open(url, "_blank");
  // };

  // if (loading) {
  //   return <CustomQueryListSkeleton />;
  // }
  useEffect(() => {
    const fetchQueries = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axios.get(`${baseUrl}/v1/user/custom-query`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Set queries after fetching
        setQueries(res.data.data || []);

        // ✅ Set export data to enable export functionality
        setExportData(res.data.data || []); // Important for export
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setTimeout(() => setLoading(false), 1500); // Maintain shimmer for 1.5s
      }
    };

    fetchQueries();
  }, [setExportData]);

  const openModal = (url) => {
    setSelectedFileUrl(url);
    window.open(url, "_blank");
  };

  if (loading) {
    return <CustomQueryListSkeleton />;
  }

  return (
    <div id="export-area" className="p-6 bg-white mt-8">
      {queries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <MdOutlineRemoveShoppingCart className="h-16 w-16 text-black" />
          <h1 className="font-jakarta text-center text-lg md:text-6xl font-medium mt-4">
            No Custom Queries Found
          </h1>
        </div>
      ) : (
        <div className="w-full max-w-[90vw] mx-auto">
          <h1 className="font-jakarta text-xl md:text-6xl font-medium mb-10 text-center">
            Your Custom Queries
          </h1>

          {/* Header */}
          <div className="flex gap-2 items-center bg-[#F9F9F9] border border-[#E4E4E4] p-3 md:p-4 rounded-lg text-sm md:text-[22px] font-semibold">
            <div className="font-jakarta flex-1 flex items-center">
              S.No
              <div className="hidden md:block w-px h-5 bg-gray-400 ml-2 md:ml-4"></div>
            </div>
            <div className="font-jakarta flex-1 text-center">Description</div>
            <div className="font-jakarta flex-1 flex justify-end items-center">
              <div className="hidden md:block w-px h-5 bg-gray-400 mr-2 md:mr-4"></div>
              Attachment
            </div>
          </div>

          {/* Rows */}
          {queries.map((query, index) => (
            <div
              key={query._id}
              className="flex items-center justify-between gap-2 rounded-lg my-4 p-2 md:p-4 bg-[#F9F9F9] border border-[#E4E4E4] text-sm md:text-[22px] font-normal"
            >
              <div className="flex-1 flex items-center">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="w-px h-7 bg-gray-400 ml-7 md:ml-12"></div>
              </div>

              <div className="flex-1 text-center truncate max-w-[200px] leading-tight">
                {query.description}
              </div>

              <div className="flex-1 flex justify-end items-center">
                <div className="w-px h-7 bg-gray-400 mr-2 md:mr-10"></div>
                {query.fileUrl ? (
                  <button
                    onClick={() => openModal(query.fileUrl)}
                    className="bg-black text-white px-4 py-2 lg:py-3 rounded hover:bg-gray-800 transition-all text-xs md:text-[22px]"
                  >
                    View file
                  </button>
                ) : (
                  <span className="text-gray-500">No Attachment</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomQueryList;
