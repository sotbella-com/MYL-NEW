import React from "react";
import Techpack1 from "../../../assets/FreeConsult/FreeConsult1.webp";
import ContactButton from "../../../Layout/Buttons/ContactBlackButton";

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
        {/* <span className="bg-gradient-to-r from-[#FFB758] to-[#FF914D] bg-clip-text text-transparent animate-gradient"> */}
          Free Consultation?
        {/* </span> */}
      </h2>

      {/* Description */}
      <p className="mt-6 md:mt-11 font-semibold text-lg md:text-xl text-gray-550 leading-8 md:leading-9 text-center md:text-left">
        A free consultation is a no-cost session where our experts provide
        tailored advice, assess your requirements, and offer solutions to help
        you move forward with your fashion brand. Whether you’re just starting
        or looking to expand, this is your chance to get clarity and expert
        insights before committing to production.
        <br /><br />
        Let’s Bring Your Vision to Life!
      </p>

      <img
        src={Techpack1}
        alt="Tech Pack visual representation"
        className="flex shrink-0 self-center mt-10 md:mt-16 h-[35vh] md:h-[40vh] lg:h-[400px] w-full max-w-[90vw] xl:max-w-[1100px] object-cover rounded-t-[30px]"
      />

      <p className="mt-6 md:mt-11 font-semibold text-lg md:text-xl text-gray-550 leading-8 md:leading-9 text-center md:text-left">
        {/* <span className="bg-gradient-to-r from-[#FFB758] to-[#FF914D] bg-clip-text text-transparent animate-gradient"> */}
           What You’ll Get in Your Free Consultation:
           {/* </span>  */}
           Understanding Your Brand
        Needs – We analyze your vision, style, and production goals.
        Manufacturing & Cost Insights – Get a breakdown of production pricing,
        lead times, and best practices. Tech Pack & Design Guidance – Learn how
        to create accurate, production-ready designs for smooth execution.
        Step-by-Step Roadmap – We outline the next steps to launch or scale your
        collection seamlessly.
      </p>
      <section className="text-center md:text-left mt-6">
        <ContactButton />
      </section>

    </section>
  );
}

export default About;
