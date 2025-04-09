import React from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = ({ summary }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 max-md:flex-col max-md:gap-0 mt-11">
      {/* Order Summary */}
      <section className="flex flex-col p-10 mx-auto w-full font-medium text-black border border-solid bg-stone-50 border-neutral-200 rounded-[30px] max-md:px-5">
        <h2 className="text-4xl font-semibold">Order Summary</h2>
        <div className="flex justify-between items-center mt-10">
          <p className="text-3xl">Total Quantity</p>
          <p className="text-2xl">{summary.totalQuantity} Pcs</p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-3xl">Selected Product</p>
          <p className="text-2xl">{summary.selectedProducts} Prd</p>
        </div>
        <hr className="mt-8 border-neutral-200" />
        <div className="flex justify-between items-center mt-9">
          <p className="text-3xl">Total Price</p>
          <p className="text-2xl">₹ {summary.totalPrice.toFixed(2)}</p>
        </div>
        <button 
        onClick={() => navigate("/order-confirmed")}
        className="px-16 py-5 mt-10 w-full text-lg text-white bg-black rounded-xl">Place Order Query</button>
      </section>

      {/* Comment Section */}
      <section className="flex flex-col px-10 py-9 mx-auto w-full text-black border border-solid bg-stone-50 border-neutral-200 rounded-[30px] max-md:px-5">
        <h2 className="text-4xl font-semibold">Drop Your Comment</h2>
        <div className="flex flex-wrap items-start px-5 pt-5 pb-24 mt-10 bg-white rounded-2xl border border-solid border-neutral-200">
          <textarea className="w-full h-full resize-none text-xl font-light outline-none" placeholder="If any Comment"></textarea>
        </div>
        <button className="px-16 py-5 mt-7 w-full text-lg text-white bg-black rounded-xl">Send Message</button>
      </section>
    </div>
  );
};

export default OrderDetails;
