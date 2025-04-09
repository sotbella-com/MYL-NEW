import React from "react";

function SizeSelector({ sizes }) {
  return (
    <div className="flex flex-wrap gap-4 items-start mt-5 w-full text-lg whitespace-nowrap max-md:max-w-full">
      {sizes.map((size, index) => (
        <button
          key={index}
          className="grow shrink gap-2.5 self-stretch px-9 py-4 rounded-xl border border-solid bg-stone-50 border-neutral-200 min-h-[60px] w-[135px] max-md:px-5"
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export default SizeSelector;