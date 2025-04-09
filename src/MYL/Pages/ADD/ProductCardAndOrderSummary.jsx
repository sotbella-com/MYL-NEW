import React from "react";

const ProductCard = ({ product }) => {
  return (
    <article className="flex relative gap-10 items-center p-9 w-full text-black border border-solid bg-stone-50 border-neutral-200 max-w-[1312px] rounded-[30px] max-md:px-5 max-md:max-w-full">
      <div className="flex z-0 flex-wrap gap-5 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
        <img
          loading="lazy"
          src={product.image}
          className="object-contain self-stretch my-auto rounded-2xl aspect-[0.78] w-[222px]"
          alt={product.name}
        />
        <div className="self-stretch my-auto min-w-60 w-[355px]">
          <p className="text-base font-medium leading-tight uppercase">
            {product.category}
          </p>
          <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
          <div className="mt-28 max-w-full text-base font-medium leading-tight uppercase w-[164px] max-md:mt-10">
            <p className="text-[#4B5262]">
              SIZE - <span className="text-black">{product.size}</span>
            </p>
            <p className="mt-3 text-[#4B5262]">
              Material - <span className="text-black">{product.material}</span>
            </p>
            <p className="mt-3 text-[#4B5262]">
              Color - <span className="text-black">{product.color}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex z-0 flex-wrap gap-10 items-center self-stretch my-auto text-xl font-semibold leading-tight min-w-60 max-md:max-w-full">
        <p className="self-stretch my-auto">₹ {product.price.toFixed(2)}</p>
        <div className="overflow-hidden gap-2.5 self-stretch px-6 py-3 my-auto text-sm font-medium rounded-md border border-solid bg-stone-50 border-neutral-200 max-md:px-5">
          {product.quantity} QYT
        </div>
        <p className="self-stretch my-auto">
          ₹ {(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
      <button className="absolute right-9 z-0 top-[34px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/639de8ee42aa3e8aa8b64fa2d28ea66167d5939a57c83b35b02358ea7c9abf4a"
          className="object-contain w-6 h-6 aspect-square"
          alt="Remove item"
        />
      </button>
    </article>
  );
};

const OrderSummary = ({ summary }) => {
  return (
    <section className="overflow-hidden p-6 mt-11 w-full border border-solid bg-stone-50 border-neutral-200 max-w-[1305px] rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:w-full">
          <h2 className="text-4xl font-semibold tracking-tight">
            Order Summary
          </h2>
          <div className="flex justify-between mt-11 text-3xl max-md:mt-10">
            <h3>Total Quantity</h3>
            <p>{summary.totalQuantity} Pcs</p>
          </div>
          <div className="flex justify-between mt-6 text-3xl">
            <h3>Selected Product</h3>
            <p>{summary.selectedProducts} Prd</p>
          </div>
          <hr className="mt-7 border-neutral-200" />
          <div className="flex justify-between mt-7 text-3xl">
            <h3>Total Price</h3>
            <p>₹ {summary.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProductCard, OrderSummary };
