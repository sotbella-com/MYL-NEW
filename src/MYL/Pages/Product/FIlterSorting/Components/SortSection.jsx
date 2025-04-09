import React from 'react';

function SortSection() {
  return (
    <div className="flex flex-col mt-9 w-full">
      <div className="flex gap-4 items-center w-full text-sm font-medium">
        <div className="self-stretch my-auto text-gray-600">Sort by:</div>
        <div className="flex gap-1 items-center self-stretch my-auto text-black whitespace-nowrap">
          <div className="self-stretch my-auto">Feature</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/dca7d48ff76c34f8a8a67d0ac54ea6547719e336001ad0f41f9fb2b8c88d765e?apiKey=c3781a61f99f45d9979de044d3603935&"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col mt-4 max-w-full w-[105px]">
        <div className="text-sm font-medium text-black">Feature</div>
        <div className="flex flex-col mt-4 w-full text-xs text-gray-600">
          <div>Price, low to high</div>
          <div className="mt-3.5">Price, high to low</div>
          <div className="mt-3.5">Newest</div>
        </div>
      </div>
    </div>
  );
}

export default SortSection;