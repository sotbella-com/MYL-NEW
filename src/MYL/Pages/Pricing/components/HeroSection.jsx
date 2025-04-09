import React from 'react';

function HeroSection() {
  return (
    <div className="relative flex flex-col justify-center items-center py-6 md:py-24 w-full bg-stone-50 text-center font-medium overflow-hidden">
      {/* Background Image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/4cbe01bde92444467a0c4dd7c269eccd303ff3e5886f7996549aa7ba9a76d06d?apiKey=c3781a61f99f45d9979de044d3603935&"
        className="absolute right-0 bottom-0 object-cover w-full max-w-[1440px] h-auto md:h-[697px] z-0"
        alt="Background decoration"
      />

      {/* Decorative Top and Bottom Borders */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1440px] h-24 bg-transparent z-10" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1440px] h-24 bg-transparent z-10" />

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl px-6 md:px-0">
        <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-black leading-tight">
          From Startup to Enterprise.
        </h1>
        <p className="mt-5 font-semibold text-lg md:text-xl tracking-wide text-gray-550 leading-7">
          Perfectly tailored for every stage of your growth. Get started today, no credit card needed.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
