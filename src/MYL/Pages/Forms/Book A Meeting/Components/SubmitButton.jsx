import React from 'react';

const SubmitButton = ({ text }) => {
  return (
    <button className="flex justify-center items-center px-6 py-4 mt-6 w-full text-base font-semibold tracking-tight text-white bg-black rounded-lg hover:bg-zinc-900 transition-all duration-300">
      {text}
    </button>
  );
};

export default SubmitButton;
