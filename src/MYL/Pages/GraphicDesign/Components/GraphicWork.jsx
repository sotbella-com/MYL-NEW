import React, { useEffect, useRef, useState } from "react";
import { workItems } from "../../../Data/Work/WorkData";
import { Link } from "react-router-dom";

function Work() {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    const speed = 2; // Adjust for faster/slower scrolling

    const startAutoScroll = () => {
      if (!isScrolling) return; // Prevents restarting when paused
      scrollInterval = setInterval(() => {
        if (
          scrollContainer.scrollTop >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollContainer.scrollTop = 0; // Reset for infinite scroll
        } else {
          scrollContainer.scrollTop += speed;
        }
      }, 30);
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, [isScrolling]); // Reacts to state changes

  return (
    <div id="work" className="relative w-[90vw] mx-auto my-20 overflow-hidden">
      <div className="shrink-0 border-2 border-black border-solid w-full"></div>
      <div className="flex justify-between text-base leading-tight text-black mt-4 w-full">
        <div>Work</div>
        <div>02</div>
      </div>
      <h2 className="font-Plus Jakarta Sans w-full lg:w-[65%] text-3xl md:text-5xl lg:text-6xl font-semibold mt-4">
        What We Offer: Comprehensive End-to-End Solutions For Fashion{" "}
        <span className="bg-[linear-gradient(to_right,#55CBFB,#1D4ED8),linear-gradient(to_left,#55CBFB,#1D4ED8)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
          Brands, From Concept to Final Product Delivery.
        </span>
      </h2>
      <p className="w-full lg:w-[65%] mt-6 text-lg md:text-2xl text-black">
        Globolosys Fashion offers end-to-end solutions for fashion brands,
        guiding you from concept to final product. We ensure every step—from
        design to production—reflects your brand’s vision, delivering
        high-quality, standout clothing.
      </p>

      {/* Auto-Sliding Content with Hover Stop */}
      <div
        // ref={scrollContainerRef}
        className="overflow-hidden overflow-y-scroll scrollbar-hide h-[90vh] mt-10"
      >
        <div className="flex flex-col space-y-10">
          {workItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between gap-10 md:flex-row items-center h-[85vh] w-full ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Section */}
              <div className="w-[400px] h-[400px] md:w-[646px] md:h-[613px] bg-gray-300 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col w-full md:w-1/2 bg-white self-end mb-20">
                <h3 className="text-2xl md:text-4xl font-bold">{item.title}</h3>
                <p className="mt-2 md:mt-4 text-lg md:text-xl text-gray-600">
                  {item.description}
                  {/* <p className="mt-3 font-semibold">
                    <span className="text-lg md:text-xl text-gray-700 border-gray-700 border-b pb-1">
                      Learn More →
                    </span>
                  </p> */}
                  <p className="mt-3 font-semibold">
                    <Link
                      to={item.route}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-lg md:text-xl text-gray-700 border-gray-700 border-b pb-1 hover:text-gray-800 hover:border-gray-800 transition-all duration-200"
                      onMouseEnter={() => setIsScrolling(false)} // Pause scrolling
                      onMouseLeave={() => setIsScrolling(true)} // Resume scrolling
                    >
                      {item.lern}
                    </Link>
                  </p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Work;
