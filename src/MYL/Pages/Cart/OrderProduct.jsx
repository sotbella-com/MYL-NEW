// import React, { useState } from "react";
// import axios from "axios";
// import { useCart } from "./CartContext";
// import useCurrency from "../../Currency/useCurrency";
// import { getCurrencySymbol } from "../../Currency/currencyUtils";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// export default function OrderProduct({ product }) {
//   const { dispatch, fetchCart } = useCart();
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [quantities, setQuantities] = useState({});
//   const minQuantity = 50;
//   const { convertPrice, selectedCurrency } = useCurrency();

//   const handleQuantityChange = async (delta) => {
//     if (!product.fk_product || !product.variant_id) return;

//     const newQuantity = Math.max(minQuantity, (quantities[product.sku_id] || minQuantity) + delta);

//     setQuantities((prev) => ({ ...prev, [product.sku_id]: newQuantity }));

//     try {
//       await axios.put(
//         `${baseURL}/v1/carts`,
//         {
//           fk_product: product.fk_product,
//           fk_variant: product.variant_id,
//           var_qty: newQuantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       await fetchCart();
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   const handleDirectInputChange = async (e) => {
//     const newQuantity = Math.max(minQuantity, parseInt(e.target.value, 10) || minQuantity);
//     setQuantities((prev) => ({ ...prev, [product.sku_id]: newQuantity }));

//     try {
//       await axios.put(
//         `${baseURL}/v1/carts`,
//         {
//           fk_product: product.fk_product,
//           fk_variant: product.variant_id,
//           var_qty: newQuantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       await fetchCart();
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   const handleRemove = async () => {
//     if (!product.fk_product || !product.variant_id) return;
//     try {
//       await axios.delete(
//         `${baseURL}/v1/carts/${product.fk_product}/${product.variant_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       dispatch({
//         type: "REMOVE_FROM_CART",
//         payload: { sku_id: product.sku_id },
//       });
//       setShowConfirmation(false);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   const productTitle = product.var_title || "Unknown Product";
//   const rawPrice = parseFloat(product.selling_price || product.var_price || "0"); // Ensure numeric price
//   const pricePerUnit =
//     selectedCurrency === "INR"
//       ? rawPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })
//       : convertPrice(rawPrice) || "0.00";
//   const quantity = quantities[product.sku_id] || product.cartItem || minQuantity;
  
//   const totalPrice =
//     selectedCurrency === "INR"
//       ? (rawPrice * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })
//       : convertPrice(rawPrice * quantity) || "0.00";

//   const productImage =
//     product.var_image ||
//     product.Variant_details?.attributes?.image?.[0] ||
//     "https://sotbella.com/cdn/shop/files/one-shoulder-ruched-bodycon-dress-132998.jpg?v=1731211334&width=1080";

//   const category =
//     typeof product.category === "object" && product.category !== null
//       ? product.category.var_title || "Unknown Category"
//       : product.category || "party";
//   const size = product.size || "small";
//   const material = product.material || "cotton";
//   const color = product.color || "white";


//   return (
//     <article className="flex relative justify-between items-center p-8 mx-auto text-black border bg-[#F9F9F9] border-[#E4E4E4] rounded-[30px] w-full">
//       <div className="flex md:w-[60%] gap-2 md:gap-5">
//         <img
//           loading="lazy"
//           src={productImage}
//           className="object-cover rounded-2xl w-[80px] md:w-[120px] xl:w-[222px] h-auto md:h-[150px] xl:h-[268px]"
//           alt={productTitle}
//           onError={(e) => {
//             e.target.src =
//               "https://cdn.builder.io/api/v1/image/assets/TEMP/8d2cc67ee745cbb17a8e6f06b6349a9a7a8c55eaae7f76004312dfa51eff6b54?placeholderIfAbsent=true&apiKey=c969bd016db04b2680bf13a58cb71b64";
//           }}
//         />
//         <div className="flex flex-col justify-between">
//           <div className="flex flex-col justify-start items-start mt-2">
//             {category && (
//               <p className="text-[9px] md:text-sm xl:text-base font-medium leading-tight uppercase text-[#4B5262]">
//                 {category}
//               </p>
//             )}
//             <h2 className="font-jakarta mt-2 text-xs md:text-sm xl:text-xl font-semibold">
//               {productTitle.length > 50
//                 ? productTitle.substring(0, 50) + "..."
//                 : productTitle}
//             </h2>
//           </div>
//           {(size || material || color) && (
//             <div className="mt-4 mb-2 text-xs md:text-sm xl:text-base font-medium leading-tight uppercase hidden md:flex flex-col justify-start items-start">
//               {material && (
//                 <p className="mt-3 text-[#4B5262] text-xs md:text-sm xl:text-base">
//                   Material<span className="text-black"> - {material}</span>
//                 </p>
//               )}
//               {color && (
//                 <p className="mt-3 text-[#4B5262] text-xs md:text-sm xl:text-base">
//                   Color<span className="text-black"> - {color}</span>
//                 </p>
//               )}
//             </div>
//           )}
//           {/* mobile buttons */}
//           <div className="md:hidden flex items-center gap-2 text-sm md:text-base xl:text-xl font-semibold leading-tight">
//             <p className="font-jakarta self-center text-[9px] md:text-sm xl:text-xl">
//               {getCurrencySymbol(selectedCurrency)} {pricePerUnit}
//             </p>
//             <div className="relative flex justify-center items-center">
//               <input
//                 type="number"
//                 min={minQuantity}
//                 value={quantity}
//                 onChange={handleDirectInputChange}
//                 className="w-20 px-1 py-2 text-xs md:text-sm xl:text-base text-center border rounded-md border-neutral-300 pr-8"
//               />
//               <span className="absolute right-3 top-2.5 text-gray-500 text-xs xl:text-sm">
//                 QTY
//               </span>
//             </div>
//             <p className="font-jakarta self-center text-[9px] md:text-sm xl:text-xl">
//               {getCurrencySymbol(selectedCurrency)} {pricePerUnit}
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* pc buttons */}
//       <div className="hidden md:flex justify-between w-[40%] items-center gap-2 text-sm md:text-base xl:text-xl font-semibold leading-tight">
//         <p className="font-jakarta self-center text-xs md:text-sm xl:text-xl">
//           {getCurrencySymbol(selectedCurrency)} {pricePerUnit}
//         </p>
//         <div className="relative flex justify-center items-center">
//           <input
//             type="number"
//             min={minQuantity}
//             value={quantity}
//             onChange={handleDirectInputChange}
//             className="w-20 px-1 py-2 text-xs md:text-sm xl:text-base text-center border rounded-md border-neutral-300 pr-8"
//           />
//           <span className="absolute right-3 top-3 text-gray-500 text-xs xl:text-sm">
//             QTY
//           </span>
//         </div>
//         <p className="font-jakarta self-center text-xs md:text-sm xl:text-xl">
//           {getCurrencySymbol(selectedCurrency)}{" "}{totalPrice.toLocaleString()}
//         </p>
//       </div>

//       <button
//         className="absolute right-3 top-3 md:right-7 md:top-[24px]"
//         onClick={() => setShowConfirmation(true)}
//         aria-label="Remove item"
//       >
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/639de8ee42aa3e8aa8b64fa2d28ea66167d5939a57c83b35b02358ea7c9abf4a"
//           className="object-contain w-4 h-4 md:w-6 md:h-6 aspect-square"
//           alt="Remove item"
//         />
//       </button>

//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
//             <h3 className="font-jakarta text-lg font-semibold mb-4">Confirm Deletion</h3>
//             <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this product from the cart?</p>
//             <div className="flex justify-end space-x-3">
//               <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowConfirmation(false)}>Cancel</button>
//               <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleRemove}>Remove</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </article>
//   );
// }


import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import useCurrency from "../../Currency/useCurrency";
import { getCurrencySymbol } from "../../Currency/currencyUtils";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default function OrderProduct({ product }) {
  const navigate = useNavigate();
  const { dispatch, fetchCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { convertPrice, selectedCurrency } = useCurrency();
  
  console.log(product);
  
  // Get the minimum quantity from the product or use default
  const minQuantity = product.var_min_quantity?.trim()
    ? parseInt(product.var_min_quantity, 10)
    : 50;

  // Use local state for quantity input that doesn't depend on an object
  const [quantity, setQuantity] = useState(product.cartItem || minQuantity);
  
  // Track if quantity is valid
  const [isValid, setIsValid] = useState(true);

  // Update validation status whenever quantity changes
  useEffect(() => {
    setIsValid(quantity >= minQuantity);
  }, [quantity, minQuantity]);



  const handleDirectInputChange = (e) => {
    // Allow empty input temporarily during typing
    const inputValue = e.target.value;
    const newQuantity = inputValue === '' ? '' : parseInt(inputValue, 10);
    
    // Update state regardless of validation to allow typing
    setQuantity(newQuantity);
    
    // If it's a valid number, update the cart after a delay
    if (!isNaN(newQuantity)) {
      // Debounce the API call to reduce server load during typing
      const timeoutId = setTimeout(() => {
        // Use minQuantity as fallback if value is empty or invalid
        const finalQuantity = newQuantity === '' || isNaN(newQuantity) ? minQuantity : newQuantity;
        updateCartQuantity(finalQuantity);
      }, 800);
      
      return () => clearTimeout(timeoutId);
    }
  };

  // Common function to update cart quantity
  const updateCartQuantity = async (newQuantity) => {
    if (!product.fk_product || !product.variant_id) return;
    
    try {
      await axios.put(
        `${baseURL}/v1/carts`,
        {
          fk_product: product.fk_product,
          fk_variant: product.variant_id,
          var_qty: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Validate actual quantity after leaving the input field
  const handleBlur = () => {
    // If quantity is empty or less than minimum, reset to minimum
    if (quantity === '' || quantity < minQuantity) {
      setQuantity(minQuantity);
      updateCartQuantity(minQuantity);
    }
  };

  const handleRemove = async () => {
    if (!product.fk_product || !product.variant_id) return;
    try {
      await axios.delete(
        `${baseURL}/v1/carts/${product.fk_product}/${product.variant_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { sku_id: product.sku_id },
      });
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Extract product details
  const productTitle = product.var_title || "Unknown Product";
  const rawPrice = parseFloat(product.selling_price || product.var_price || "0");

// Convert price from USD to the selected currency
const pricePerUnit = convertPrice(rawPrice) || "0.00";

const totalPrice = convertPrice(rawPrice * (quantity || minQuantity)) || "0.00";

  const productImage =
    product.var_image ||
    product.Variant_details?.attributes?.image?.[0] ||
    "https://sotbella.com/cdn/shop/files/one-shoulder-ruched-bodycon-dress-132998.jpg?v=1731211334&width=1080";

  const category =
    typeof product.category === "object" && product.category !== null
      ? product.category.var_title || "Unknown Category"
      : product.category || "party";
  const size = product.size || "small";
  const material = product.material || "cotton";
  const color = product.color || "white";

  return (
    <article className="flex relative justify-between items-center p-8 mx-auto text-black border bg-[#F9F9F9] border-[#E4E4E4] rounded-[30px] w-full"
    onClick={() => {
      if (product?._id) {
        navigate(`/product-details/id/${product._id}`);
      } else {
        console.error("Error: Product ID is missing!");
      }
    }}
    >
      <div className="flex md:w-[60%] gap-2 md:gap-5">
        <img
          loading="lazy"
          src={productImage}
          className="object-cover rounded-2xl w-[80px] md:w-[120px] xl:w-[222px] h-auto md:h-[150px] xl:h-[268px]"
          alt={productTitle}
          onError={(e) => {
            e.target.src =
              "https://cdn.builder.io/api/v1/image/assets/TEMP/8d2cc67ee745cbb17a8e6f06b6349a9a7a8c55eaae7f76004312dfa51eff6b54?placeholderIfAbsent=true&apiKey=c969bd016db04b2680bf13a58cb71b64";
          }}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col justify-start items-start mt-2">
            {category && (
              <p className="text-[9px] md:text-sm xl:text-base font-medium leading-tight uppercase text-[#4B5262]">
                {category}
              </p>
            )}
            <h2 className="font-jakarta mt-2 text-xs md:text-sm xl:text-xl font-semibold">
              {productTitle.length > 50
                ? productTitle.substring(0, 50) + "..."
                : productTitle}
            </h2>
          </div>
          {(size || material || color) && (
            <div className="mt-4 mb-2 text-xs md:text-sm xl:text-base font-medium leading-tight uppercase hidden md:flex flex-col justify-start items-start">
              {material && (
                <p className="mt-3 text-[#4B5262] text-xs md:text-sm xl:text-base">
                  Material<span className="text-black"> - {material}</span>
                </p>
              )}
              {color && (
                <p className="mt-3 text-[#4B5262] text-xs md:text-sm xl:text-base">
                  Color<span className="text-black"> - {color}</span>
                </p>
              )}
            </div>
          )}
          {/* mobile buttons */}
          <div className="md:hidden flex items-center justify-between gap-2 text-sm md:text-base xl:text-xl font-semibold leading-tight">
            <p className="font-jakarta self-center text-[9px] md:text-sm xl:text-xl">
              {getCurrencySymbol(selectedCurrency)} {pricePerUnit}
            </p>
            
            <div className="relative flex items-center"> 
             
                
                <input
                  type="number"
                  min={minQuantity}
                  value={quantity}
                  onChange={handleDirectInputChange}
                  onBlur={handleBlur}
                  className={`w-20 px-1 py-1.5 text-base text-center border rounded-md pr-8 ${
                    isValid ? "border-neutral-300" : "border-red-500 focus:outline-red-500"
                  }`}
                  onMouseEnter={() => !isValid && setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Quantity"
                />
                <span className="absolute right-3 top-2.5 text-gray-500 text-sm">QTY</span>
           
              
              {/* Tooltip */}
              {!isValid && showTooltip && (
                <div className="absolute left-0 -top-10 z-10 bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap">
                  Minimum quantity: {minQuantity}
                </div>
              )}
            </div>
            
            <p className="font-jakarta self-center text-[9px] md:text-sm xl:text-xl">
              {getCurrencySymbol(selectedCurrency)} {totalPrice}
            </p>
          </div>
        </div>
      </div>

      {/* pc buttons */}
      <div className="hidden md:flex justify-between w-[40%] items-center gap-2 text-sm md:text-base xl:text-xl font-semibold leading-tight">
        <p className="font-jakarta self-center text-xs md:text-sm xl:text-xl">
          {getCurrencySymbol(selectedCurrency)} {pricePerUnit}
        </p>
        
        <div className="relative flex justify-center items-center">
        
        
            <input
              type="number"
              min={minQuantity}
              value={quantity}
              onChange={handleDirectInputChange}
              onBlur={handleBlur}
              className={` w-24 px-1 py-2 text-base text-center border rounded-md pr-8 ${
                isValid ? "border-neutral-300" : "border-red-500 focus:outline-red-500"
              }`}
            
              onMouseEnter={() => !isValid && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Quantity"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 text-sm">QTY</span>
          
          
          {/* Tooltip */}
          {!isValid && showTooltip && (
            <div className="absolute left-0 -top-10 z-10 bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap">
              Minimum quantity: {minQuantity}
            </div>
          )}
        </div>
        
        <p className="font-jakarta self-center text-xs md:text-sm xl:text-xl">
          {getCurrencySymbol(selectedCurrency)} {totalPrice}
        </p>
      </div>

      <button
        className="absolute right-3 top-3 md:right-7 md:top-[24px]"
        onClick={() => setShowConfirmation(true)}
        aria-label="Remove item"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/639de8ee42aa3e8aa8b64fa2d28ea66167d5939a57c83b35b02358ea7c9abf4a"
          className="object-contain w-4 h-4 md:w-6 md:h-6 aspect-square"
          alt="Remove item"
        />
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="font-jakarta text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this product from the cart?</p>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowConfirmation(false)}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}