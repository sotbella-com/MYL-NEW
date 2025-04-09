import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "./CurrencyContext";
import axios from "axios";

const currencyMap = [
  { code: "INR", label: "₹ INR", flag: "https://flagcdn.com/w40/in.png" },
  { code: "USD", label: "$ USD", flag: "https://flagcdn.com/w40/us.png" },
  { code: "EUR", label: "€ EUR", flag: "https://flagcdn.com/w40/eu.png" },
  { code: "GBP", label: "£ GBP", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "AUD", label: "A$ AUD", flag: "https://flagcdn.com/w40/au.png" },
];

// Country to Currency Mapping
const countryToCurrency = {
  IN: "INR",
  US: "USD",
  EU: "EUR",
  GB: "GBP",
  AU: "AUD",
};

const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);
  const [isIpDetected, setIsIpDetected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const countryCode = response.data.country_code;
        const detectedCurrency = countryToCurrency[countryCode] || "USD";

        // Only update if the user hasn't manually changed the currency
        if (!isIpDetected && selectedCurrency === "USD") {
          setSelectedCurrency(detectedCurrency);
          setIsIpDetected(true);
        }
      } catch (error) {
        console.error("Error fetching IP-based currency:", error);
      }
    };

    if (!isIpDetected) {
      fetchUserCurrency();
    }
  }, [isIpDetected, selectedCurrency, setSelectedCurrency]);

  return (
    <div className="relative inline-block text-left mt-4 lg:mt-0">
      {/* Selected Currency Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white shadow-sm"
      >
        <img
          src={currencyMap.find((opt) => opt.code === selectedCurrency)?.flag}
          alt={selectedCurrency}
          className="w-5 h-4 mr-2"
        />
        {selectedCurrency}

        {/* Dropdown Icon */}
        <span className="ml-2">
          {isDropdownOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7 7 7-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7-7 7" />
            </svg>
          )}
        </span>
      </button>

      {/* Dropdown Menu (Opens as Drop-Up) */}
      {isDropdownOpen && (
        <ul className="absolute left-0 bottom-full mb-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-50">
          {currencyMap.map((option) => (
            <li
              key={option.code}
              onClick={() => {
                setSelectedCurrency(option.code);
                setIsDropdownOpen(false);
                setIsIpDetected(true);
              }}
              className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <img src={option.flag} alt={option.code} className="w-5 h-4 mr-2" />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
