import React from "react";
import { OrderSummaryType } from "./types";

interface OrderSummaryProps {
  summary: OrderSummaryType;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ summary }) => {
  return (
    <section className="overflow-hidden p-6 mt-11 w-full border border-solid bg-stone-50 border-neutral-200 max-w-[1305px] rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full font-medium leading-tight text-black max-md:mt-10 max-md:max-w-full">
            <h2 className="self-start text-4xl font-semibold tracking-tight">
              Order Summary
            </h2>
            <div className="flex flex-wrap gap-10 justify-between items-center mt-11 tracking-tight max-md:mt-10 max-md:max-w-full">
              <h3 className="self-stretch my-auto text-3xl">Total Quantity</h3>
              <p className="self-stretch my-auto text-2xl">
                {summary.totalQuantity} Pcs
              </p>
            </div>
            <div className="flex flex-wrap gap-10 justify-between items-center mt-6 tracking-tight max-md:max-w-full">
              <h3 className="self-stretch my-auto text-3xl">
                Selected Product
              </h3>
              <p className="self-stretch my-auto text-2xl">
                {summary.selectedProducts} Prd
              </p>
            </div>
            <hr className="shrink-0 mt-7 h-px border border-solid border-neutral-200 max-md:max-w-full" />
            <div className="flex flex-wrap gap-10 justify-between items-center mt-7 max-md:max-w-full">
              <h3 className="self-stretch my-auto text-3xl tracking-tight">
                Total Price
              </h3>
              <p className="self-stretch my-auto text-2xl">
                ₹ {summary.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="grow tracking-tight leading-tight max-md:mt-10 max-md:max-w-full">
            <div className="flex relative flex-col items-start text-black max-md:max-w-full">
              <textarea
                placeholder="If any Comment"
                className="w-full p-6 bg-white rounded-2xl border border-solid border-neutral-200 min-h-[258px] text-xl resize-none"
              />
            </div>
            <button className="flex overflow-hidden flex-col justify-center items-center px-16 py-5 mt-6 w-full text-lg text-white bg-black rounded-xl max-md:px-5 max-md:max-w-full">
              <div className="flex gap-2 items-center">
                <span>Place Order Query</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
