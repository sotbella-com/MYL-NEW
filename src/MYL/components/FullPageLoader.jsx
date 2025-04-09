import React from "react";

const FullPageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black" />
    </div>
  );
};

export default FullPageLoader;
