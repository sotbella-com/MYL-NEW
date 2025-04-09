import React from "react";

const SuperHeader = () => {
  return (
    <div className="text-white text-center text-xs md:text-sm lg:text-base font-medium p-1.5 animated-gradient">
      <p>Unlock exclusive insights. Join us and optimize your supply chain for 2025!</p>
      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animated-gradient {
            background: linear-gradient(to right, #757575, #1e1e1e);
            background-size: 200% auto;
            animation: gradientAnimation 1s linear infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default SuperHeader;
