import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiOutlineMenu, HiX } from "react-icons/hi"; // Mobile icons
import arrow from "../../MYL/assets/Icons/arrow-down.png";
import { ProtectedNavlinks } from "../Data/HeaderData/HeaderData";
import { Link } from "react-router-dom";
import { exportToCSV, exportToPDF } from "../../utils/exportData";
import { useCart } from "../Pages/Cart/CartContext";
import logo from '../../MYL/assets/Enterprice/new-logo.png'
import ExportOptions from "../Pages/Product/Listing/Components/ExportOptions";

function ProtectedHeader({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportMenu, setExportMenu] = useState(false);
  const { cart } = useCart(); // Get cart data from context
  const [cartCount, setCartCount] = useState(cart.length); // State for cart count
  const dropdownRef = useRef(null); // Reference for closing the dropdown when clicking outside

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  

   // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExportMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between gap-6 py-4 text-base font-medium leading-tight whitespace-nowrap text-zinc-900 w-[90vw] mx-auto">
        {/* Left Section - Logo */}
        <div className="flex gap-2 items-center">
          <Link
            to="/collections"
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

        {/* PC Navigation Menu */}
        <nav className="hidden lg:flex ml-auto">
          <ul className="flex justify-between gap-6 items-center">
            {ProtectedNavlinks.map((link) => (
              <li key={link.id}>
                <Link to={link.route} className="flex items-center gap-2">
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-zinc-900 text-base xl:text-lg">
                    {link.label}
                  </span>
                  {/* Show cart badge only for Cart */}
                  {link.label === "Cart" && cartCount > 0 && (
                    <span className="absolute top-4 transform translate-x-1/2 bg-red-500 rounded-full text-white text-xs px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Custom Query & Export Buttons PC */}
        <div className="hidden lg:flex gap-4 items-center">
          {/* Custom Query Button */}
          <Link to="/custom-query">
            <button className="px-4 py-2 border border-black rounded-lg text-black font-medium hover:bg-gray-100">
              Custom Query
            </button>
          </Link>

          {/* Divider Line */}
          <div className="w-px h-5 bg-gray-400" />

          {/* Export Button */}
         <ExportOptions/>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <HiOutlineMenu className="w-8 h-8 text-black" />
        </button>

        {/* Mobile Fullscreen Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-30 flex flex-col p-6 space-y-6 text-lg overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link
                to="/collections"
                className="flex justify-center items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="object-cover my-auto w-[237px] lg:w-64"
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
                <HiX className="w-8 h-8 text-black" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="w-full border-t border-gray-300">
              {ProtectedNavlinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.route}
                  className="flex items-center gap-4 py-3 w-full text-left border-b border-gray-300 text-gray-700 hover:text-black"
                  onClick={() => {
                    setIsOpen(false); // Close the menu
                    window.scrollTo(0, 0); // Scroll to top
                  }}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-6 h-6 object-contain"
                  />
                  <span>{link.label}</span>
                   {/* Show cart badge only for Cart */}
                   {link.label === "Cart" && cartCount > 0 && (
                    <span className="transform translate-x-1/2 bg-red-500 rounded-full text-white text-xs px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Custom Query Button (Mobile View) */}
            <Link to="/custom-query">
              <button
                className="px-4 py-3 w-full rounded-lg border border-black text-black font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Custom Query
              </button>
            </Link>

            {/* Export Button (Mobile View) */}
            <ExportOptions closeMenu={() => setIsOpen(false)}/>
          </div>
        )}
      </div>
    </header>
  );
}

export default ProtectedHeader;
