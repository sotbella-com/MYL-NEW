export const validateRequired = (value, label) => {
    if (!value) return `${label} is required.`;
    return null;
  };
 export const validateGSTNumber = (value) => {
    if (!value) return "GST Number is required.";
    if (!/^[0-9]{15}$/.test(value)) return "GST Number must be 15 digits.";
    return null;
  };

 export const validateFile = (file) => {
    if (!file) return "File is required.";
    if (!file.type.includes("pdf")) return "Only PDF files are allowed.";
    if (file.size > 2 * 1024 * 1024) return "File size must be less than 2MB.";
    return null;
  }

export const validateEmail = (value) => {
    if (!value) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address.";
    return null;
};

export const validateMobileNumber = (value) => {
    if (!value) return "Mobile Number is required.";
    if (!/^\d{10}$/.test(value)) return "Mobile Number must be 10 digits.";
    return null;
};

export const validateWebsite = (value) => {
    if (!value) return "Company Website is required.";
    if (!/^https?:\/\/[^\s]+$/.test(value)) return "Invalid website URL.";
    return null;
};

export const validateCostRange = (value, label) => {
    if (value === null || value === undefined || value === "")
        return `${label} is required.`;
    if (isNaN(value) || value < 0) return `${label} must be a valid positive number.`;
    return null;
}
export const validatePincode = (value) => {
    if (!value) return "Pincode is required.";
    if (!/^\d{6}$/.test(value)) return "Pincode must be 6 digits.";
    return null;
  }