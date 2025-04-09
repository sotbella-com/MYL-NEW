import React from 'react';
import PricingCard from './PricingCard';
import { pricingPlans } from '../../../Data/Pricing/PricingData';

function PricingPlans() {
  return (
    <div className="w-full bg-white px-5 md:px-10 lg:px-20 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}

export default PricingPlans;
