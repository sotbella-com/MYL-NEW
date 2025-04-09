// import React, { useEffect, useMemo, useState } from "react";
// import { useCart } from "./CartContext";
// import OrderProduct from "./OrderProduct";
// import OrderSummary from "./OrderSummary";
// import { useNavigate } from "react-router-dom";
  
// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// export default function OrderPage() {
//   const { cart, fetchCart, dispatch } = useCart();
//   const [comment, setComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   // Compute totals and product types
//   const { totalQuantity, totalPrice, productTypes } = useMemo(() => {
//     const totalQuantity = cart.reduce((acc, product) => acc + (product.cartItem || 0), 0);
//     const totalPrice = cart.reduce(
//       (acc, product) =>
//         acc +
//         parseInt(product.selling_price || product.var_price || "0", 10) * (product.cartItem || 0),
//       0
//     );
//     const productTypes = cart.length;
//     return { totalQuantity, totalPrice, productTypes };
//   }, [cart]);

//   // Handler to place the order query
//   const handlePlaceQuery = async () => {
//     if (cart.length === 0) {
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         cart: cart.map((product) => ({
//           fk_product: product.fk_product || product._id,
//           fk_variant: product.variant_id,
//           product_name: product.var_title || "Unknown Product",
//           sku: product.sku_id || "Unknown SKU",
//           quantity: product.cartItem || 0,
//           price: product.selling_price || product.var_price || "0",
//         })),
//         message: comment,
//       };

//       const response = await fetch(`${baseURL}/v1/queries`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create query");
//       }
//       dispatch({ type: "SET_CART", payload: [] });
//       navigate("/thankyou");
//     } catch (error) {
//       // Optionally handle errors
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const summary = {
//     totalQuantity,
//     selectedProducts: cart.length,
//     totalPrice,
//   };

//   return (
//     <main className="flex overflow-hidden flex-col items-center w-[90vw] mx-auto my-10">
//       <div className="flex flex-col items-center w-full">
//         {/* Header */}
//         <header className="flex flex-wrap gap-5 justify-between w-full tracking-tight leading-tight text-black">
//           <div>
//             <h1 className="font-jakarta text-xl xl:text-2xl font-semibold">Shopping Bag</h1>
//             <p className="mt-2 text-sm xl:text-lg">
//               <strong>{cart.length} Items</strong> in your bag.
//             </p>
//           </div>
//           {/* <button className="flex gap-3 justify-center items-center my-auto text-lg">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/57d1a0402bf3020e80931534ec86148c433334d5e61382edac5967ed1fed9294"
//               className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
//               alt="Select icon"
//             />
//             <span className="self-stretch my-auto">Select Item</span>
//           </button> */}
//         </header>

//         {/* Table Header */}
//         <header className="flex flex-col justify-center px-5 xl:px-10 py-2 xl:py-5 w-full text-lg lg:text-2xl font-semibold tracking-tight leading-tight text-black rounded-xl border bg-[#F9F9F9] border-[#E4E4E4] mt-6 lg:mt-8">
//           <div className="flex justify-between gap-5 items-center w-full">
//             <div className="flex w-[60%]">
//             <h2 className="font-jakarta my-auto text-sm xl:text-2xl">Product</h2>
//             </div>
//             <div className="hidden md:flex w-[40%] gap-2 justify-between items-center my-auto text-sm xl:text-2xl">
//               <h3>Price</h3>
//               <h3>Quantity</h3>
//               <h3>Total Price</h3>
//             </div>
//           </div>
//         </header>

//         {/* Product List */}
//         <section className="w-full space-y-2 lg:space-y-3 mt-6 lg:mt-8">
//           {cart.map((product, index) => (
//             <OrderProduct key={index} product={product} />
//           ))}
//           {cart.length === 0 && (
//             <div className="text-center text-black">Your cart is empty.</div>
//           )}
//         </section>

//         {/* Order Summary */}
//         <OrderSummary
//           summary={summary}
//           comment={comment}
//           setComment={setComment}
//           handlePlaceQuery={handlePlaceQuery}
//           isSubmitting={isSubmitting}
//           isCartEmpty={cart.length === 0}
//         />
//       </div>
//     </main>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import OrderProduct from "./OrderProduct";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import useCurrency from "../../Currency/useCurrency";
import { useExport } from "../Product/Listing/Components/ExportContext";
import CartSkeleton from "./Main/CartSkeleton";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default function OrderPage() {
  const { setExportData } = useExport();
  const { cart, fetchCart, dispatch } = useCart();
  const { convertPrice } = useCurrency(); // Currency conversion hook
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [fetchCart]);

  useEffect(() => {
    if (cart.length > 0) {
      setExportData(cart);
    }
  }, [cart]);

  // Compute totals and product types
  const { totalQuantity, totalPrice, productTypes, hasInvalidQuantities } = useMemo(() => {
    const totalQuantity = cart.reduce((acc, product) => acc + (product.cartItem || 0), 0);

    // Convert price from USD to the selected currency
    const totalPrice = cart.reduce(
      (acc, product) => {
        const rawPrice = product.selling_price || product.var_price || "0";
        const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
        return acc + convertPrice(priceInUSD) * (product.cartItem || 0);
      },
      0
    );

    const productTypes = cart.length;
    
    // Check if any product has quantity less than the minimum required
    const hasInvalidQuantities = cart.some(product => {
      const currentQuantity = product.cartItem || 0;
      const minQuantity = product.var_min_quantity || 50; // Default min quantity to 50 if not specified
      return currentQuantity < minQuantity;
    });
    
    return { totalQuantity, totalPrice, productTypes, hasInvalidQuantities };
  }, [cart, convertPrice]);

  // Handler to place the order query
  const handlePlaceQuery = async () => {
    if (cart.length === 0 || hasInvalidQuantities) {
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        cart: cart.map((product) => ({
          fk_product: product.fk_product || product._id,
          fk_variant: product.variant_id,
          product_name: product.var_title || "Unknown Product",
          sku: product.sku_id || "Unknown SKU",
          quantity: product.cartItem || 0,
          price: convertPrice(product.selling_price || product.var_price || "0"),
        })),
        message: comment,
      };

      const response = await fetch(`${baseURL}/v1/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create query");
      }
      dispatch({ type: "SET_CART", payload: [] });
      navigate("/thankyou");
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const summary = {
    totalQuantity,
    selectedProducts: cart.length,
    totalPrice,
    hasInvalidQuantities
  };

  return (
    <main id="export-area" className="flex overflow-hidden flex-col items-center w-[90vw] mx-auto my-10">
      {loading ? (
        <CartSkeleton />
      ) : (
      <div className="flex flex-col items-center w-full">
        {/* Header */}
        <header className="flex flex-wrap gap-5 justify-between w-full tracking-tight leading-tight text-black">
          <div>
            <h1 className="font-jakarta text-xl xl:text-2xl font-semibold">Shopping Bag</h1>
            <p className="mt-2 text-sm xl:text-lg">
              <strong>{cart.length} Items</strong> in your bag.
            </p>
          </div>
        </header>

        {/* Table Header */}
        <header className="flex flex-col justify-center px-5 xl:px-10 py-2 xl:py-5 w-full text-lg lg:text-2xl font-semibold tracking-tight leading-tight text-black rounded-xl border bg-[#F9F9F9] border-[#E4E4E4] mt-6 lg:mt-8">
          <div className="flex justify-between gap-5 items-center w-full">
            <div className="flex w-[60%]">
              <h2 className="font-jakarta my-auto text-sm xl:text-2xl">Product</h2>
            </div>
            <div className="hidden md:flex w-[40%] gap-2 justify-between items-center my-auto text-sm xl:text-2xl">
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total Price</h3>
            </div>
          </div>
        </header>

        {/* Product List */}
        <section className="w-full space-y-2 lg:space-y-3 mt-6 lg:mt-8">
          {cart.map((product, index) => (
            <OrderProduct key={index} product={product} />
          ))}
          {cart.length === 0 && (
            <div className="text-center text-black">Your cart is empty.</div>
          )}
          {hasInvalidQuantities && (
            <div className="text-center text-red-500 font-medium mt-4">
              One or more products have quantities below their minimum requirement. Please adjust quantities to proceed.
            </div>
          )}
        </section>

        {/* Order Summary */}
        <OrderSummary
          summary={summary}
          comment={comment}
          setComment={setComment}
          handlePlaceQuery={handlePlaceQuery}
          isSubmitting={isSubmitting}
          isCartEmpty={cart.length === 0}
          isDisabled={hasInvalidQuantities}
        />
      </div>
      )}
    </main>
  );
}