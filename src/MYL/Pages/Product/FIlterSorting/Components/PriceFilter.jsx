import React from 'react';

function PriceFilter() {
  return (
    <div className="flex flex-col mt-3.5 w-full text-gray-600">
      <div className="text-sm font-medium">Price</div>
      <div className="flex gap-10 items-center mt-3.5 w-full text-xs">
        <div className="flex gap-3 items-center self-stretch my-auto">
          <input
            type="text"
            id="minPrice"
            className="flex shrink-0 gap-2.5 self-stretch my-auto h-6 rounded-md border border-solid bg-stone-50 border-neutral-200 w-[75px]"
            aria-label="Minimum Price"
          />
          <label htmlFor="minPrice" className="self-stretch my-auto">Mini Price</label>
        </div>
        <div className="flex gap-3 items-center self-stretch my-auto">
          <input
            type="text"
            id="maxPrice"
            className="flex shrink-0 gap-2.5 self-stretch my-auto h-6 rounded-md border border-solid bg-stone-50 border-neutral-200 w-[75px]"
            aria-label="Maximum Price"
          />
          <label htmlFor="maxPrice" className="self-stretch my-auto">Max Price</label>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;