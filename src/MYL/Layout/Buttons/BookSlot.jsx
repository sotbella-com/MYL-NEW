import React from "react";
import { useNavigate } from "react-router-dom";

const BookSlot = () => {
  const navigate = useNavigate(); // Use the navigate function

  return (
    <div className="flex justify-center md:justify-start">
      <button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/contact"); // Correct way to navigate
        }}
        className="mt-6 md:mt-8 self-stretch px-8 py-3 text-base lg:text-lg my-auto rounded-xl text-white bg-gradient-to-r from-[#616363] to-[#1e1e1e]"
      >
        Book Your Slot
      </button>
    </div>
  );
};

export default BookSlot;
