export const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "INR": return "₹";
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "AUD": return "A$";
      default: return "";
    }
  };