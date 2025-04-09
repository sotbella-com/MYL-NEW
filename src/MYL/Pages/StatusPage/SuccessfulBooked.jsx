import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SuccessfulBooked() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // <div className="flex items-center justify-center h-[80vh] flex-col text-center">
    //   <div className="border border-gray-500 p-8 rounded-lg w-[90%] md:max-w-lg"> 
    //     {/* Heading */}
    //     <p className=" text-xl md:text-3xl lg:text-4xl font-bold mt-6">Thank You for Reaching Out!</p>

    //     {/* Subheading */}
    //     <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-4">
    //       Our team will contact you soon. We appreciate your trust.
    //     </p>

    //     {/* Additional Message */}
    //     <p className="text-sm md:text-base lg:text-lg text-gray-700 mt-2">
    //       We value your time and look forward to assisting you!
    //     </p>

    //     {/* Button to Home */}
    //     <button
    //       onClick={() => navigate('/')}
    //       className="mt-6 px-4 py-1 lg:px-6 lg:py-2 hover:text-black hover:bg-white border-2 border-black rounded-full bg-black text-white transition-all"
    //     >
    //       Go to Home Page
    //     </button>
    //   </div>
    // </div>

    <div className="flex flex-col gap-3 lg:gap-5 items-center justify-center h-screen bg-white text-center w-[90vw] mx-auto">
      <h1 className="font-jakarta text-5xl lg:text-[98px] font-bold text-black lg:w-[70%]">
      Thank You for Reaching Out!
      </h1>
      <p className="text-lg lg:text-xl">
      Our team will contact you soon. We appreciate your trust. We value your time and look forward to assisting you!
      </p>
      <button
           onClick={() => navigate('/')}
           className="bg-black text-white px-4 py-2 md:px-6 md:py-3 font-semibold rounded-lg text-xs md:text-base hover:text-gray-500 hover:bg-white border border-black transition-all"
         >
           Go to Home Page
         </button>
    </div>  

  );
}

export default SuccessfulBooked;
