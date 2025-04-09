import React from 'react';
import CompareSection from './CompareSection';
import { compareSections } from '../../../Data/Pricing/PricingData';


function ComparePlans() {
  return (
    <div className="flex flex-col justify-center w-[90vw] py-6 md:py-16 mx-auto bg-white shadow-[0px_4px_200px_rgba(232,249,247,0.2)]">
      <div className="flex flex-col w-full">
        <h2 className="font-jakarta text-3xl md:text-5xl font-bold leading-tight text-center text-black">
          Compare Plans
        </h2>
        <div className="flex flex-col mt-4 md:mt-10 w-full">
          {compareSections.map((section, index) => (
            <CompareSection key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComparePlans;