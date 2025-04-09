import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import StoryCard from "./StoryCard";
import { stories } from "../../../Data/Story/StoryData";
import NavigationArrow from "./NavigationArrow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ThoughtspaceSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section id="thoughtspace" className="flex relative flex-col mx-auto my-6 md:my-16">
      <div className="w-[90%] mx-auto my-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/d3f34ce8ec5f4507ea96acfc9f7a3fe789203dfa5b23f36aed8f83b0073f20ed?apiKey=c3781a61f99f45d9979de044d3603935&"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />

        <div className="relative mt-10 shrink-0 border-2 border-white border-solid w-full"></div>
        <div className="relative flex justify-between text-base leading-tight text-white whitespace-nowrap mt-4 w-full">
          <div className="flex-1">Thoughtspace</div>
          <div className="flex-1 text-right">07
            {/* {stories.length} */}
            </div>
        </div>

        {/* Section Header with Custom Navigation */}
        <div className="flex flex-col md:flex-row items-center relative gap-5 justify-between mt-10 w-full text-white">
          <h2 className="font-Plus Jakarta Sans text-6xl font-black max-md:text-4xl w-[65%] text-center md:text-left">
            Stories, News, and
            {" "}
        <span className="bg-[linear-gradient(to_right,#55CBFB,#1D4ED8),linear-gradient(to_left,#55CBFB,#1D4ED8)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
        Thought Leadership.
        </span>
          </h2>
          <p className="block md:hidden relative mt-6 text-2xl text-center md:text-left tracking-tighter text-white lg:w-[40%]">
            Insights and Inspiration: Explore Brand Stories, Industry News, and Expert Perspectives Shaping the Future of Fashion.
          </p>
          <div className="flex gap-2 md:gap-4 items-center mt-4 md:text-2xl leading-tight whitespace-nowrap">
            <button className="custom-prev-btn">
              <NavigationArrow direction="left" />
            </button>
            <span>
              {String(currentIndex + 1).padStart(2, "0")}/
              {String(stories.length).padStart(2, "0")}
            </span>
            <button className="custom-next-btn">
              <NavigationArrow direction="right" />
            </button>
          </div>
        </div>

        <p className="hidden md:block relative mt-6 text-2xl text-center md:text-left tracking-tighter text-white lg:w-[40%]">
          Insights and Inspiration: Explore Brand Stories, Industry News, and Expert Perspectives Shaping the Future of Fashion.
        </p>

        <div className="w-full overflow-hidden mt-5">
          <Swiper
            spaceBetween={15}
            slidesPerView={1}
            loop={true}
            centeredSlides={false}  // Change from true to false
            navigation={{ prevEl: ".custom-prev-btn", nextEl: ".custom-next-btn" }}
            keyboard={{ enabled: true }}
            modules={[Navigation, Keyboard]}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1440: { slidesPerView: 3, spaceBetween: 50 },  // Fix for large screens
            }}
            className="mySwiper w-full"
          >
            {stories.map((story, index) => (
              <SwiperSlide key={index} className="flex justify-center min-h-[500px]">
                <div className="relative">
                  <StoryCard title={story.title} imageUrl={story.image} url={story.url} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ThoughtspaceSection;

// import React from "react";
// import StoryCard from "./StoryCard";
// import NavigationArrow from "./NavigationArrow";
// import { stories } from "../../../Data/Story/StoryData";

// function ThoughtspaceSection() {
//   return (
//     <section className="flex relative flex-col mx-auto my-20">
//       <div className="w-[90%] mx-auto my-10">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/d3f34ce8ec5f4507ea96acfc9f7a3fe789203dfa5b23f36aed8f83b0073f20ed?apiKey=c3781a61f99f45d9979de044d3603935&"
//           alt=""
//           className="object-cover absolute inset-0 size-full"
//         />

//         <div className="relative mt-10 shrink-0 border-2 border-white border-solid w-full"></div>
//         <div className="relative flex justify-between text-base leading-tight text-white whitespace-nowrap mt-4 w-full">
//           <div className="flex-1">Services</div>
//           <div className="flex-1 text-right">04</div>
//         </div>

//         <div className="flex relative flex-wrap gap-5 justify-between mt-10 w-full text-white">
//           <h2 className="text-6xl font-black max-md:text-4xl w-[65%]">
//             Stories, News, and Thought Leadership.
//           </h2>
//           <div className="flex gap-6 items-center mt-4 text-2xl leading-tight whitespace-nowrap">
//             <NavigationArrow direction="left" />
//             <div className="self-stretch my-auto">01/03</div>
//             <NavigationArrow direction="right" />
//           </div>
//         </div>
//         <p className="relative mt-6 text-2xl tracking-tighter text-white w-[40%]">
//           Insights and Inspiration: Explore Brand Stories, Industry News, and
//           Expert Perspectives Shaping the Future of Fashion.
//         </p>
//         <div className="flex relative gap-5 self-stretch mt-16 max-md:mt-10">
//           {stories.map((story, index) => (
//             <StoryCard
//               key={index}
//               title={story.title}
//               imageUrl={story.imageUrl}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ThoughtspaceSection;
