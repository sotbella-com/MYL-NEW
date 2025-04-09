import React from "react";
import BookSlot from "../../../Layout/Buttons/BookSlot";
import freeconsult from '../../../assets/FreeConsult/FresConsult2.jpg'

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-[90vw] mx-auto py-6 md:py-16 bg-zinc-50">
      {/* Left Content Section */}
      <div className="flex flex-col text-black w-full md:w-[55%] lg:w-[50%] max-md:text-center">
        <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
        Get Expert Advice with a Free Consultation – Book Now! 
        </h1>
        <p className="mt-4 md:mt-6 font-semibold text-lg md:text-xl text-gray-550 leading-7 md:leading-8">
        Starting or scaling your fashion brand? Our free consultation gives you the expert guidance you need to navigate manufacturing, costs, production timelines, and more—helping you make informed decisions with confidence. 
        </p>

        {/* Button - Fixed Width & Responsive */}
        <BookSlot />
      </div>

      {/* Right Image Section */}
      <img
        src={freeconsult}
        alt="Fashion showcase image"
        className="w-full md:w-[45%] lg:w-[40%] h-[300px] md:h-[400px] lg:h-[450px] object-contain rounded-md mt-8 md:mt-0"
      />
    </section>
  );
}

export default Hero;
