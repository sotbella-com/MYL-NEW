import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import PricingPlans from "./components/PricingPlans";
import Brands from "./components/Brands";
import ComparePlans from "./components/ComparePlans";
import PricingFAQ from "../../Pages/Pricing/components/PricingFAQ";
import PlansCompare from "./components/PlansCompare";

function PricingPage() {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <HeroSection />
      <PricingPlans />
      <Brands />
      {/* <ComparePlans /> */}
      <PlansCompare/>
      <PricingFAQ />
    </div>
  );
}

export default PricingPage;
