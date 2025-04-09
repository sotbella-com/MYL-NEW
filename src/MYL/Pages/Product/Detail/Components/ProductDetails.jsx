// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import useCurrency from "../../../../Currency/useCurrency";
// import { getCurrencySymbol } from "../../../../Currency/currencyUtils";
// import { useParams } from "react-router-dom";
// import { useCart } from "../../../Cart/CartContext";
// import SizeSelector from "./SizeSelector";
// import { useExport } from "../../Listing/Components/ExportContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// function ProductDetails() {
//   const { setExportData } = useExport();
//   const { id } = useParams(); // Get product ID from URL
//   const [product, setProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(null);
//   const { cart, addToCart, removeFromCart } = useCart(); // Use Cart Context
//   const { convertPrice, selectedCurrency } = useCurrency(); // Currency conversion hook

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!id) return;

//       setIsLoading(true);
//       setFetchError(null);

//       try {
//         const response = await fetch(`${baseURL}/v1/products/id/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch product details");

//         const data = await response.json();
//         setProduct(data.data);
//         setExportData([data.data]); // ✅ inject single product into export context
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setFetchError("Error fetching product details. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [id, setExportData]); 

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <ProductDetailsSkeleton />
//       </div>
//     );
//   }

//   if (fetchError) {
//     return <div className="text-center text-red-500 py-5">{fetchError}</div>;
//   }

//   if (!product) {
//     return (
//       <div className="text-center text-gray-600 py-5">Product not found.</div>
//     );
//   }

//   // Extract product details
//   const {
//     var_title = "Unknown Product",
//     category = [],
//     txt_nutrition = "No description available.",
//     sku_id = "N/A",
//     var_price = "0",
//     imgs = [],
//     variant_id, // Ensure variant_id is used
//     var_min_quantity = "", // Extracted min quantity
//   } = product;


//   // Ensure defaultVariant exists before accessing selling_price
//   const variant = product.defaultVariant || {};

//   // Ensure selling price is extracted, trimmed, and converted correctly
//   const rawPrice = variant.selling_price
//     ? variant.selling_price.trim()
//     : product.selling_price
//       ? product.selling_price.trim()
//       : "0";
//   const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;

//   // Convert price from USD to selected currency
//   const displayPrice = convertPrice(priceInUSD) || "0.00";

//   const mainCategory =
//     category.length > 0 ? category[0].var_title : "Uncategorized";
//   const productImages = imgs.length
//     ? imgs
//     : ["https://via.placeholder.com/757x455?text=No+Image"];
//   const price = parseInt(var_price, 10).toLocaleString();

//   // Determine quantity (either var_min_quantity or default to 50)
//   const quantity =
//     var_min_quantity && var_min_quantity.trim() !== ""
//       ? parseInt(var_min_quantity, 10)
//       : 50;

//   // Check if product is in the cart
//   const isInCart = cart.some((cartItem) => cartItem.sku_id === sku_id);

//   // Handle Add/Remove from Cart
//   const handleCartToggle = () => {
//     if (!variant_id) {
//       console.error("Variant ID is required but missing!");
//       return;
//     }

//     if (isInCart) {
//       removeFromCart(sku_id, product._id, variant_id);
//     } else {
//       addToCart({
//         ...product,
//         fk_product: product._id,
//         fk_variant: variant_id, // Use variant_id as fk_variant
//         quantity, // Correctly handles min quantity logic
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 justify-between items-start self-center my-10 text-black w-[90vw]">
//       {/* Product Images - Swiper for Mobile & Grid for Desktop */}
//       <div className="w-full lg:w-[65%]">
//         {/* Show Swiper for Mobile & Tablet */}
//         <div className="block lg:hidden">
//           <Swiper
//             modules={[Navigation, Pagination]}
//             pagination={{ clickable: true }}
//             navigation={false}
//             spaceBetween={10}
//             slidesPerView={1}
//             className="w-full"
//           >
//             {productImages.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <img
//                   src={img}
//                   alt={`Product Image ${index + 1}`}
//                   className="object-contain w-full h-auto rounded-md"
//                   onError={(e) =>
//                   (e.target.src =
//                     "https://via.placeholder.com/757x455?text=No+Image")
//                   }
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Show Grid Layout for Desktop */}
//         <div className="hidden lg:flex flex-col gap-4">
//           {productImages.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Product Image ${index + 1}`}
//               className="object-contain w-full h-auto max-w-full mx-auto rounded-md"
//               onError={(e) =>
//               (e.target.src =
//                 "https://via.placeholder.com/757x455?text=No+Image")
//               }
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-col w-full lg:w-[35%]">
//         <div className="flex flex-col w-full">
//           <h1 className="text-2xl font-medium leading-9">{var_title}</h1>
//           <div className="gap-2.5 self-start pb-1 mt-2 text-xl text-[#4B5362] uppercase border-b border-black">
//             {mainCategory}
//           </div>
//           <div className="mt-4 text-3xl font-semibold">{getCurrencySymbol(selectedCurrency)} {displayPrice}</div>
//         </div>

//         {/* <div className="flex flex-col mt-4 w-full font-medium">
//           <h2 className="text-2xl">Available sizes</h2>
//           <SizeSelector sizes={["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"]} />
//         </div> */}
//         {/* Available Sizes in Responsive Grid */}
//         <div className="flex flex-col mt-4 w-full font-medium">
//           <h2 className="text-2xl">Available sizes</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
//             {["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"].map(
//               (size, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-300 text-center py-4 rounded-md cursor-pointer hover:bg-gray-100"
//                 >
//                   {size}
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         {/* Add/Remove Cart Button */}
//         <button
//           className={`flex justify-center items-center px-5 py-3 mt-4 w-full text-lg font-medium tracking-tight leading-tight text-white rounded-md ${isInCart ? "bg-gray-700" : "bg-black"
//             }`}
//           onClick={handleCartToggle}
//         >
//           {isInCart ? "Remove from Cart" : `Add to Cart (Min ${quantity})`}
//         </button>

//         <div className="flex flex-col mt-4 w-full">
//           <div className="flex flex-wrap gap-5 items-center px-2">
//             {[
//               { title: "Fabric", value: "Satin" },
//               { title: "Care", value: "Dry to Clean" },
//               { title: "Pattern", value: "Floral" },
//             ].map((info, index) => (
//               <React.Fragment key={index}>
//                 <div className="flex flex-col grow shrink text-center">
//                   <div className="text-xl font-medium">{info.title}</div>
//                   <div className="mt-2 text-lg">{info.value}</div>
//                 </div>
//                 {index < 2 && (
//                   <div className="shrink border border-neutral-200 h-20 shadow-sm" />
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <div className="flex flex-col mt-4 w-full">
//             <h2 className="text-2xl font-medium leading-tight">Description</h2>
//             <div className="flex flex-col mt-2 w-full text-lg">
//               <div dangerouslySetInnerHTML={{ __html: txt_nutrition }} />
//               <div className="flex flex-col mt-2 w-full leading-relaxed">
//                 {/* <ul className="list-disc list-inside space-y-2 text-lg">
//                   <li>Product SKU: {sku_id}</li>
//                   <li>Product Type: {mainCategory}</li>
//                   <li>Model Height: 5.7 & Wearing size (XS)</li>
//                 </ul> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useCurrency from "../../../../Currency/useCurrency";
import { getCurrencySymbol } from "../../../../Currency/currencyUtils";
import { useParams } from "react-router-dom";
import { useCart } from "../../../Cart/CartContext";
import SizeSelector from "./SizeSelector";
import { useExport } from "../../Listing/Components/ExportContext";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import TryOnDress from "./TryOnDress";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

function ProductDetails() {
  const { setExportData } = useExport();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();
  const { convertPrice, selectedCurrency } = useCurrency();

  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log("Fetching Product Details for ID:", id);
      if (!id) return;
      try {
        const response = await fetch(`${baseURL}/v1/products/id/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data.data);
        setExportData([data.data]);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFetchError("Error fetching product details. Please try again.");
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    fetchProductDetails();
  }, [id, setExportData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (fetchError) {
    return <div className="text-center text-red-500 py-5">{fetchError}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 py-5">Product not found.</div>
    );
  }

  const {
    var_title = "Unknown Product",
    category = [],
    txt_nutrition = "No description available.",
    sku_id = "N/A",
    var_price = "0",
    imgs = [],
    variant_id,
    var_min_quantity = "",
  } = product;

  const variant = product.defaultVariant || {};
  const rawPrice = variant.selling_price
    ? variant.selling_price.trim()
    : product.selling_price
    ? product.selling_price.trim()
    : "0";
  const priceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
  const displayPrice = convertPrice(priceInUSD) || "0.00";
  const mainCategory = category.length > 0 ? category[0].var_title : "Uncategorized";
  const productImages = imgs.length ? imgs : ["https://via.placeholder.com/757x455?text=No+Image"];
  const price = parseInt(var_price, 10).toLocaleString();
  const quantity = var_min_quantity && var_min_quantity.trim() !== "" ? parseInt(var_min_quantity, 10) : 50;
  const isInCart = cart.some((cartItem) => cartItem.sku_id === sku_id);

  const handleCartToggle = () => {
    if (!variant_id) {
      console.error("Variant ID is required but missing!");
      return;
    }

    if (isInCart) {
      removeFromCart(sku_id, product._id, variant_id);
    } else {
      addToCart({
        ...product,
        fk_product: product._id,
        fk_variant: variant_id,
        quantity,
      });
    }
  };

  return (
    <div id="export-area" className="flex flex-col lg:flex-row gap-6 justify-between items-start self-center my-10 text-black w-[90vw]">
      <div className="w-full lg:w-[65%]">
        <div className="block lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={false}
            spaceBetween={10}
            slidesPerView={1}
            className="w-full"
          >
            {productImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  className="object-contain w-full h-auto rounded-md"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/757x455?text=No+Image")}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product Image ${index + 1}`}
              className="object-contain w-full h-auto max-w-full mx-auto rounded-md"
              onError={(e) => (e.target.src = "https://via.placeholder.com/757x455?text=No+Image")}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-[35%]">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-medium leading-9">{var_title}</h1>
          <div className="gap-2.5 self-start pb-1 mt-2 text-xl text-[#4B5362] uppercase border-b border-black">
            {mainCategory}
          </div>
          <div className="mt-4 text-3xl font-semibold">
            {getCurrencySymbol(selectedCurrency)} {displayPrice}
          </div>
        </div>

        <div className="flex flex-col mt-4 w-full font-medium">
          <h2 className="text-2xl">Available sizes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"].map((size, index) => (
              <div
                key={index}
                className="border border-gray-300 text-center py-4 rounded-md cursor-pointer hover:bg-gray-100"
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button
          className={`flex justify-center items-center px-5 py-3 mt-4 w-full text-lg font-medium tracking-tight leading-tight text-white rounded-md ${isInCart ? "bg-gray-700" : "bg-black"}`}
          onClick={handleCartToggle}
        >
          {isInCart ? "Remove from Cart" : `Add to Cart (Min ${quantity})`}
        </button>

        <div className="flex flex-col mt-4 w-full">
          <div className="flex flex-wrap gap-5 items-center px-2">
            {[{ title: "Fabric", value: "Satin" }, { title: "Care", value: "Dry to Clean" }, { title: "Pattern", value: "Floral" }].map((info, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col grow shrink text-center">
                  <div className="text-xl font-medium">{info.title}</div>
                  <div className="mt-2 text-lg">{info.value}</div>
                </div>
                {index < 2 && <div className="shrink border border-neutral-200 h-20 shadow-sm" />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col mt-4 w-full">
            <h2 className="text-2xl font-medium leading-tight">Description</h2>
            <TryOnDress clothImage={productImages[0]} />
            <div className="flex flex-col mt-2 w-full text-lg">
              <div dangerouslySetInnerHTML={{ __html: txt_nutrition }} />
              <div className="flex flex-col mt-2 w-full leading-relaxed"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;