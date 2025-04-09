// import React, { useEffect, useRef } from "react";
// import { aboutItems } from "../../../Data/About/AboutData";

// function About() {
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     let speed = 3; // Scroll speed
//     let animationFrameId;

//     const scrollContent = () => {
//       if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//         slider.scrollLeft = 0; // Reset to the beginning
//       } else {
//         slider.scrollLeft += speed;
//       }
//       animationFrameId = requestAnimationFrame(scrollContent);
//     };

//     scrollContent();

//     return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
//   }, []);

//   return (
//     <div id='about' className="flex flex-col items-start w-[90%] mx-auto my-20">
//       {/* Header Section */}
//       <div className="shrink-0 border-2 border-black border-solid w-full"></div>
//       <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
//         <div className="flex-1">About</div>
//         <div className="flex-1 text-right">01</div>
//       </div>
//       <h2 className="font-Plus Jakarta Sans my-10 text-3xl md:text-5xl lg:text-6xl font-semibold text-black w-full lg:w-[65%]">
//         Hundreds of brands call us their co-founder because we offer
//         {" "}
//         <span className="bg-[linear-gradient(to_right,#55CBFB,#1D4ED8),linear-gradient(to_left,#55CBFB,#1D4ED8)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
//         complete clothing manufacturing solutions.
//         </span>
//       </h2>

//       {/* About Items Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {aboutItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col text-lg md:text-2xl tracking-tight text-black space-y-3"
//           >
//             <div className="flex bg-blue-700 rounded-full h-[34px] w-[34px]"></div>
//             <p>{item.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Auto Sliding Section */}
//       <div
//         ref={sliderRef}
//         className="flex gap-10 items-center overflow-hidden whitespace-nowrap scroll-smooth w-full mt-10"
//       >
//         {Array.from({ length: 100 }).map((_, index) => (
//           <img
//             key={index}
//             src={item.image}
//             className={`flex shrink-0 bg-zinc-300 rounded-lg min-w-[240px] w-[360px] ${
//               index % 2 === 0 ? "h-[450px]" : "h-[418px]"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default About;

// import React from "react";
// import { aboutItems } from "../../../Data/About/AboutData";

// function About({ id }) {
//   return (
//     <div id={id} className="flex flex-col items-start w-[90%] mx-auto my-6 md:my-16">
//       {/* Header Section */}
//       <div className="shrink-0 border-2 border-black border-solid w-full"></div>
//       <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
//         <div className="flex-1">About</div>
//         <div className="flex-1 text-right">01</div>
//       </div>
//       <h2 className="font-Plus Jakarta Sans my-10 text-3xl md:text-5xl lg:text-6xl font-semibold text-black w-full lg:w-[65%]">
//         Hundreds of brands call us their co-founder because we offer{" "}
//         <span className="bg-gradient-to-r from-[#FFB758] to-[#FF914D] bg-clip-text text-transparent">
//           complete clothing manufacturing solutions.
//         </span>
//       </h2>

//       {/* About Items Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {aboutItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col text-lg md:text-2xl tracking-tight text-black space-y-3"
//           >
//             <div className="flex bg-[#FF914D] rounded-full h-[34px] w-[34px]"></div>
//             <p>{item.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Infinite Scrolling Image Section */}
//       <div className="relative w-full overflow-hidden mt-10">
//         <div className="relative flex whitespace-nowrap overflow-hidden w-full">
//           <div className="flex gap-10 animate-[scroll_10s_linear_infinite] w-max">
//             {[...aboutItems, ...aboutItems, ...aboutItems].map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center justify-center min-w-[240px] w-[300px] ${index % 2 === 0 ? "h-[450px]" : "h-[450px]"
//                   }`}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className={`object-cover ${index % 2 === 0
//                       ? "h-[350px] lg:h-[450px] w-full"
//                       : "h-[328px] lg:h-[418px] w-full"
//                     }`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CSS for Infinite Scrolling */}
//       <style>{`
//                 @keyframes scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-33.3%); } /* Moves by one-third of total width to loop seamlessly */
//         }
//       `}</style>
//     </div>
//   );
// }

// export default About;

import React, { useEffect, useState } from "react";
// import { aboutItems } from "../../../Data/About/AboutData";

// Import different images for scrolling section
import image1 from "../../../assets/Enterprice/Doc1.webp";
import image2 from "../../../assets/Enterprice/Doc2.webp";
import image3 from "../../../assets/Enterprice/Doc3.webp";
import image4 from "../../../assets/Enterprice/Doc4.webp";
import image5 from "../../../assets/Enterprice/Doc5.webp";
import Modal from "react-modal"

const scrollingImages = [image1, image2, image3, image4, image5];

// Set Modal root (Important for accessibility)
Modal.setAppElement("#root");

function About({ id }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Effect to stop scrolling when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);


  return (
    <div
      id={id}
      className="flex flex-col items-start w-[90%] mx-auto my-6 mt-0 md:my-16 md:mt-0"
    >
      {/* About Section */}
      <div className="flex flex-col mt-10 text-black w-full lg:w-[70%]">
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold">
          Hundreds of Brands Call Us Their Co-Founder Because We Offer Complete
          Apparel Development Solutions.
        </h2>
        <p className="font-medium text-lg md:text-xl text-gray-550 mt-4">
          Simplifying the complexities of fashion manufacturing, from initial
          idea to final product delivery, ensuring your brand's success.
        </p>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center text-xs md:text-sm xl:text-lg font-semibold lg:font-medium gap-2 px-4 py-2 lg:px-6 lg:py-3 border border-black rounded-full text-white bg-black hover:bg-white hover:text-black transition"
          >
            {/* Play Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Video
          </button>
          <a
            href="/contact"
            className="flex items-center px-4 py-2 lg:px-6 lg:py-3 border border-black text-xs md:text-sm xl:text-lg font-semibold lg:font-medium rounded-full text-black hover:bg-black hover:text-white transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* ✅ YouTube Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 relative z-50"
      >
        <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-5xl w-full">
          {/* Close Button */}
          <button
            onClick={() => setModalIsOpen(false)}
            className="flex items-center justify-center absolute text-lg lg:text-2xl -top-3 -right-3 lg:-top-5 lg:-right-5 text-black rounded-full h-[27px] w-[27px] lg:h-[35px] lg:w-[35px] bg-[#f8f6f62d]"
          >
            ✖
          </button>

          {/* Embedded YouTube Video */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-80 lg:h-[70vh]"
              src="https://www.youtube.com/embed/ogIQK-rp-Ls"
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Modal>

      {/* Infinite Scrolling Image Section */}
      <div className="relative w-full overflow-hidden mt-10">
        <div className="relative flex whitespace-nowrap overflow-hidden w-full">
          <div className="flex gap-6 lg:gap-10 animate-[scroll_20s_linear_infinite] w-max">
            {[...scrollingImages, ...scrollingImages, ...scrollingImages].map(
              (image, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center md:min-w-[300px] w-[200px] ${
                    index % 2 === 0 ? "h-[450px]" : "h-[450px]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Scrolling Image ${index + 1}`}
                    className={`object-cover rounded-lg ${
                      index % 2 === 0
                        ? "h-[350px] lg:h-[450px] w-full"
                        : "h-[328px] lg:h-[418px] w-full"
                    }`}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* CSS for Infinite Scrolling */}
      <style>{`        
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3%); }
        }
      `}</style>
    </div>
  );
}

export default About;
