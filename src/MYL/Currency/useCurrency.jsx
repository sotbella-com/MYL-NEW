import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";

const useCurrency = () => {
  const { selectedCurrency, exchangeRates } = useContext(CurrencyContext);

  const convertPrice = (priceInUSD) => {
    if (!exchangeRates[selectedCurrency]) return priceInUSD; // Default to USD if no rate found
    return (priceInUSD * exchangeRates[selectedCurrency]).toFixed(2);
  };

  return { convertPrice, selectedCurrency };
};

export default useCurrency;
