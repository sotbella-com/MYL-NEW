import React, { useEffect, useRef } from "react";
import { processSteps, sections } from "../../../Data/Productiondata/ProductionData";

function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionContainer = sectionRef.current;
    let scrollStep = 2;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (
          sectionContainer.scrollTop >=
          sectionContainer.scrollHeight - sectionContainer.clientHeight
        ) {
          sectionContainer.scrollTop = 0;
        }
        sectionContainer.scrollTop += scrollStep;
      }, 30);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      id="process"
      className="flex flex-col items-start w-[90%] mx-auto my-6 md:my-16"
    >
      <div className="shrink-0 border-2 border-black border-solid w-full" />
      <div className="flex justify-between text-base leading-tight text-black whitespace-nowrap mt-4 w-full">
        <div className="flex-1">Our Process</div>
        <div className="flex-1 text-right">04</div>
      </div>

      <div className="flex flex-col mt-10 text-black w-full lg:w-[60%]">
        <h2 className="font-jakarta text-4xl md:text-5xl text-black font-bold">
          Our seamless {" "}
          {/* <span className="bg-[linear-gradient(to_right,#FFD159,#FF914D),linear-gradient(to_left,#FFD159,#FF914D)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient"> */}
            production process
          {/* </span> */}
        </h2>
        {/* <p className="text-lg lg:text-2xl tracking-tighter mt-4">
          Globolosys fashion offers comprehensive end-to-end solutions for
          high-end women’s fashion brands. From understanding your brand's
          vision to delivering your final product, we handle every stage of the
          process with precision and care.
        </p> */}
      </div>

      <div className="mt-10 flex flex-col items-center lg:flex-row justify-between space-y-2 lg:space-y-16 ">
        {/* Left Section: Timeline */}
        <div className="flex flex-col my-5 lg:w-[45%] relative">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6 mb-10 cursor-pointer relative"
            >
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 md:left-7 top-[3rem] w-[2px] bg-violet-200 h-28 md:h-24 lg:h-32"></div>
              )}

              <div className="relative flex items-start">
                {/* <div
                  className={`flex items-start justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border ${
                    step.active
                      ? "bg-violet-100 border-violet-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                >
                  <img
                    loading="lazy"
                    src={
                      step.active
                        ? "https://cdn.builder.io/api/v1/image/assets/TEMP/083eab38f38dc952c9a8a0194c32d2e22895080f44765af6ca15c8aadc11f7a2"
                        : "https://cdn.builder.io/api/v1/image/assets/TEMP/7e2ba5c34bf5bdd1212b22c1b42e4bd1ceb15d17422974d606c343ccfdea1774"
                    }
                    className="w-6 md:w-7 aspect-square"
                    alt=""
                  /> */}
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border bg-violet-100 border-violet-500">
                  <img
                    loading="lazy"
                    src={
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/083eab38f38dc952c9a8a0194c32d2e22895080f44765af6ca15c8aadc11f7a2"
                    }
                    className="w-6 md:w-7 aspect-square"
                    alt="Right Tick"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm md:text-base font-semibold text-gray-550">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section: Auto-Scrolling Images */}
        <div className="flex flex-col w-full lg:w-5/12 overflow-hidden">
          <div
            ref={sectionRef}
            className="flex flex-col grow max-md:mt-10 max-md:max-w-full overflow-y-scroll h-[50vh] lg:h-[70vh] scrollbar-hide"
          >
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col mt-8">
                <div className="relative w-full min-h-[50vh] lg:min-h-[70vh]">
                  <img
                    src={section.image} // Ensure this points to the correct image
                    alt={`Section ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm lg:text-base font-semibold text-gray-550">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
