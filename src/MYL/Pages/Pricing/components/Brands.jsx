import React from "react";
import { brandLogos } from "../../../Data/Pricing/PricingData";

function Brands() {
  return (
    <div className="relative w-full overflow-hidden mt-10 max-md:mt-6">
      <div className="flex items-center justify-center space-x-10 animate-scroll"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'scroll 15s linear infinite',
          width: 'max-content',
        }}
      >
        {/* Duplicate logos to create seamless infinite loop */}
        {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
          <img
            key={index}
            loading="lazy"
            src={logo.src}
            className={`object-contain shrink-0 ${logo.className} max-sm:w-[80px] max-md:w-[100px]`}
            alt={logo.alt}
          />
        ))}
      </div>

      {/* Inline CSS for Animation */}
      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-33.3%); }
          }
        `}
      </style>
    </div>
  );
}

export default Brands;
