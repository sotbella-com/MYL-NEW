import React from 'react';
import PricingCard from './PricingCard';
import { pricingPlans } from '../../../Data/Pricing/PricingData';

function Pricing() {
  return (
    <div id="pricing" className="flex flex-col my-6 md:my-16 w-[90%] mx-auto">
      <div className="shrink-0 border-2 border-black border-solid w-full"></div>
      <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
        <div className="flex-1">Pricing</div>
        <div className="flex-1 text-right">06</div>
      </div>
      <div className="flex flex-col justify-center my-10 w-full lg:w-[65%]">
        <h2 className="font-jakarta text-3xl md:text-5xl font-bold text-black">
          <span className="text-zinc-900">Product Development </span>
          <br />
          {" "}

          Pricing
        </h2>
        <p className="mt-6 font-medium text-lg md:text-xl text-gray-550">
          Choose a plan that's right for you
        </p>
      </div>
      <div className="flex flex-col justify-between lg:flex-row gap-10 xl:gap-20 self-center w-full lg:w-[90%]">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}

export default Pricing;

