import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 lg:gap-5 items-center justify-center h-screen mx-auto text-center w-[90vw]">
      <h1 className="font-jakarta text-5xl lg:text-[98px] font-bold text-black">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-lg md:text-xl">
        Your order has been successfully placed. We appreciate your trust in us!
      </p>

      {/* Order Details */}
      {/* <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl lg:text-2xl font-semibold">📦 Order Details</h2>
        <p><strong>Order Number:</strong> #123456</p>
        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
        <p><strong>Shipping Address:</strong> [Customer’s Address]</p>
      </div> */}

      {/* Contact and Next Steps */}
      <p className="text-lg">
        🔔 A confirmation email has been sent. Need help?{" "}
        <Link to="/contact" className="text-blue-600 underline">Contact Us</Link>.
      </p>

      {/* Continue Shopping Button */}
      <button
        onClick={() => navigate("/collections")}
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-900"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;
