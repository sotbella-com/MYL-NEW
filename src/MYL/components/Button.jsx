import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Button = () => {
  return (
    <div className="flex flex-wrap gap-4">
        <div className="px-4 py-2 bg-transparent rounded-full shadow-sm border border-gray-200">
      <span
        role="button"
        aria-label="Get Started"
        className="relative inline-flex items-center gap-3 px-6 py-3 font-semibold rounded-full transition-all duration-500 overflow-hidden group cursor-pointer"
      >
        {/* Expanding Background */}
        <span className="absolute inset-0 bg-black scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></span>

        {/* Button Text (Default: Black, Hover: White) */}
        <span className="relative z-10 text-black transition-colors duration-500 group-hover:text-white">
          Get Started
        </span>

        {/* Moving Arrow (Default: Black, Hover: White) */}
        <FaArrowRight className="relative z-10 transition-transform duration-500 text-black group-hover:text-white" />
      </span>
      </div>
    </div>
  );
};

export default Button;
