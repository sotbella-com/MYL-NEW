// import React, { useEffect, useState, useCallback } from "react";
// import { useCart } from "../../../Cart/CartContext";
// import { useNavigate } from "react-router-dom";
// import useCurrency from "../../../../Currency/useCurrency";
// import { getCurrencySymbol } from "../../../../Currency/currencyUtils";

// export default function ProductGridWithCards({ products, isLoading }) {
//   const navigate = useNavigate();
//   const { cart, addToCart, removeFromCart } = useCart();
//   const [showSkeleton, setShowSkeleton] = useState(true);
//   const [loadingProducts, setLoadingProducts] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const { convertPrice, selectedCurrency } = useCurrency(); // Currency conversion hook

//   useEffect(() => {
//     const timer = setTimeout(() => setShowSkeleton(false), 2000);
//     return () => clearTimeout(timer);
//   }, [isLoading]);

//   const isInCart = useCallback(
//     (product) => cart.some((cartItem) => cartItem.sku_id === product.sku_id),
//     [cart]
//   );

//   const truncateText = (text, maxLength = 20) =>
//     text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

//   const handleCartToggle = useCallback(
//     async (product) => {
//       if (loadingProducts[product.sku_id]) return;

//       setLoadingProducts((prev) => ({ ...prev, [product.sku_id]: true }));

//       const minQuantity = product.var_min_quantity?.trim()
//         ? parseInt(product.var_min_quantity, 10)
//         : 50;

//       const quantity = Math.max(parseInt(quantities[product.sku_id] || minQuantity, 10), minQuantity);

//       try {
//         if (isInCart(product)) {
//           await removeFromCart(product.sku_id, product.fk_product || product._id, product.fk_variant || product.default_variant?.int_glCode);
//         } else {
//           await addToCart({ ...product, quantity });
//         }
//       } catch (error) {
//         console.error("Cart operation failed:", error);
//       } finally {
//         setLoadingProducts((prev) => ({ ...prev, [product.sku_id]: false }));
//       }
//     },
//     [isInCart, addToCart, removeFromCart, quantities, loadingProducts]
//   );

//   const handleQuantityChange = useCallback((event, product) => {
//     const { value } = event.target;
//     setQuantities((prev) => ({ ...prev, [product.sku_id]: value }));
//   }, []);

//   const fallbackImage =
//     "https://cdn.builder.io/api/v1/image/assets/TEMP/8d2cc67ee745cbb17a8e6f06b6349a9a7a8c55eaae7f76004312dfa51eff6b54?placeholderIfAbsent=true&apiKey=c969bd016db04b2680bf13a58cb71b64";

//   return (
//     <div className="w-[90vw] mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {products.map((product) => {
//           const variant = product.default_variant || {};

//           // Ensure selling price is extracted, trimmed, and converted correctly
//           const rawPrice = variant.selling_price ? variant.selling_price.trim() : "0";
//           const priceInINR = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;

//           // Convert price only if the selected currency is NOT INR
//           const displayPrice =
//             selectedCurrency === "INR"
//               ? priceInINR.toLocaleString()
//               : convertPrice(priceInINR) || "0.00";

//           const mainImage = (variant.image?.[0]) || product.var_image || fallbackImage;
//           const isLoadingProduct = loadingProducts[product.sku_id];
//           const minQuantity = product.var_min_quantity?.trim()
//             ? parseInt(product.var_min_quantity, 10)
//             : 50;

//           return (
//             <div key={product._id} className="flex flex-col flex-1 max-lg:w-full">
//               <div className="flex flex-col grow leading-tight max-lg:mt-5">
//                 {/* Image Section */}
//                 <div
//                   className="flex w-full bg-zinc-100 min-h-[455px] items-center justify-center cursor-pointer"
//                   onClick={() => navigate(`/product-details/id/${product._id}`)}
//                 >
//                   <img
//                     src={mainImage}
//                     alt={product.var_title || "Product Image"}
//                     className="w-full h-full object-cover rounded-md"
//                     onError={(e) => (e.target.src = fallbackImage)}
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex flex-col mt-3 w-full">
//                   <div className="flex flex-col w-full font-medium text-black">
//                     <div className="text-sm text-gray-600">SKU - {product.sku_id}</div>

//                     {/* Product Title with Tooltip */}
//                     <div
//                       className="mt-2 font-medium truncate whitespace-nowrap overflow-hidden text-ellipsis w-[95%]"
//                       title={product.var_title}
//                     >
//                       {truncateText(product.var_title, 50)}
//                     </div>

//                     {/* Price Section */}
//                     <div className="gap-10 self-start mt-2 text-lg font-semibold">
//                       {getCurrencySymbol(selectedCurrency)}{displayPrice}{" "}
//                       <span className="text-xs tracking-tight text-gray-600">
//                         (Min QTY {minQuantity})
//                       </span>
//                     </div>
//                   </div>

//                   {/* Buttons & Quantity Input */}
//                   <div className="flex gap-2 items-center mt-4 w-full">
//                     {/* Quantity Input Box */}
//                     <div className="relative">
//                       <input
//                         type="number"
//                         min={minQuantity}
//                         value={quantities[product.sku_id] || minQuantity}
//                         onChange={(e) => handleQuantityChange(e, product)}
//                         className="w-20 px-1 py-2 text-base text-center border rounded-md border-neutral-300 pr-8"
//                       />
//                       <span className="absolute right-3 top-3 text-gray-500 text-sm">QTY</span>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <button
//                       className={`flex flex-1 justify-center text-base items-center px-4 py-3 tracking-tight text-white rounded-md ${
//                         isInCart(product) ? "bg-gray-700" : "bg-black"
//                       }`}
//                       onClick={() => handleCartToggle(product)}
//                       disabled={isLoadingProduct}
//                     >
//                       {isLoadingProduct ? (
//                         <span className="flex items-center justify-center">
//                           <span className="loader"></span> Processing...
//                         </span>
//                       ) : isInCart(product) ? "Remove from Cart" : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "../../../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import useCurrency from "../../../../Currency/useCurrency";
import { getCurrencySymbol } from "../../../../Currency/currencyUtils";

export default function ProductGridWithCards({ products, isLoading }) {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showTooltip, setShowTooltip] = useState({});
  const { convertPrice, selectedCurrency } = useCurrency(); // Currency conversion hook

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 2000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Initialize quantities when products load
  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach(product => {
        const minQuantity = product.var_min_quantity?.trim()
          ? parseInt(product.var_min_quantity, 10)
          : 50;
        initialQuantities[product.sku_id] = Math.max(minQuantity, 40);
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  const isInCart = useCallback(
    (product) => cart.some((cartItem) => cartItem.sku_id === product.sku_id),
    [cart]
  );

  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const handleCartToggle = useCallback(
    async (product) => {
      if (loadingProducts[product.sku_id]) return;

      setLoadingProducts((prev) => ({ ...prev, [product.sku_id]: true }));

      const minQuantity = product.var_min_quantity?.trim()
        ? parseInt(product.var_min_quantity, 10)
        : 50;

      const quantity = Math.max(parseInt(quantities[product.sku_id] || minQuantity, 10), minQuantity);

      try {
        if (isInCart(product)) {
          await removeFromCart(product.sku_id, product.fk_product || product._id, product.fk_variant || product.default_variant?.int_glCode);
        } else {
          await addToCart({ ...product, quantity });
        }
      } catch (error) {
        console.error("Cart operation failed:", error);
      } finally {
        setLoadingProducts((prev) => ({ ...prev, [product.sku_id]: false }));
      }
    },
    [isInCart, addToCart, removeFromCart, quantities, loadingProducts]
  );

  const handleQuantityChange = useCallback((event, product) => {
    const { value } = event.target;
    let newValue = parseInt(value, 10);

    // Handle empty input or non-numeric values
    if (isNaN(newValue) || value === '') {
      setQuantities((prev) => ({ ...prev, [product.sku_id]: '' }));
      return;
    }

    setQuantities((prev) => ({ ...prev, [product.sku_id]: newValue }));
  }, []);

  const handleBlur = useCallback((event, product) => {
    const { value } = event.target;
    let newValue = parseInt(value, 10);

    // If the input is empty or invalid, set to min quantity on blur
    if (isNaN(newValue) || value === '' || newValue <= 0) {
      const minQuantity = product.var_min_quantity?.trim()
        ? parseInt(product.var_min_quantity, 10)
        : 50;
      const defaultMinimum = Math.max(minQuantity, 40);
      setQuantities((prev) => ({ ...prev, [product.sku_id]: defaultMinimum }));
    }
  }, []);



  const isQuantityValid = useCallback((product, quantity) => {
    const minQuantity = product.var_min_quantity?.trim()
      ? parseInt(product.var_min_quantity, 10)
      : 50;
    const parsedQuantity = parseInt(quantity, 10);
    return !isNaN(parsedQuantity) && parsedQuantity >= Math.max(minQuantity, 40);
  }, []);

  const handleMouseEnter = useCallback((productId) => {
    setShowTooltip((prev) => ({ ...prev, [productId]: true }));
  }, []);

  const handleMouseLeave = useCallback((productId) => {
    setShowTooltip((prev) => ({ ...prev, [productId]: false }));
  }, []);

  const fallbackImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/8d2cc67ee745cbb17a8e6f06b6349a9a7a8c55eaae7f76004312dfa51eff6b54?placeholderIfAbsent=true&apiKey=c969bd016db04b2680bf13a58cb71b64";

  return (
    <div className="w-[90vw] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => {
          const variant = product.default_variant || {};

          // Ensure selling price is extracted, trimmed, and converted correctly
          const rawPrice = variant.selling_price ? variant.selling_price.trim() : "0";
          const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;

          // Convert price only if the selected currency is NOT INR
          const displayPrice = convertPrice(priceInUSD) || "0.00";

          const mainImage = (variant.image?.[0]) || product.var_image || fallbackImage;
          const isLoadingProduct = loadingProducts[product.sku_id];
          const minQuantity = product.var_min_quantity?.trim()
            ? parseInt(product.var_min_quantity, 10)
            : 50;

          const currentQuantity = quantities[product.sku_id] !== undefined ? quantities[product.sku_id] : Math.max(minQuantity, 40);
          const isValid = isQuantityValid(product, currentQuantity);
          const minimumQty = Math.max(minQuantity, 40);

          return (
            <div key={product._id} className="flex flex-col flex-1 max-lg:w-full">
              <div className="flex flex-col grow leading-tight max-lg:mt-5">
                {/* Image Section */}
                <div
                  className="flex w-full bg-zinc-100 min-h-[455px] items-center justify-center cursor-pointer"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/product-details/id/${product._id}`);
                  }}
                >
                  <img
                    src={mainImage}
                    alt={product.var_title || "Product Image"}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => (e.target.src = fallbackImage)}
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col mt-3 w-full">
                  <div className="flex flex-col w-full font-medium text-black">
                    <div className="text-sm text-gray-600">SKU - {product.sku_id}</div>

                    {/* Product Title with Tooltip */}
                    <div
                      className="mt-2 font-medium truncate whitespace-nowrap overflow-hidden text-ellipsis w-[95%]"
                      title={product.var_title}
                    >
                      {truncateText(product.var_title, 50)}
                    </div>

                    {/* Price Section */}
                    <div className="gap-10 self-start mt-2 text-lg font-semibold">
                      {getCurrencySymbol(selectedCurrency)}{displayPrice}{" "}
                      <span className="text-xs tracking-tight text-gray-600">
                        (Min QTY {minimumQty})
                      </span>
                    </div>
                  </div>

                  {/* Buttons & Quantity Input */}
                  <div className="flex gap-2 items-center mt-4 w-full">
                    {/* Quantity Input Box with Tooltip */}

                    <div className="relative flex items-center">


                      <input
                        type="number"
                        min={minimumQty}
                        value={currentQuantity}
                        onChange={(e) => handleQuantityChange(e, product)}
                        onBlur={(e) => handleBlur(e, product)}

                        className={`w-20 px-1 py-2 text-base text-center border rounded-md pr-8 ${isValid ? "border-neutral-300" : "border-red-500 focus:outline-red-500"
                          }`}
                        onMouseEnter={() => !isValid && handleMouseEnter(product.sku_id)}
                        onMouseLeave={() => !isValid && handleMouseLeave(product.sku_id)}
                        aria-label="Quantity"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">QTY</span>


                      {/* Tooltip */}
                      {!isValid && showTooltip[product.sku_id] && (
                        <div className="absolute left-0 -top-10 z-10 bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-lg whitespace-nowrap">
                          Minimum &nbsp; quantity: &nbsp; {minimumQty}
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`flex flex-1 justify-center text-base items-center px-4 py-3 tracking-tight text-white rounded-md transition-colors ${isInCart(product)
                          ? "bg-gray-700 hover:bg-gray-800"
                          : isValid
                            ? "bg-black hover:bg-gray-900"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      onClick={() => isValid && handleCartToggle(product)}
                      disabled={isLoadingProduct || !isValid}
                    >
                      {isLoadingProduct ? (
                        <span className="flex items-center justify-center">
                          <span className="loader"></span> Processing...
                        </span>
                      ) : isInCart(product) ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}