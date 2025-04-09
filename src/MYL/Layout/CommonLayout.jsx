import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import SuperHeader from './SuperHeader';
// import FrameByFrameLoader from '../Loader/FrameByFrameLoader'; // Import the loader

const CommonLayout = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // const handleAnimationComplete = () => {
  //   setIsLoading(false); // Hide the loader once the animation completes
  // };

  return (
    <div>
      {/* {isLoading ? (
        <FrameByFrameLoader onAnimationComplete={handleAnimationComplete} />
      ) : ( */}
        <>
          <SuperHeader/>
          <Header />
          <Outlet />
          <Footer />
        </>
      {/* )} */}
    </div>
  );
};

export default CommonLayout;
