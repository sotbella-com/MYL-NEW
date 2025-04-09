import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-3 lg:gap-5 items-center justify-center h-screen bg-white text-center w-[90vw] mx-auto">
      <h1 className="font-jakarta text-5xl lg:text-[98px] font-bold text-black lg:w-[70%]">
      404
      </h1>
      <p className="text-lg lg:text-xl">
      Oops, This Page Not Found!
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-4 py-2 md:px-6 md:py-3 font-semibold rounded-lg text-xs md:text-base hover:text-gray-500 hover:bg-white border border-black transition-all"
      >
        Go to Home Page
      </button>
    </div>
  )
}

export default NotFound