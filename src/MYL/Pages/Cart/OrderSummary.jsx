import React from "react";
import useCurrency from "../../Currency/useCurrency"; // Import currency conversion hook
import { getCurrencySymbol } from "../../Currency/currencyUtils"; // Import function to get currency symbol

const OrderSummary = ({
  summary,
  comment,
  setComment,
  handlePlaceQuery,
  isSubmitting,
  isCartEmpty,
  isDisabled
}) => {
  const { convertPrice, selectedCurrency } = useCurrency(); // Use currency conversion hook

  // Convert total price based on selected currency
  const totalPriceInINR = summary.totalPrice || 0; // Ensure a fallback value
  const displayPrice =
    selectedCurrency === "INR"
      ? totalPriceInINR.toLocaleString(undefined, { minimumFractionDigits: 2 })
      : convertPrice(totalPriceInINR) || "0.00";

  return (
    <section className="overflow-hidden p-6 mt-6 lg:mt-8 w-full border bg-[#F9F9F9] border-[#E4E4E4] rounded-[30px]">
      <div className="flex gap-5 max-md:flex-col">
        {/* Order Summary Section */}
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full font-medium leading-tight text-black">
            <h2 className="font-jakarta self-start text-xl md:text-2xl xl:text-4xl font-semibold tracking-tight">
              Order Summary
            </h2>
            <div className="flex flex-wrap gap-5 xl:gap-10 justify-between items-center mt-5 xl:mt-10 tracking-tight">
              <h3 className="self-stretch my-auto text-base md:text-xl xl:text-3xl">
                Total Quantity
              </h3>
              <p className="self-stretch my-auto text-sm md:text-lg xl:text-2xl">
                {summary.totalQuantity} Pcs
              </p>
            </div>
            <div className="flex flex-wrap gap-5 xl:gap-10 justify-between items-center mt-4 xl:mt-6 tracking-tight">
              <h3 className="font-jakarta self-stretch my-auto text-base md:text-xl xl:text-3xl">
                Selected Product
              </h3>
              <p className="self-stretch my-auto text-sm md:text-lg xl:text-2xl">
                {summary.selectedProducts} Prd
              </p>
            </div>
            <hr className="shrink-0 mt-7 h-px border border-solid border-[#E4E4E4] max-md:max-w-full" />
            <div className="flex flex-wrap gap-10 justify-between items-center mt-7 max-md:max-w-full">
              <h3 className="font-jakarta self-stretch my-auto text-base md:text-xl xl:text-3xl tracking-tight">
                Total Price
              </h3>
              <p className="self-stretch my-auto text-sm md:text-lg xl:text-2xl">
                {getCurrencySymbol(selectedCurrency)} {displayPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Comment Section & Button */}
        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="grow tracking-tight leading-tight">
            <div className="flex relative flex-col items-start text-black">
              <textarea
                placeholder="If any Comment"
                className="w-full p-4 xl:p-6 bg-white rounded-2xl border border-solid border-[#E4E4E4] h-20 md:min-h-[258px] text-sm md:text-base xl:text-xl resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              onClick={handlePlaceQuery}
              disabled={isCartEmpty || isSubmitting || isDisabled}
             
          className={`flex overflow-hidden flex-col justify-center items-center px-4 md:px-10 xl:px-16 py-2 xl:py-5 mt-4 xl:mt-6 w-full text-sm md:text-base xl:text-lg text-white bg-black rounded-xl
            ${
               isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            >
              {isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span>Place Order Query</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
