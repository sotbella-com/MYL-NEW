import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCurrency from "../../../Currency/useCurrency"; // Import currency hook
import { getCurrencySymbol } from "../../../Currency/currencyUtils"; // Import currency symbols
import OrderDetailsSkeleton from "./OrderDetailsSkelton";
import { useExport } from "../../Product/Listing/Components/ExportContext";

const OrderDetailPage = () => {
  const { setExportData } = useExport();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { convertPrice, selectedCurrency } = useCurrency(); // Currency conversion hook
  const { orderDate, var_total_amount, products, status} =
    location.state || {};

    useEffect(() => {
      if (Array.isArray(products) && products.length > 0) {
        console.log("Products fetching details:", products);
  
        const enrichedProducts = products.map((product) => ({
          ...product,
          order_id: location.state?.order_id || location.state?._id || "N/A",
          var_title: product.productName || product.var_title || "N/A",
          status: location.state?.status || "N/A",
          orderDate: location.state?.orderDate || location.state?.dt_createddate || "",
        }));
  
        setExportData(enrichedProducts);
      }
    }, [products, location.state]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!location.state) {
    return (
      <div className="font-jakarta p-6 text-lg">No order details found.</div>
    );
  }

  if (loading) return <OrderDetailsSkeleton />;

  // Compute total quantity & selected products
  const totalQuantity = Array.isArray(products)
    ? products.reduce((acc, product) => acc + (Number(product.quantity) || 0), 0)
    : 0;
  const selectedProducts = Array.isArray(products) ? products.length : 0;

  // Ensure `var_total_amount` is safely converted
  const rawTotal = var_total_amount ? var_total_amount.toString().trim() : "0";
  const totalPriceInUSD = rawTotal && !isNaN(rawTotal) ? parseFloat(rawTotal) : 0;

  // Convert total price dynamically
  const totalPrice = convertPrice(totalPriceInUSD) || "0.00";


  return (
    <div
      id="export-area"
      className="font-jakarta w-[90vw] mx-auto my-5 md:my-10"
    >
      {/* Order Header Section */}
      <header className="flex flex-col">
        <div className="flex gap-3 items-center self-start">
          <div className="flex justify-center items-center my-auto">
            <span
              className="hover:bg-stone-200 rounded-full cursor-pointer"
              onClick={() => navigate("/history")}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-8 md:w-8 cursor-pointer"
              >
                <path
                  d="M14.7766 18.3798C14.6964 18.4599 14.6042 18.5 14.5 18.5C14.3958 18.5 14.3036 18.4599 14.2234 18.3798L8.62024 12.7766C8.54008 12.6964 8.5 12.6042 8.5 12.5C8.5 12.3958 8.54008 12.3036 8.62024 12.2234L14.2234 6.62024C14.3036 6.54008 14.3958 6.5 14.5 6.5C14.6042 6.5 14.6964 6.54008 14.7766 6.62024L15.3778 7.22144C15.4579 7.3016 15.498 7.39379 15.498 7.498C15.498 7.6022 15.4579 7.69439 15.3778 7.77455L10.6523 12.5L15.3778 17.2255C15.4579 17.3056 15.498 17.3978 15.498 17.502C15.498 17.6062 15.4579 17.6984 15.3778 17.7786L14.7766 18.3798Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <h1 className="self-stretch my-auto text-2xl md:text-4xl font-medium leading-none text-center text-black">
            Order Details
          </h1>
        </div>
        <div className="flex md:gap-3.5 gap-2 mt-5 md:mt-10 w-full text-xs md:text-base leading-none text-center text-white">
          <span className="px-4 py-2 bg-black rounded-[30px]">
            Date {orderDate}
          </span>
          <span className="px-4 py-2 bg-black rounded-[30px]">
            Status - {status}
          </span>
        </div>
      </header>

      {/* Order Items Section */}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((item, index) => {
          if (!item) {
            console.warn(`Warning: Undefined item at index ${index}`);
            return null;
          }

          const rawPrice = item.price ? item.price.toString().trim() : "0";
          const itemPriceInUSD = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
          const itemPrice = convertPrice(itemPriceInUSD) || "0.00";

          console.log("Rendering item:", item);
        
        return (
          <article
            key={index}
            className="flex flex-col md:flex-row gap-4 justify-between mt-6 first:mt-16 w-full"
            onClick={() => {
              if (item.ProductId) {
                navigate(`/product-details/id/${item.ProductId}`);
              } else {
                console.warn("Warning: Product ID is missing!", item);
              }
            }}
          >
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
              <img
                src={item.imageUrl || "https://via.placeholder.com/200"}
                alt={item.productName || "Product Image"}
                className="shrink-0 self-start bg-zinc-100 h-[212px] w-[188px] md:h-[346px] md:w-[287px] object-cover"
              />
              <div className="flex gap-10 justify-between items-start pt-4 h-full">
                <div className="text-sm md:text-base font-medium">
                  <div className="w-full">
                    <h3 className="text-[#4B5262]">
                      SKU - {item.sku || "N/A"}
                    </h3>
                    <p className="mt-1.5 leading-6 text-black">
                      {item.description
                        ? item.description.length > 70
                          ? `${item.description.substring(0, 70)}...`
                          : item.description
                        : item.productName || ""}
                    </p>
                  </div>
                  <p>QTY - {item.quantity || 0}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end text-lg md:text-2xl font-semibold text-black md:w-[40%]">
              {getCurrencySymbol(selectedCurrency)} {itemPrice}
            </div>
          </article>
         );
        })
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}


      {/* Order Summary Section */}
      <section className="flex flex-col p-6 mt-11 bg-[#F9F9F9] border border-[#E4E4E4] rounded-[30px] max-md:px-5 max-md:mt-10">
        <h2 className="text-2xl md:text-4xl font-semibold">Order Summary</h2>
        <div className="mt-5 font-medium lg:mt-10">
          <div className="flex justify-between">
            <h3 className="text-lg xl:text-3xl">Total Quantity</h3>
            <span className="text-lg xl:text-2xl">{totalQuantity} Pcs</span>
          </div>
          <div className="flex justify-between mt-6">
            <h3 className="text-lg xl:text-3xl">Selected Product</h3>
            <span className="text-lg xl:text-2xl">{selectedProducts} Prd</span>
          </div>
          <div className="mt-7 w-full">
            <hr className="border-[#E4E4E4]" />
            <div className="flex justify-between mt-7">
              <h3 className="text-lg xl:text-3xl">Total Price</h3>
              <span className="text-lg xl:text-2xl">
                {getCurrencySymbol(selectedCurrency)} {totalPrice}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetailPage;
