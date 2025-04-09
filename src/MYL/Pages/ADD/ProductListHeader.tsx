import React from "react";

const ProductListHeader: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center px-11 py-5 w-full text-2xl font-semibold tracking-tight leading-tight text-black rounded-xl border border-solid bg-stone-50 border-neutral-200 max-w-[1312px] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <h2 className="self-stretch my-auto">Product</h2>
        <div className="flex gap-10 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          <h3 className="self-stretch my-auto">Price</h3>
          <h3 className="self-stretch my-auto">Quantity</h3>
          <h3 className="self-stretch my-auto">Total Price</h3>
        </div>
      </div>
    </header>
  );
};

export default ProductListHeader;
