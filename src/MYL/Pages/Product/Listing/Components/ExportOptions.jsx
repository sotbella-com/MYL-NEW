// import React, { useState } from "react";
// import { exportToCSV, exportToPDF } from "../Components/exportData";

// const ExportOptions = () => {
//   const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
//         className="px-5 py-4 lg:py-2 bg-black text-white rounded-lg font-medium flex justify-center items-center text-center hover:bg-gray-900 w-full lg:w-auto"
//         title="Export Options"
//       >
//         <span className="mr-1 text-base">Export</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className={`w-5 h-5 transition-transform duration-300 ${isExportDropdownOpen ? "rotate-180" : ""}`}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isExportDropdownOpen && (
//         <div className="absolute w-full lg:w-auto right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50">
//           <button
//             onClick={() => { exportToCSV(products); setIsExportDropdownOpen(false); }}
//             className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//           >
//             Export as CSV
//           </button>
//           <button
//             onClick={() => { exportToPDF(products); setIsExportDropdownOpen(false); }}
//             className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//           >
//             Export as PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExportOptions;


// import React, { useState } from "react";
// import { exportToCSV, exportToPDF } from "../Components/exportData";
// import { useExport } from "./ExportContext"; // ✅ import the context

// const ExportOptions = () => {
//   const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
//   const { data, route } = useExport(); // ✅ consume the context

//   const handleCSVExport = () => {
//     if (!data.length) {
//       alert("No data available to export.");
//       return;
//     }
//     exportToCSV(data, `data_export_${route.replace("/", "")}`);
//     setIsExportDropdownOpen(false);
//   };

//   const handlePDFExport = () => {
//     if (!data.length) {
//       alert("No data available to export.");
//       return;
//     }
//     exportToPDF(data, `data_export_${route.replace("/", "")}`);
//     setIsExportDropdownOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
//         className="px-5 py-4 lg:py-2 bg-black text-white rounded-lg font-medium flex justify-center items-center text-center hover:bg-gray-900 w-full lg:w-auto"
//         title="Export Options"
//       >
//         <span className="mr-1 text-base">Export</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className={`w-5 h-5 transition-transform duration-300 ${isExportDropdownOpen ? "rotate-180" : ""}`}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isExportDropdownOpen && (
//         <div className="absolute w-full lg:w-auto right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50">
//           <button
//             onClick={handleCSVExport}
//             className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//           >
//             Export as CSV
//           </button>
//           <button
//             onClick={handlePDFExport}
//             className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//           >
//             Export as PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExportOptions;



// screenshot pdf

// import React, { useState } from "react";
// import { useExport } from "./ExportContext";
// import { exportToCSV } from "./exportData";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const ExportOptions = () => {
//   const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
//   const { exportData, currentRoute } = useExport();

//   const isValidRoute = () =>
//     ["/collections", "/cart", "/history", "/order-detail", "/product-details/id"].some((route) =>
//       currentRoute.includes(route)
//     );

//   const getFileName = () => {
//     if (currentRoute.includes("/collections")) return "collections_data";
//     if (currentRoute.includes("/cart")) return "cart_data";
//     if (currentRoute.includes("/history")) return "history_data";
//     if (currentRoute.includes("/order-detail")) return "order_detail_data";
//     if (currentRoute.includes("/product-details/id")) return "product_detail_data";
//     return "exported_data";
//   };

//   const exportScreenshotPDF = async (filename = "screenshot_export") => {
//     const element = document.getElementById("export-area");
//     if (!element) {
//       alert("Export area not found in the DOM.");
//       return;
//     }

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const imgWidth = 210; // A4 width in mm
//     const pageHeight = 297; // A4 height in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       position -= pageHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save(`${filename}_${new Date().toISOString()}.pdf`);
//   };

//   const handleExport = (type) => {
//     if (!exportData || exportData.length === 0) {
//       alert("No data available to export.");
//       return;
//     }

//     const filename = getFileName();
//     if (type === "csv") exportToCSV(exportData, filename, currentRoute);
//     else if (type === "screenshot") exportScreenshotPDF(filename);

//     setIsExportDropdownOpen(false);
//   };

//   return (
//     <div className="relative z-50">
//       <button
//         onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
//         className="px-5 py-4 lg:py-2 bg-black text-white rounded-lg font-medium flex justify-center items-center text-center hover:bg-gray-900 w-full lg:w-auto"
//         title="Export Options"
//       >
//         <span className="mr-1 text-base">Export</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//           className={`w-5 h-5 transition-transform duration-300 ${isExportDropdownOpen ? "rotate-180" : ""}`}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isExportDropdownOpen && (
//         <div className="absolute w-full lg:w-auto right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50">
//           {isValidRoute() && exportData.length > 0 ? (
//             <>
//               <button
//                 onClick={() => handleExport("csv")}
//                 className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//               >
//                 Export as CSV
//               </button>
//               <button
//                 onClick={() => handleExport("screenshot")}
//                 className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//               >
//                 Export as PDF
//               </button>
//             </>
//           ) : (
//             <div className="px-4 py-2 text-gray-500 text-sm text-center">
//               No data available
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExportOptions;



import React, { useContext, useState } from "react";
import { useExport } from "./ExportContext";
import { exportToCSV, exportToPDF } from "./ExportData.jsx"; 
import { CurrencyContext } from "../../../../Currency/CurrencyContext";

const ExportOptions = ({ closeMenu }) => {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const { exportData, currentRoute } = useExport();
  const { selectedCurrency, exchangeRates } = useContext(CurrencyContext);

  const isValidRoute = () =>
    ["/collections", "/cart", "/history", "/order-detail", "/product-details/id", "/custom-query-list"].some((route) =>
      currentRoute.includes(route)
    );
  

  const getFileName = () => {
    if (currentRoute.includes("/collections")) return "collections_data";
    if (currentRoute.includes("/cart")) return "cart_data";
    if (currentRoute.includes("/history")) return "history_data";
    if (currentRoute.includes("/order-detail")) return "order_detail_data";
    if (currentRoute.includes("/product-details/id")) return "product_detail_data";
    if (currentRoute.includes("/custom-query-list")) return "custom_query_data";
    return "exported_data";
  };

  const handleExport = (type) => {
    if (!exportData || exportData.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const filename = getFileName();
  
    if (type === "csv") {
      exportToCSV(exportData, filename, currentRoute, selectedCurrency, exchangeRates);
    } else if (type === "pdf") {
      exportToPDF(exportData, filename, currentRoute, selectedCurrency, exchangeRates);
    }
  
    setIsExportDropdownOpen(false);
  
    // ✅ Close mobile menu if `closeMenu` prop is provided
    if (typeof closeMenu === "function") {
      closeMenu();
    }
  };
  
  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
        className="px-5 py-4 lg:py-2 bg-black text-white rounded-lg font-medium flex justify-center items-center text-center hover:bg-gray-900 w-full lg:w-auto"
        title="Export Options"
      >
        <span className="mr-1 text-base">Export</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform duration-300 ${isExportDropdownOpen ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExportDropdownOpen && (
        <div className="absolute w-full lg:w-auto right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50">
          {isValidRoute() && exportData.length > 0 ? (
            <>
              <button
                onClick={() => handleExport("csv")}
                className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
              >
                Export as PDF
              </button>
            </>
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm text-center">
              No data available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportOptions;
