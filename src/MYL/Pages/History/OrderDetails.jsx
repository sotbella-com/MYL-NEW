// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const OrderDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderDate, var_total_amount, products, status } =
//     location.state || {};

//   if (!location.state) {
//     return (
//       <div className="p-6 text-lg font-medium">No order details found.</div>
//     );
//   }

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl max-h-[80%] overflow-y-auto mt-10">
//         <h3 className="text-base lg:text-lg font-semibold mb-4">
//           Product Details
//         </h3>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="text-sm lg:text-base">
//               <th className="border border-gray-300 px-2 lg:px-4 py-1">
//                 Image
//               </th>
//               <th className="border border-gray-300 px-2 lg:px-4 py-1">Name</th>
//               <th className="border border-gray-300 px-2 lg:px-4 py-1">SKU</th>
//               <th className="border border-gray-300 px-2 lg:px-4 py-1">Qty</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index} className="text-xs lg:text-sm">
//                 <td className="border border-gray-300 px-2 py-1 flex justify-center items-center">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.productName}
//                     className="w-10 h-12 object-cover"
//                   />
//                 </td>
//                 <td className="border border-gray-300 px-2 lg:px-4 py-1 truncate">
//                   {product.productName}
//                 </td>
//                 <td className="border border-gray-300 px-2 lg:px-4 py-1 truncate">
//                   {product.sku}
//                 </td>
//                 <td className="border border-gray-300 px-2 lg:px-4 py-1">
//                   {product.quantity}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-5 py-2.5 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//             onClick={() => setIsPopupOpen(false)}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDate, var_total_amount, products, status } =
    location.state || {};

  if (!location.state) {
    return (
      <div className="p-6 text-lg font-medium">No order details found.</div>
    );
  }

  return (
    <div className="w-[90vw] mx-auto my-10">
      {/* Back Button */}
      {/* <button className="mb-4 text-blue-500 underline" onClick={() => navigate(-1)}>
        ← Back
      </button> */}

      {/* <div className="flex justify-start items-center gap-1 mb-4 cursor-pointer" onClick={() => navigate(-1)}>
      <MdArrowBackIosNew className="h-5 w-5" />
      <span className="text-lg font-semibold">Back</span>
      </div> */}

      <h2 className="text-2xl font-semibold">Order Details</h2>
      <p className="mt-2 text-gray-600">
        Status: <strong>{status}</strong>
      </p>
      <p className="mt-2 text-gray-600">
        Order Date: <strong>{orderDate}</strong>
      </p>
      <p className="mt-2 text-gray-600">
        Total Amount: <strong>${var_total_amount}</strong>
      </p>

      <h3 className="mt-6 text-xl font-semibold">Products</h3>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="text-sm lg:text-base">
            <th className="border border-gray-300 px-2 lg:px-4 py-1">Image</th>
            <th className="border border-gray-300 px-2 lg:px-4 py-1">Name</th>
            <th className="border border-gray-300 px-2 lg:px-4 py-1">SKU</th>
            <th className="border border-gray-300 px-2 lg:px-4 py-1">Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-xs lg:text-sm">
              <td className="border border-gray-300 px-2 py-1 flex justify-center items-center">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-10 h-12 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-2 lg:px-4 py-1 max-w-[150px] truncate">
                <span
                  title={product.productName}
                  className="block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {product.productName.length > 50
                    ? `${product.productName.slice(0, 50)}...`
                    : product.productName}
                </span>
              </td>
              <td className="border border-gray-300 px-2 lg:px-4 py-1 truncate max-w-[100px]">
                {product.sku}
              </td>
              <td className="border border-gray-300 px-2 lg:px-4 py-1">
                {product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Close Button (Redirects Back) */}
      {/* <div className="flex justify-end mt-4">
        <button
          className="px-5 py-2.5 text-base font-medium text-white bg-black rounded-[30px] hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div> */}
    </div>
  );
};

export default OrderDetails;
