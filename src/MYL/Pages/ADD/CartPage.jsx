import React from "react";
import ProductCard from "./ProductCard";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const products = [
    {
      category: "Party Wear",
      name: "RED SEQUIN PATCH-WORK DRESS...",
      size: "Small",
      material: "Cotton",
      color: "White",
      price: 6754.0,
      quantity: 80,
      image:
        "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/694a795fbf2938d87241ef75baa7cf072854735bda3236aa0119cdf847ef1cfa",
    },
    // Add other products here as needed
  ];

  const orderSummary = {
    totalQuantity: 80,
    selectedProducts: 4,
    totalPrice: 540320.0,
  };

  return (
    <main className="flex overflow-hidden flex-col items-center bg-white">
      <div className="flex flex-col items-center w-full max-w-[1312px] px-4">
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

        <section className="w-full space-y-3 mt-9">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </section>

        <OrderSummary summary={orderSummary} />
      </div>
    </main>
  );
};

export default CartPage;
