import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ErrorBooked() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center gap-3 lg:gap-5 justify-center h-screen flex-col text-center mx-auto w-[90vw]">

        {/* Heading */}
        <h1 className="font-jakarta text-5xl lg:text-[98px] text-black font-bold">There is no meeting currently booked!</h1>

        {/* Subheading */}
        <p className="text-lg lg:text-xl">
        Apologies for any inconvenience.
        </p>

        {/* Additional Message */}
        {/* <p className="text-sm md:text-base lg:text-lg text-gray-700 mt-2">
          We value your time and look forward to assisting you!
        </p> */}

        {/* Button to Home */}
        <button
          onClick={() => navigate('/')}
          className="px-4 py-1 lg:px-6 lg:py-2 hover:text-black hover:bg-white border-2 border-black rounded-lg bg-black text-white transition-all"
        >
          Go to Home Page
        </button>
    
    </div>

  );
}

export default ErrorBooked;
