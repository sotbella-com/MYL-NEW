import React from "react";
import { footerData } from "../Data/Footer/FooterData";
import { Link } from "react-router-dom";
import ContactTransparentBtn from "./Buttons/ContactTransparentBtn";
import CurrencySelector from "../Currency/CurrencySelector";
import logo from "../../MYL/assets/Enterprice/footer-logo.png"


function Footer() {
  return (
    <footer className="flex relative flex-col justify-center bg-black">
      {/* Background Image */}
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dcb4878c4eb42e0cbb2a3f71724d25c44396e9c5e9a38e6b855a16fca43c355?placeholderIfAbsent=true&apiKey=13fbb5ba317043f0867fe0cbadba6e4c"
          className="object-cover absolute inset-0 size-full"
          alt="Footer background"
        /> */}

      <div className="flex relative flex-col w-[90%] mx-auto my-20">
        {/* Header Section */}
        <div className="flex flex-shrink gap-10 justify-between items-center w-full max-md:max-w-full">
          <h2 className="font-Plus Jakarta Sans text-xl lg:text-3xl text-white">
          Schedule a meeting now!
          </h2>
          <ContactTransparentBtn />
        </div>
        <div className="mt-9 w-full border border-white" />

        {/* Footer Content */}
        <div className="flex flex-col lg:flex-row flex-shrink gap-10 justify-between items-start mt-10">
          {/* Company Info */}
          <div className="flex flex-col text-white">
            <div className="flex gap-2 items-center">
              <Link to='/'
              onClick={() => window.scrollTo(0, 0)}
              className="flex justify-center items-center gap-2">
              <img
                loading="lazy"
                src={logo}
                className="object-cover my-auto w-[237px] lg:w-64"
                alt="Company logo"
              />              
              {/* <div className="font-semibold text-lg lg:text-xl xl:text-2xl">{footerData.company.name}</div> */}
              </Link>
            </div>
            <p className="mt-4 text-sm cursor-pointer">{footerData.company.address}</p>
            <div className="flex text-xs md:text-sm mt-2">
              <span className="font-semibold">Phone:</span>
              <div className="flex flex-col ml-1">
                {footerData.company.phoneNumbers.map((phone, index) => (
                  <p key={index}>
                    <a href={`tel:${phone.number}`} className="underline mr-1">
                      {phone.number}
                    </a>
                    <span>{phone.country}</span>
                  </p>
                ))}
              </div>
            </div>
            <p className="text-xs mt-2 md:text-sm">
              <span className="font-semibold">Email:</span>{" "}
              <a href={`mailto:${footerData.company.email}`} className="hover:underline">
                {footerData.company.email}
              </a>
            </p>
          </div>

          {/* Dynamic Links */}
          <nav className="flex flex-col lg:flex-row flex-shrink gap-10 lg:gap-20 items-start justify-between w-[55%]">
            {footerData.links.map(({ title, items }, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col justify-start items-start rounded-none">
                <h3 className="font-Plus Jakarta Sans text-base font-bold text-white">
                  {title}
                </h3>
                <ul className="mt-3 lg:mt-5 text-sm space-y-1.5 lg:space-y-2.5 text-white">
                  {items.map((item, index) => (
                    <li key={index} className="hover:underline">
                      {item.external ? (
                        <a
                          href={item.route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link to={item.route} 
                        onClick={() => window.scrollTo(0, 0)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex justify-end">
        <CurrencySelector/>
      </div>
      </div>
      
    </footer>
  );
}

export default Footer;
