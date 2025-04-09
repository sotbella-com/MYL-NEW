import React, { useEffect, useRef, useState } from 'react';
import { accomplishmentData, partnerLogos } from '../../../Data/Accomplishments/AccomplishmentsData';
import Brands from '../../Pricing/components/Brands';

  function Accomplishments() {
  const [counts, setCounts] = useState({}); 
  const accomplishmentsRef = useRef(null);

  const animateNumbers = () => {
    const targetCounts = accomplishmentData.reduce((acc, item) => {
      acc[item.key] = parseInt(item.value.replace(/\D/g, "")) || 0; 
      return acc;
    }, {});

    const duration = 1000;
    const interval = 20;

    Object.keys(targetCounts).forEach((key) => {
      const targetValue = targetCounts[key];
      const increment = Math.ceil(targetValue / (duration / interval));

      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }

        setCounts((prevCounts) => ({
          ...prevCounts,
          [key]: currentValue,
        }));
      }, interval);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateNumbers();
        }
      },
      { threshold: 0.5 }
    );

    if (accomplishmentsRef.current) {
      observer.observe(accomplishmentsRef.current);
    }

    return () => {
      if (accomplishmentsRef.current) {
        observer.unobserve(accomplishmentsRef.current);
      }
    };
  }, []);


  return (
    <div id="accomplishments" ref={accomplishmentsRef} className="w-[90vw] mx-auto my-6 md:my-16">
      <div className="shrink-0 border-2 border-black border-solid w-full" />
      <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
        <div className="flex-1">Our Accomplishments</div>
        <div className="flex-1 text-right">03</div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start mt-10 lg:my-20 lg:space-x-10 space-y-10 lg:space-y-0">
        <div className="w-full lg:w-[50%]">
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-black">
            Trusted by designers, brands, and 
            {" "}
       
        entrepreneurs around the world
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-[50%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accomplishmentData.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-base lg:text-xl leading-tight text-black font-extrabold">{item.title}</div>
                <div className="flex flex-col mt-2 lg:mt-4">
                  <div className="text-3xl md:text-4xl lg:text-5xl leading-none text-black">{counts[item.key] || 0}
                  {item.suffix}</div>  
                  <div className="mt-2 lg:mt-4 text-sm lg:text-base font-semibold text-gray-550">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Brands/> */}

      {/* <div className="flex flex-wrap gap-8 justify-center lg:justify-between items-center mt-10 w-[95%] mx-auto">
        {partnerLogos.map((logo, index) => (
          <img
            key={index}
            loading="lazy"
            src={logo}
            className="object-contain h-[50px] lg:h-[80px] max-w-[20%] lg:max-w-[10%]"
            alt={`Partner logo ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Accomplishments;

