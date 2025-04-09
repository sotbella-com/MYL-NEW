import * as React from "react";
import FeatureBlock from "../Components/FeatureBlock";
import ProcessStep from "../Components/ProcessStep";
import { featureBlocks, processSteps } from "../../../Data/About/AboutData";

export default function AboutSection() {
  return (
    <div className="flex flex-col items-start pl-16 mt-16 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="shrink-0 max-w-full h-px border-2 border-black border-solid w-[1312px]" />
      <div className="flex flex-wrap gap-5 justify-between mt-4 w-full text-base leading-tight text-black whitespace-nowrap max-w-[1312px] max-md:max-w-full">
        <div>About</div>
        <div>01</div>
      </div>
      <div className="mt-11 text-6xl font-medium text-black leading-[67px] w-[807px] max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
        Lorem ipsum dolor sit amet consectetur Porta mi libero vestibulum sagittis
      </div>
      <div className="mt-11 w-full max-w-[1312px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {featureBlocks.map((block, index) => (
            <FeatureBlock key={index} {...block} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-between self-stretch mt-16 max-md:mt-10">
        <div className="flex shrink-0 max-w-full bg-zinc-300 h-[450px] w-[366px]" aria-hidden="true" />
        <div className="flex shrink-0 my-auto max-w-full bg-zinc-300 h-[418px] w-[366px]" aria-hidden="true" />
        <div className="flex shrink-0 max-w-full bg-zinc-300 h-[450px] w-[366px]" aria-hidden="true" />
        <div className="flex shrink-0 my-auto bg-zinc-300 h-[418px] w-[158px]" aria-hidden="true" />
      </div>
      <div className="shrink-0 mt-32 max-w-full h-px border-2 border-black border-solid w-[1312px] max-md:mt-10" />
      <div className="flex flex-wrap gap-5 justify-between mt-4 w-full text-base leading-tight text-black max-w-[1312px] max-md:max-w-full">
        <div>Our process</div>
        <div>02</div>
      </div>
      <div className="flex flex-col mt-11 max-w-full text-black w-[807px] max-md:mt-10">
        <div className="text-6xl font-medium leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
          Lorem ipsum dolor sit amet consectetur Porta mi libero vestibulum saggytits
        </div>
        <div className="mt-6 text-2xl tracking-tighter leading-9 max-md:max-w-full">
          Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.
        </div>
      </div>
      <div className="mt-16 w-full max-w-[1312px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-wrap grow gap-9 max-md:mt-10">
              <div className="flex flex-col self-start max-md:hidden">
                {processSteps.map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="flex gap-2 items-center p-2 w-8 h-8 bg-violet-100 rounded-[100px]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/083eab38f38dc952c9a8a0194c32d2e22895080f44765af6ca15c8aadc11f7a2?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
                        className="object-contain w-4 aspect-square"
                        alt=""
                      />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="shrink-0 self-center mt-3 w-px border border-blue-700 border-solid h-[68px]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-col grow shrink-0 items-start text-2xl text-black basis-0 w-fit max-md:max-w-full">
                {processSteps.map((step, index) => (
                  <div key={index} className="mt-7 first:mt-0">
                    <ProcessStep {...step} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-base leading-6 text-gray-800 text-opacity-70 max-md:mt-10 max-md:max-w-full">
              <div className="flex shrink-0 bg-stone-300 h-[408px] max-md:max-w-full" aria-hidden="true" />
              <div className="mt-4 max-md:max-w-full">
                Lorem ipsum dolor sit amet consectetur. Sit accumsan mollis velit volutpat sed nibh integer eget commodo. Volutpat lobortis tortor congue sem mi vel viverra. Gravida vitae vulputate adipiscing nunc porta amet dapibus tortor ut. Elit magnis nunc id nisl enim lorem risus pellentesque.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 ml-16 text-base leading-6 text-gray-800 text-opacity-70 w-[560px] max-md:max-w-full">
        Lorem ipsum dolor sit amet consectetur. Sit accumsan mollis velit volutpat sed nibh integer eget commodo. Volutpat
      </div>
    </div>
  );
}