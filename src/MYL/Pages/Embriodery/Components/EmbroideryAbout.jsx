import React from "react";
import Techpack1 from '../../../assets/Embroidery/Embroidery1.avif'


function About() {
  return (
    <section className="flex flex-col self-center my-6 md:my-16 text-black w-[90vw]">
      {/* Header Section */}
      <div className="flex flex-wrap items-end self-center w-full text-base leading-tight text-black whitespace-nowrap max-md:mt-10">
        <div className="shrink-0 border-2 border-black border-solid w-full"></div>
        <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
          <div className="flex-1">About</div>
          <div className="flex-1 text-right">01</div>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-jakarta text-4xl md:text-5xl font-bold leading-none mt-11 text-center md:text-left">
        What is{" "}
        {/* <span className="bg-[linear-gradient(to_right,#FFD159,#FF914D),linear-gradient(to_left,#FFD159,#FF914D)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient"> */}
          Embroidery & Printing?
        {/* </span> */}
      </h2>

      {/* Description */}
      <p className="mt-6 md:mt-11 font-semibold text-lg md:text-xl text-gray-550 leading-8 md:leading-9 text-center md:text-left">
      Embroidery and Printing are two techniques used to add designs, logos, or patterns to fabrics and garments.
      </p>

      <img
        src={Techpack1}
        alt="Tech Pack visual representation"
        className="flex shrink-0 self-center mt-10 md:mt-16 h-[35vh] md:h-[40vh] lg:h-[400px] w-full max-w-[90vw] xl:max-w-[1100px] object-cover rounded-t-[30px]"
      />
    </section>
  );
}

export default About;
