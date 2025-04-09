// import React, { useEffect, useRef, useState } from "react";
// import review1 from "../../../assets/Enterprice/review1.webp";
// import review2 from "../../../assets/Enterprice/review2.webp";

// // Dummy review images (replace with actual URLs later)
// const reviewImages = [
//   review1,
//   review2,
//   review1,
//   review2,
//   review1,
//   review2,
//   review1,
//   review2
// ];

// function CustomerReview() {
//   const sliderRef = useRef(null);
//   const [speed, setSpeed] = useState(1.5);
//   const [slideWidth, setSlideWidth] = useState(300); // Increased slide width

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     let animationFrameId;

//     const scrollContent = () => {
//       if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
//         slider.scrollLeft = 0;
//       } else {
//         slider.scrollLeft += speed;
//       }
//       animationFrameId = requestAnimationFrame(scrollContent);
//     };

//     scrollContent();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [speed]);

//   // Handle hover to stop/start sliding
//   const handleMouseEnter = () => setSpeed(0);
//   const handleMouseLeave = () => setSpeed(1.5);

//   // Adjust slide width dynamically based on screen size
//   useEffect(() => {
//     const updateSlideWidth = () => {
//       const screenWidth = window.innerWidth;
//       if (screenWidth >= 1200) {
//         setSlideWidth(400); // Larger slides on big screens
//       } else if (screenWidth >= 768) {
//         setSlideWidth(350); // Medium size slides for tablets
//       } else {
//         setSlideWidth(300); // Smaller slides for mobile
//       }
//     };

//     updateSlideWidth();
//     window.addEventListener("resize", updateSlideWidth);
//     return () => window.removeEventListener("resize", updateSlideWidth);
//   }, []);

//   return (
//     <div className="flex flex-col items-start w-[90%] mx-auto my-16 md:my-20">
//       <div className="shrink-0 border-2 border-black w-full"></div>
//       <div className="flex justify-between text-sm md:text-base text-black mt-4 w-full">
//         <div className="flex-1">Reviews</div>
//         <div className="flex-1 text-right">01</div>
//       </div>
//       <h2 className="my-8 md:my-10 text-2xl md:text-5xl lg:text-6xl font-semibold text-black w-full lg:w-[65%]">
//         Customer Reviews
//       </h2>
//       <div
//         ref={sliderRef}
//         className="flex gap-6 md:gap-10 items-center overflow-hidden whitespace-nowrap scroll-smooth w-full mt-6 md:mt-10"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {reviewImages.map((image, index) => (
//           <div
//             key={index}
//             className="flex flex-col justify-center items-center p-4 md:p-6 bg-zinc-300 rounded-lg"
//             style={{
//               width: `${slideWidth}px`, // Increased width dynamically
//               minWidth: "280px", // Ensures slides are always visible
//               height: index % 2 === 0 ? "500px" : "470px", // Alternating heights for better design
//             }}
//           >
//             <img
//               src={image}
//               alt={`Customer Review ${index + 1}`}
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CustomerReview;

import React, { useEffect, useState } from "react";
import review1 from "../../../assets/Enterprice/review1.webp";
import review2 from "../../../assets/Enterprice/review2.webp";

// Local images for infinite looping
const reviewImages = [review1, review2, review1, review2, review1, review2];

function CustomerReview() {
  const [slideWidth, setSlideWidth] = useState(300); // Adjust for responsiveness

  // Adjust slide width dynamically based on screen size
  useEffect(() => {
    const updateSlideWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlideWidth(400); // Larger slides on big screens
      } else if (screenWidth >= 768) {
        setSlideWidth(350); // Medium size slides for tablets
      } else {
        setSlideWidth(300); // Smaller slides for mobile
      }
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  return (
    <div className="flex flex-col items-start w-[90%] mx-auto my-16 md:my-20">
      <div className="shrink-0 border-2 border-black w-full"></div>
      <div className="flex justify-between text-sm md:text-base text-black mt-4 w-full">
        <div className="flex-1">Reviews</div>
        <div className="flex-1 text-right">01</div>
      </div>
      <h2 className="font-jakarta my-8 md:my-10 text-2xl md:text-5xl font-semibold text-black w-full lg:w-[65%]">
        Customer Reviews
      </h2>

      {/* Infinite Scrolling Container */}
      <div className="relative w-full overflow-hidden mt-6 md:mt-10">
        <div className="slider">
          <div className="slide-track">
            {[...reviewImages, ...reviewImages, ...reviewImages].map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Customer Review ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                  style={{
                    width: `${slideWidth}px`,
                    minWidth: "280px",
                    height: index % 2 === 0 ? "500px" : "470px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: index % 2 !== 0 ? "15px" : "0", 
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Tailwind CSS for Infinite Scrolling */}
      <style>{`
        .slider {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          width: 100%;
        }
        
        .slide-track {
          display: flex;
          gap: 40px; /* Adjust space between images */
          animation: scroll 20s linear infinite;
          width: max-content;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3%); } /* Moves by one-third to create a loop */
        }
      `}</style>
    </div>
  );
}

export default CustomerReview;
