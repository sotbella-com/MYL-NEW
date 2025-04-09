import React from "react";
import useCurrency from "../../../Currency/useCurrency";
import { getCurrencySymbol } from "../../../Currency/currencyUtils";
import { useNavigate } from "react-router-dom";

const PricingCard = ({
  title,
  description,
  price,
  features,
  isPopular,
  discountedPrice,
}) => {
  const { convertPrice, selectedCurrency } = useCurrency();
  const navigate = useNavigate();

  // Convert price from USD using exchange rates
  const displayPrice = Math.round(convertPrice(price));
  const roundedDiscountedPrice = discountedPrice
    ? Math.round(convertPrice(discountedPrice))
    : null;

  return (
    <div
      className={`group flex flex-col flex-1 shrink px-4 lg:px-6 py-8 lg:py-14 transition-all duration-300 ease-in-out max-w-full rounded-xl shadow-lg ${
        isPopular ? "bg-black shadow-lg" : "bg-white border border-gray-200"
      } hover:bg-black`}
    >
      <div className="flex flex-col w-full">
        <h3
          className={`h-12 lg:h-24 xl:h-14 text-lg lg:text-2xl font-bold transition-colors duration-300 ${
            isPopular ? "text-white" : "text-zinc-900 group-hover:text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 font-semibold text-gray-500 text-base lg:text-lg tracking-wide transition-colors duration-300 ${
            isPopular ? "text-gray-50" : "text-gray-550 group-hover:text-white"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex flex-col mt-5 w-full">
        <div className="flex items-center gap-2">
          {roundedDiscountedPrice && roundedDiscountedPrice < displayPrice ? (
            <>
              <span
                className={`text-2xl lg:text-3xl xl:text-4xl font-semibold transition-colors duration-300 ${
                  isPopular
                    ? "text-white"
                    : "text-zinc-900 group-hover:text-white"
                }`}
              >
                {getCurrencySymbol(selectedCurrency)}
                {roundedDiscountedPrice}
              </span>
              <span
                className={`text-xl lg:text-2xl xl:text-3xl font-medium line-through transition-colors duration-300 ${
                  isPopular
                    ? "text-white/50"
                    : "text-zinc-500 group-hover:text-white/50"
                }`}
              >
                {getCurrencySymbol(selectedCurrency)}
                {displayPrice}
              </span>
            </>
          ) : (
            <span
              className={`text-2xl lg:text-3xl xl:text-4xl font-semibold transition-colors duration-300 ${
                isPopular
                  ? "text-white"
                  : "text-zinc-900 group-hover:text-white"
              }`}
            >
              {getCurrencySymbol(selectedCurrency)}
              {displayPrice}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo(0, 0);
            navigate("/contact");
          }}
          className={`px-3 py-3 mt-5 w-full text-base font-semibold transition-all duration-300 ease-in-out rounded ${
            isPopular
              ? "text-black bg-white"
              : "text-black border-black border-[1.5px] group-hover:bg-white group-hover:text-black"
          }`}
        >
          Contact Sales
        </button>
      </div>

      <div className="flex flex-col mt-5 w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-4 items-center mt-2 lg:mt-4 w-full"
          >
            <div
              className={`p-2 w-8 h-8 ${
                feature.active ? "bg-violet-100" : "bg-gray-50"
              } rounded-full`}
            >
              <img
                src={
                  feature.active
                    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/083eab38f38dc952c9a8a0194c32d2e22895080f44765af6ca15c8aadc11f7a2"
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/7e2ba5c34bf5bdd1212b22c1b42e4bd1ceb15d17422974d606c343ccfdea1774"
                }
                alt="icon"
                className="w-4 h-4"
              />
            </div>
            <div
              className={`flex-1 text-base font-medium transition-colors duration-300 ${
                feature.active
                  ? isPopular
                    ? "text-white"
                    : "text-zinc-900 group-hover:text-white"
                  : "text-slate-400"
              }`}
            >
              {feature.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
