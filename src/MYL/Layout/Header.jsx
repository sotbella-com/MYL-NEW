import React, { useState } from "react";
import { navLinks } from "../Data/HeaderData/HeaderData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactButton from "./Buttons/ContactBlackButton";
import CurrencySelector from "../Currency/CurrencySelector";

import logo from '../../MYL/assets/Enterprice/new-logo.png'

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle navigation and smooth scrolling
  // const handleNavigation = (route) => {
  //   if (route.startsWith("#")) {
  //     if (location.pathname !== "/") {
  //       // Navigate to Home first if not already there
  //       navigate("/");
  //       setTimeout(() => {
  //         document.querySelector(route)?.scrollIntoView({ behavior: "smooth" });
  //       }, 500); // Delay to ensure home page is loaded
  //     } else {
  //       document.querySelector(route)?.scrollIntoView({ behavior: "smooth" });
  //     }
  //   } else {
  //     navigate(route);
  //   if (route === "/") {
  //     window.scrollTo(0, 0);
  //   }}
  // };

  // Function to handle navigation and smooth scrolling
  const handleNavigation = (route) => {
    if (route.startsWith("#")) {
      if (location.pathname !== "/") {
        // Navigate to Home first if not already there
        navigate("/");
        setTimeout(() => {
          document.querySelector(route)?.scrollIntoView({ behavior: "smooth" });
        }, 500); // Delay to ensure home page is loaded
      } else {
        document.querySelector(route)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(route);
  
      // **Ensure scroll to top for all routes (including FAQ)**
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }
  
    // Close mobile menu when navigating
    setIsOpen(false);
  };
  

  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between gap-6 py-6 text-base font-medium leading-tight text-zinc-900 w-[90vw] mx-auto">
        {/* Logo & Navigation */}
        <div className="flex gap-8 items-center my-auto">

          {/* left Logo */}
         <div className="flex gap-2 items-center">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex justify-center items-center gap-2"
            >
              <img
                loading="lazy"
                src={logo}
                className="object-cover my-auto w-[237px] lg:w-64"
                alt="logo"
              />
              {/* <div className="font-semibold text-lg lg:text-xl xl:text-2xl">
                MAKE YOUR LABEL
              </div> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-col my-auto">
            <ul className="flex gap-8 items-center text-gray-900">
              {navLinks.map((link) => (
                <li key={link.id} className="hover:font-semibold lg:text-base font-semibold">
                  {link.route.startsWith("#") ? (
                    <a
                      href={link.route}
                      className="self-stretch my-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.route);
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.route}
                      className="self-stretch my-auto"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>          
        </div>

         {/* middle Logo */}
         {/* <div className="hidden lg:flex gap-2 items-center">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex justify-center items-center gap-2"
            >
              <img
                loading="lazy"
                src={logo}
                className="object-cover my-auto w-10 lg:w-28"
                alt="logo"
              /> */}
              {/* <div className="font-semibold text-lg lg:text-xl xl:text-2xl">
                MAKE YOUR LABEL
              </div> */}
            {/* </Link> */}
          {/* </div> */}

        {/* Right Side: Login & Contact Button */}
        <div className="hidden lg:flex gap-4 items-center my-auto">
          {/* <CurrencySelector /> */}
          <Link to="/login">
            <button className="self-stretch my-auto rounded-none text-gray-900 lg:text-lg lg:font-semibold">
              Login
            </button>
          </Link>
          <div className="shrink-0 my-auto w-0 border border-solid border-zinc-400 h-[21px]" />
          <ContactButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Fullscreen Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-30 flex flex-col p-6 space-y-6 text-lg overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link
                to="/"
                className="flex justify-center items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="h-8 w-auto"
                />
                {/* <div className="font-semibold text-xl md:text-xl lg:text-2xl">
                  MAKE YOUR LABEL
                </div> */}
              </Link>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-700 focus:outline-none"
                aria-label="Close Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="w-full border-t border-gray-300">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.route}
                  className="block py-3 w-full text-left border-b border-gray-300 text-gray-700 hover:text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.route);
                    setIsOpen(false);
                    // window.scrollTo(0, 0);
                  }}
                >
                  {link.label}
                </a>
              ))}
              {/* <CurrencySelector /> */}
            </div>

            <Link
              to="/login"
              className="font-semibold w-full text-left flex justify-between items-center hover:text-gray-600"
            >
              <span>Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Mobile Footer - Contact Button */}
            <div className="mt-auto w-full pt-4">
              <div className="flex items-center justify-center mt-4">
                <Link to="/contact" className="w-full lg:w-auto">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-8 py-3 rounded-xl bg-black text-white hover:bg-zinc-900 text-lg font-semibold"
                  >
                    Book A Meeting
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
