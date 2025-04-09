import * as React from "react";
import { NavigationLink } from "../Components/NavigationLink";
import { navigationLinks } from "../../../Data/HeaderData";

export function NavigationBar() {
  return (
    <div className="flex flex-wrap items-center px-16 py-6 text-base font-medium leading-tight whitespace-nowrap text-zinc-900 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6dea0b2546e713fe604ae295a1c126a4157acde60f06f825d89b1d700f4ab0f?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-11 aspect-[1.42]"
        />
        <nav className="flex flex-col self-stretch my-auto min-w-[240px] w-[450px] max-md:max-w-full">
          <div className="flex gap-10 items-center">
            {navigationLinks.map((link) => (
              <NavigationLink key={link.id} label={link.label} />
            ))}
          </div>
        </nav>
      </div>
      <div className="flex gap-3.5 items-center self-stretch my-auto">
        <button 
          className="self-stretch my-auto rounded-none w-[43px]"
          tabIndex="0"
        >
          Login
        </button>
        <div className="shrink-0 self-stretch my-auto w-0 border border-solid border-zinc-400 h-[21px]" />
        <button 
          className="gap-2.5 self-stretch px-4 py-3 my-auto w-36 text-right rounded-xl border-2 border-solid border-zinc-400 min-h-[44px]"
          tabIndex="0"
        >
          Contact
        </button>
      </div>
    </div>
  );
}