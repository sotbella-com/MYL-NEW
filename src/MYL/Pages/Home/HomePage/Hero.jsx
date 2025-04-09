// import React from 'react';
// // import BackgroundVideo from '../../../assets/Enterprice/BackgroundVideo.mp4';
// import Bganimation from '../../../assets/Enterprice/bg-animation.mp4'
// import heroimg from '../../../assets/Enterprice/hero-img.png'
// import herogif from '../../../assets/Enterprice/bg-gif.gif'
// import Brands from '../../Pricing/components/Brands';

// function Hero() {
//   return (
//     <>
//     <div id='hero' className="relative h-[75vh] rounded-[40px] overflow-hidden w-[95vw] mx-auto bg-gradient-to-r from-[#FFF3E4] to-[#FFB758]">
//       {/* Background Video Section */}
//       {/* <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src={Bganimation} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video> */}

//       {/* Black Overlay */}
//       {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

//       {/* Content Section */}
//       <div className="relative w-[90vw] mx-auto h-full flex items-center z-10">
//         <div className='flex flex-col md:flex-row md:justify-start justify-center items-center'>
//         <div className="flex flex-col md:justify-start justify-center md:items-start items-center space-y-8 w-full md:w-[55%]">
//           <div className="flex flex-col md:justify-start justify-center md:items-start items-center space-y-6">
//             <h1 className="font-jakarta text-4xl md:text-6xl text-center md:text-left font-black bg-gradient-to-r from-[#FF914D] via-black to-[#FF914D] bg-clip-text text-transparent animate-slow-black-gradient">
//               From vision to reality 
//               <br />
//               your fashion co-founder
//             </h1>

//             <style jsx>{`
//               @keyframes gradientShift {
//                 0% {
//                   background-position: 0% 50%;
//                 }
//                 50% {
//                   background-position: 100% 50%;
//                 }
//                 100% {
//                   background-position: 0% 50%;
//                 }
//               }

//               .animate-slow-black-gradient {
//                 background-size: 200% 200%;
//                 animation: gradientShift 5s ease infinite; /* Slower animation with 5 seconds duration */
//                 background-image: linear-gradient(
//                   to right,
//                   [#FF914D] 30%,
//                   [#FFB758] 40%,
//                   [#FF914D] 70%
//                 );
//               }
//             `}</style>

//             <p className="text-sm md:text-xl text-gray-900 text-center md:text-left w-[60%]">  
//               End-to-end fashion solutions for startups, scaling brands, and enterprises. From design to delivery, we co-create your success.
//             </p>
//           </div>
//           <div className="flex flex-col w-[60%]">
//             <form className="relative w-full flex items-center border-2 border-black rounded-xl overflow-hidden">
//               <label htmlFor="email" className="sr-only">
//                 Enter email to get started
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 md:px-6 py-2 md:py-4 text-sm md:text-lg outline-none bg-transparent text-white placeholder-gray-900"
//                 placeholder="Enter  your  email"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 md:px-10 py-1 md:py-3 text-sm md:text-lg font-semibold text-white bg-black rounded-lg"
//               >
//                 Get Started
//               </button>
//             </form>
//           </div>
//         </div>
//         <div>
//           {/* <img src={herogif} className='h-[40vh] md:h-[70vh]'/> */}
//           <img src={heroimg}/>
//         </div>
//         </div>
//       </div>
//     </div>
//     <Brands/>
//     </>
//   );
// }

// export default Hero;




// import React from 'react';
// import Bganimation from '../../../assets/Enterprice/bg-animation.mp4';
// import heroimg from '../../../assets/Enterprice/hero-img.png';
// import herogif from '../../../assets/Enterprice/bg-gif.gif';
// import Brands from '../../Pricing/components/Brands';

// function Hero() {
//   return (
//     <>
//       <div
//         id="hero"
//         className="relative h-auto md:h-[75vh] rounded-[40px] overflow-hidden w-[95vw] mx-auto bg-gradient-to-r from-[#FFF3E4] to-[#FFB758] py-10 md:py-0"
//       >
//         {/* Content Section */}
//         <div className="relative w-[90vw] mx-auto h-full flex items-center z-10">
//           <div className="flex flex-col md:flex-row md:justify-between justify-center items-center gap-10 w-full">
//             {/* Left Section */}
//             <div className="flex flex-col md:justify-start justify-center md:items-start items-center space-y-6 w-full md:max-w-[700px] px-4">
//               <h1 className="font-jakarta text-3xl md:text-6xl text-center md:text-left font-black text-black md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-[#FF914D] md:via-black md:to-[#FF914D] md:animate-slow-black-gradient">
//                 From vision to reality
//                 <br />
//                 your fashion co-founder
//               </h1>

//               <style jsx>{`
//                 @keyframes gradientShift {
//                   0% {
//                     background-position: 0% 50%;
//                   }
//                   50% {
//                     background-position: 100% 50%;
//                   }
//                   100% {
//                     background-position: 0% 50%;
//                   }
//                 }

//                 .animate-slow-black-gradient {
//                   background-size: 200% 200%;
//                   animation: gradientShift 5s ease infinite;
//                   background-image: linear-gradient(
//                     to right,
//                     #ff914d 30%,
//                     #ffb758 40%,
//                     #ff914d 70%
//                   );
//                 }
//               `}</style>

//               <p className="text-sm md:text-xl text-gray-900 text-center md:text-left w-full lg:w-[70%]">
//                 End-to-end fashion solutions for startups, scaling brands, and
//                 enterprises. From design to delivery, we co-create your success.
//               </p>

//               <div className="w-full lg:w-[70%]">
//                 <form className="relative w-full flex items-center border-2 border-black rounded-xl overflow-hidden">
//                   <label htmlFor="email" className="sr-only">
//                     Enter email to get started
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-3 md:px-6 py-2 md:py-4 text-sm md:text-base outline-none bg-transparent text-black placeholder-gray-900"
//                     placeholder="Enter your email"
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 md:px-6 py-1 md:py-2 text-sm md:text-base font-semibold text-white bg-black rounded-lg"
//                   >
//                     Get Started
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Right Section (Image) */}
//             <div className="w-full md:w-auto flex justify-center">
//               <img
//                 src={heroimg}
//                 alt="Hero"
//                 className="h-[200px] md:h-[70vh] object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Brands />
//     </>
//   );
// }

// export default Hero;




import React from 'react';
// import BackgroundVideo from '../../../assets/Enterprice/BackgroundVideo.mp4';
// import BackgroundVideo from '../../../assets/Enterprice/bg-video.mp4';
import BackgroundVideo from '../../../assets/Enterprice/bg-video1.mp4';
import Brands from '../../Pricing/components/Brands';
import bgimg from '../../../../MYL/assets/Enterprice/hero-img.png'

function Hero() {
  return (
    <>
      <div id='hero' className="relative h-[80vh] 2xl:h-[75vh] rounded-[40px] overflow-hidden w-[95vw] mx-auto bg-gradient-to-r from-[#616363] to-[#1e1e1e] lg:bg-none py-6 lg:py-10">
        {/* Background Video Section */}
        <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden lg:block absolute inset-0 w-full h-full object-fill"
      >
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        {/* Black Overlay */}
        <div className="hidden lg:block absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Section */}
        <div className="relative w-[90vw] mx-auto h-full flex items-center z-10">
          <div className='flex flex-col lg:flex-row lg:justify-between gap-10 justify-center items-center'>
            <div className="flex flex-col lg:justify-start justify-center lg:items-start items-center space-y-4 lg:space-y-8 w-full lg:w-[55%]">
              <div className="flex flex-col lg:justify-start justify-center lg:items-start items-center space-y-3 lg:space-y-6">
                <h1 className="font-jakarta font-black text-center lg:text-left text-4xl md:text-5xl xl:text-7xl leading-tight md:leading-tight xl:leading-snug bg-gradient-to-r from-white via-black to-white bg-clip-text text-transparent animate-slow-black-gradient">
                  Launch Your Fashion Brand Effortlessly
                </h1>

                <style jsx>{`
              @keyframes gradientShift {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              .animate-slow-black-gradient {
                background-size: 200% 200%;
                animation: gradientShift 6s ease infinite; /* Slower animation with 6 seconds duration */
                background-image: linear-gradient(
                  to right,
                  white 30%,
                  black 40%,
                  white 70%
                );
              }
            `}</style>

                <p className="text-sm md:text-xl text-white text-center md:text-left w-[80%]">
                  End-to-end fashion solutions for startups, scaling brands, and enterprises. From design to delivery, we co-create your success.
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href="/pricing" // Update with actual route
                  className="font-semibold lg:font-medium text-xs md:text-sm xl:text-2xl bg-white flex items-center gap-1 lg:gap-2 px-4 py-2 lg:px-10 lg:py-3 border border-white rounded-full text-black hover:bg-black hover:text-white transition"
                >
                See  Pricing
                </a>
                <a
                  href="/login" // Update with actual route
                  className="font-semibold lg:font-medium text-xs md:text-sm xl:text-2xl px-4 py-2 lg:px-10 lg:py-3 border border-white rounded-full text-white hover:bg-black hover:text-white transition"
                >
                  White Label Client Login
                </a>
              </div>
              {/* <div className="flex flex-col w-[80%]">
                <form className="relative w-full flex items-center border-2 border-white rounded-lg overflow-hidden">
                  <label htmlFor="email" className="sr-only">
                    Enter email to get started
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 xl:px-6 py-2 xl:py-4 text-sm xl:text-lg outline-none bg-transparent text-white placeholder-white"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 xl:px-10 py-1 xl:py-3 text-sm xl:text-lg font-semibold text-white bg-black rounded-lg hover:bg-zinc-900"
                  >
                    Get Started
                  </button>
                </form>
              </div> */}
            </div>
            {/* <div className='max-w-lg'>
              <img src={bgimg} className='h-[180px] sm:h-[250px] md:h-auto' />
            </div> */}
          </div>
        </div>
      </div>
      <Brands />
    </>
  );
}

export default Hero;
