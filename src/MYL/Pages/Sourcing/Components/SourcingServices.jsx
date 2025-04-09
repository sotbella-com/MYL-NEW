import React, { useState } from "react";
import { servicesData } from "../../../Data/Services/ServicesData";
import { useSwipeable } from "react-swipeable";

function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? servicesData.length - 1 : prevIndex - 1
    );
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,  // Swipe left to go to the next slide
    onSwipedRight: prevSlide, // Swipe right to go to the previous slide
    preventScrollOnSwipe: false,
    trackMouse: true, // Allows swipe detection on both touch and mouse events
  });

  return (
    <div id='services' className="flex relative flex-col bg-black mx-auto w-full my-6 md:my-16">
      <div className="w-[90%] mx-auto my-10">
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896460b26790e01a2c297f830a5f901420f087d68d4ee8494d8b00b819e8938?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
          className="object-cover absolute inset-0 size-full"
          alt="Background image for services section"
        /> */}

        <div className="relative mt-10 shrink-0 border-2 border-white border-solid w-full"></div>
        <div className="relative flex justify-between text-base leading-tight text-white whitespace-nowrap mt-4 w-full">
          <div className="flex-1">Services</div>
          <div className="flex-1 text-right">03</div>
        </div>

        <div className="flex flex-col md:flex-row relative justify-center items-center md:justify-between mt-10 leading-tight text-white">
          <h2 className="font-jakarta text-5xl font-bold max-md:text-4xl ">
            What we offer
          </h2>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={prevSlide} aria-label="Previous slide">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/24caa0c017f11198e99bf0c4175c65ff5d04cf6228ebf73065091a1d777fb84b?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
                className="object-contain shrink-0 self-stretch my-auto aspect-square"
                alt="Previous"
              />
            </button>
            <span>
              {String(currentIndex + 1).padStart(2, "0")}/
              {String(servicesData.length).padStart(2, "0")}
            </span>
            <button onClick={nextSlide} aria-label="Next slide">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3dc8bf421391287b7862b318312c095a07591689930fb2b66df8ca10b6d97fe?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
                className="object-contain shrink-0 self-stretch my-auto aspect-square"
                alt="Next"
              />
            </button>
          </div>
        </div>

        {/* Swipeable Container */}
        <div {...handlers} className="relative flex md:mt-10 touch-pan-y">
          <div className="flex flex-col-reverse md:flex-row gap-5 my-10 w-full">
            {/* Text Section */}
            <div className="flex flex-col text-white w-full md:w-[50%] self-end text-center md:text-left">
              <h3 className="font-jakarta text-2xl md:text-3xl font-semibold">
                {servicesData[currentIndex].title}
              </h3>
              <p className="mt-6 text-base md:text-xl">
                {servicesData[currentIndex].description}
              </p>
              <a
                href={servicesData[currentIndex].route}
                className="mt-6 text-base flex items-center gap-2 justify-center md:justify-start"
              >
                <span className="border-b border-white pb-1">Learn More →</span>
              </a>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-[50%] flex justify-center md:justify-end">
              <img
                src={servicesData[currentIndex].image}
                alt={servicesData[currentIndex].title}
                className="h-[400px] lg:w-[646px] w-[400px] lg:h-[613px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
