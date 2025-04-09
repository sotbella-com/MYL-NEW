import * as React from "react";
import EmailForm from "../Components/EmailForm";
import HeroText from "../Components/HeroText";

function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-start px-16 py-44 w-full bg-blue-100 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-col mb-0 max-w-full w-[677px] max-md:mb-2.5">
        <HeroText />
        <EmailForm />
      </div>
    </div>
  );
}

export default HeroSection;