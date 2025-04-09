import React from "react";
import BookSlot from "../../../Layout/Buttons/BookSlot";
import label from '../../../assets/LabelsTags/labeltagshero.avif'

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-[90vw] mx-auto py-6 md:py-16 bg-zinc-50">
      {/* Left Content Section */}
      <div className="flex flex-col text-black w-full md:w-[55%] lg:w-[50%] max-md:text-center">
        <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
        Custom Labels & Tags for Unique Brand Identity & Packaging
        </h1>
        <p className="mt-4 md:mt-6 font-semibold text-lg md:text-xl text-gray-550 leading-7 md:leading-8">
        The journey of Globolosys fashion is deeply rooted in the legacy of Globolosysfashion—an affordable luxury brand that redefined high-end women’s fashion by seamlessly blending accessibility with uncompromising quality.
        </p>

        {/* Button - Fixed Width & Responsive */}
        <BookSlot />
      </div>

      {/* Right Image Section */}
      <img
        src={label}
        alt="Fashion showcase image"
        className="w-full md:w-[45%] lg:w-[40%] h-[300px] md:h-[400px] lg:h-[450px] object-cover rounded-md mt-8 md:mt-0"
      />
    </section>
  );
}

export default Hero;
