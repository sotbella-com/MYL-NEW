// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;
// const ExportContext = createContext();

// export const ExportProvider = ({ children }) => {
//   const location = useLocation();
//   const [data, setData] = useState([]);
//   const [route, setRoute] = useState(location.pathname);

//   useEffect(() => {
//     setRoute(location.pathname);

//     const fetchData = async () => {
//       try {
//         let response;

//         switch (location.pathname) {
//           case "/collections":
//             try {
//               const response = await fetch(`${baseURL}/v1/products`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   from_price: 0,
//                   to_price: 1000,
//                   fk_category: "", 
//                   page: 1,
//                   limit: 1000, 
//                 }),
//               });

//               const result = await response.json();
//               setData(result.data || []);
//             } catch (err) {
//               console.error("Collections export failed", err);
//               setData([]);
//             }
//             break;

//           case "/cart":
//             response = await axios.get(`${baseURL}/v1/carts`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//             });
//             setData(response.data.data || []);
//             break;

//           case "/custom-query-list":
//             response = await axios.get(`${baseURL}/v1/user/custom-query`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//             });
//             setData(response.data.data || []);
//             break;

//           case "/history":
//             response = await axios.get(`${baseURL}/v1/queries`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//             });
//             setData(response.data.data || []);
//             break;

//           case "/search":
//             response = await fetch(`${baseURL}/v1/search`);
//             setData(await response.json());
//             break;

//           default:
//             setData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching export data:", error);
//         setData([]);
//       }
//     };

//     fetchData();
//   }, [location.pathname]);

//   return (
//     <ExportContext.Provider value={{ data, route }}>
//       {children}
//     </ExportContext.Provider>
//   );
// };

// export const useExport = () => useContext(ExportContext);


import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ExportContext = createContext();

export const ExportProvider = ({ children }) => {
  const location = useLocation();
  const [exportData, setExportData] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <ExportContext.Provider value={{ exportData, setExportData, currentRoute }}>
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = () => useContext(ExportContext);
