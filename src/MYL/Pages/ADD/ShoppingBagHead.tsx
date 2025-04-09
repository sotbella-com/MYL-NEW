import React from "react";

const ShoppingBagHeader: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between w-full tracking-tight leading-tight text-black max-w-[1312px] max-md:mt-10 max-md:max-w-full">
      <div>
        <h1 className="text-2xl font-semibold">Shopping Bag</h1>
        <p className="mt-2.5 text-lg">
          <strong>3 Items</strong> in your bag.
        </p>
      </div>
      <button className="flex gap-3 justify-center items-center my-auto text-lg">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/57d1a0402bf3020e80931534ec86148c433334d5e61382edac5967ed1fed9294"
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          alt="Select icon"
        />
        <span className="self-stretch my-auto">Select Item</span>
      </button>
    </header>
  );
};

export default ShoppingBagHeader;
