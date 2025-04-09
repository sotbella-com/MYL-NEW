import React, { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Default currency is USD
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 }); // Store exchange rates

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/dd61cd9b4c14587df7291fd1/latest/USD" // Fetch rates based on USD
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates); // Stores conversion rates relative to USD
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
