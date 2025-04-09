import React from 'react';

function CompareSection({ title, features }) {
  return (
    <div className="flex flex-col mt-9 w-full max-w-none px-4 md:px-8 lg:px-16">
      <h3 className="font-jakarta font-semibold text-lg md:text-2xl tracking-wide text-gray-550 leading-tight text-black">
        {title}
      </h3>
      {features.map((feature, index) => (
        <div key={index} className="flex gap-8 items-center mt-6 w-full text-black">
          <div className="flex gap-3 md:gap-10 items-center pb-3 md:pb-5 border-b border-neutral-200 w-[20%] h-16 md:h-auto">
            <div className="self-stretch text-[10px] md:text-base">{feature.name}</div>
            {feature.hasTooltip && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/8b61aacf2db9a06bf7b78677ae1ba02119ab070b5109aa8154f6fc56282216d6?apiKey=c3781a61f99f45d9979de044d3603935&"
                className="object-contain w-3 md:w-6 aspect-square"
                alt="Info tooltip"
              />
            )}
          </div>
          <div className="flex gap-5 items-center w-[80%]">
            {feature.values.map((value, valueIndex) => (
              <div key={valueIndex} className="gap-2 pb-3 md:pb-5 border-b border-neutral-200 h-16 md:h-auto w-full text-[9px] md:text-base">
                {value === "check" ? (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/2b62f2b43c809be94e44efbb602cde06f634a5c32eb4f0383b10c33bcce7103b?apiKey=c3781a61f99f45d9979de044d3603935&"
                    className="object-contain w-3 md:w-6 aspect-square"
                    alt="Feature included"
                  />
                ) : value === "cross" ? (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/602bf4c892cd56b480ff3167ab9c377b31eb4adf41af13ebdc37a3ef5e53d85c?apiKey=c3781a61f99f45d9979de044d3603935&"
                    className="object-contain w-3 md:w-6 aspect-square"
                    alt="Feature not included"
                  />
                ) : (
                  value
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompareSection;
