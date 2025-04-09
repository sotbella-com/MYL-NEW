import React from "react";

function NavigationArrow({ direction }) {
  const imageSrc = direction === "left" ? "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/fe32428dfbb55d55d2a7295690c3c195328d884e06ce31977139e9616057e38c?apiKey=c3781a61f99f45d9979de044d3603935&" : "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/ec60b9710b3e625576c7d18071f72b1542dc3e5e7e8b1d4b2a2efda2591b5863?apiKey=c3781a61f99f45d9979de044d3603935&";

  return (
    <img
      loading="lazy"
      src={imageSrc}
      alt={`${direction} arrow`}
      className="object-contain shrink-0 self-stretch my-auto w-11 aspect-square"
    />
  );
}

export default NavigationArrow;