import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";

const AddressForm = ({
  address,
  dropdownOptions,
  onInputChange,
  onCountryChange,
  onStateChange,
  onBillingCountryChange,
  onBillingStateChange,
  onShippingCountryChange,
  onShippingStateChange,
  // Either accept these as props or define them internally
  baseURL,
  headers,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const fileKeys = []; // Define any file fields if needed

  const countries = dropdownOptions.countries || [];
  const states = dropdownOptions.states || [];
  const billingStates = dropdownOptions.billingStates || [];
  const shippingStates = dropdownOptions.shippingStates || [];

  useEffect(() => {
    // Initialize form data from address prop
    if (address && address.length > 0) {
      const initialFormData = {};

      // Map address array to formData object format expected by the API
      address.forEach((addr, index) => {
        Object.keys(addr).forEach((key) => {
          initialFormData[`${key}_${index}`] = addr[key];
        });
      });

      setFormData(initialFormData);
    }
  }, [address]);

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validateRequired = (value, fieldName) => {
    if (!value) return `${fieldName} is required`;
    return null;
  };

  const validateMobileNumber = (number) => {
    if (!number) return "Mobile number is required";
    if (!/^\d{10,15}$/.test(number)) return "Invalid mobile number";
    return null;
  };

  // Define the updateUserData function locally if it's not passed as a prop
  const updateUserData = async (baseURL, headers, data) => {
    try {
      // Use the baseURL from props or define a default
      const token = localStorage.getItem("accessToken");
      const url = "https://server.sotbella360.com/account/editAdderss";

      // Use the headers from props or define defaults
      const requestHeaders = {
        Authorization: `Bearer ${token}`,
      };
      console.log("Request body", data);
      const response = await fetch(url, {
        method: "POST", // or 'POST' depending on your API
        headers: requestHeaders,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const addressData = address.map((addr, index) => {
      // Create a properly formatted address object for each address
      return {
        var_landmark: addr.var_landmark,
        var_country: addr.var_country,
        var_state: addr.var_state,
        var_city: addr.var_city,
        var_pincode: addr.var_pincode,

        billing_var_landmark: addr.billing_var_landmark,
        billing_var_country: addr.billing_var_country,
        billing_var_state: addr.billing_var_state,
        billing_var_city: addr.billing_var_city,
        billing_var_pincode: addr.billing_var_pincode,

        shipping_var_landmark: addr.shipping_var_landmark,
        shipping_var_country: addr.shipping_var_country,
        shipping_var_state: addr.shipping_var_state,
        shipping_var_city: addr.shipping_var_city,
        shipping_var_pincode: addr.shipping_var_pincode,

        agreedSMS:
          addr.agreedSMS === true || addr.agreedSMS === "yes" ? "yes" : "no",
        agreedMail:
          addr.agreedMail === true || addr.agreedMail === "yes" ? "yes" : "no",
      };
    });

    // Create the payload for the API
    const updatedFormData = {
      ...formData,
      address: addressData,
    };

    let errorList = {};

    // Only validate user profile fields if they exist in the form
    if (formData.var_email) {
      if (validateEmail(formData.var_email))
        errorList.email = validateEmail(formData.var_email);
    }

    if (formData.var_first_name) {
      if (validateRequired(formData.var_first_name))
        errorList.firstName = validateRequired(
          formData.var_first_name,
          "First Name"
        );
    }

    if (formData.var_second_name) {
      if (validateRequired(formData.var_second_name))
        errorList.secondName = validateRequired(
          formData.var_second_name,
          "Second Name"
        );
    }

    if (formData.var_country_code) {
      if (validateRequired(formData.var_country_code))
        errorList.countryCode = validateRequired(
          formData.var_country_code,
          "Country Code"
        );
    }

    if (formData.var_mobile_no) {
      if (validateMobileNumber(formData.var_mobile_no))
        errorList.mobileNo = validateMobileNumber(formData.var_mobile_no);
    }

    // Validate address fields
    address.forEach((addr, index) => {
      // Add validation for required address fields if needed
      // Example:
      if (!addr.var_country) {
        errorList[`country_${index}`] = validateRequired(
          addr.var_country,
          "Country"
        );
      }
    });

    if (Object.keys(errorList).length === 0) {
      setFormLoading(true);
      setErrors({});
      try {
        // Process any file uploads if present
        for (const key of fileKeys) {
          const file = updatedFormData[key];
          if (file instanceof File) {
            // Handle file upload if needed
            // updatedFormData[key] = await uploadFileToImageKit(key, file);
          }
        }

        // Use the defined updateUserData function
        await updateUserData(baseURL, headers, updatedFormData);
        setFormLoading(false);
        alert("Address updated successfully!");
      } catch (error) {
        setFormLoading(false);
        console.error("Error updating address:", error);
        alert("Failed to update address. Please try again.");
      }
    } else {
      setErrors(errorList);
      alert("Validation Failed, Check again for errors");
    }
  };

  return (
    <fieldset className="space-y-8 font-jakarta">
      {address.map((addr, index) => (
        <div key={index}>
          <h5 className="text-xl md:text-4xl mb-5 md:mb-10 font-semibold">
            {index === 0 ? "Primary Address" : `Address ${index + 1}`}
          </h5>

          {/* General Address Fields */}
          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Landmark"
                value={addr.var_landmark || ""}
                placeholder="Landmark"
                onChange={(e) =>
                  onInputChange("var_landmark", e.target.value, index)
                }
                error={errors[`landmark_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="Country"
                value={
                  countries.find((country) => country.name === addr.var_country)
                    ?.id || ""
                }
                options={dropdownOptions.countries || []}
                onChange={(e) => onCountryChange(e.target.value, index)}
                error={errors[`country_${index}`]}
              />
            </div>
          </div>

          {/* Rest of the form fields remain the same */}
          {/* ... */}

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <Dropdown
                label="State"
                value={
                  states.find((state) => state.name === addr.var_state)?.id ||
                  ""
                }
                options={dropdownOptions.states || []}
                onChange={(e) => onStateChange(e.target.value, index)}
                error={errors[`state_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="City"
                value={addr.var_city || ""}
                options={dropdownOptions.cities || []}
                onChange={(e) =>
                  onInputChange("var_city", e.target.value, index)
                }
                error={errors[`city_${index}`]}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Pincode"
                value={addr.var_pincode || ""}
                placeholder="Pincode"
                onChange={(e) =>
                  onInputChange("var_pincode", e.target.value, index)
                }
                error={errors[`pincode_${index}`]}
              />
            </div>
            <div className="w-[50%]"></div>
          </div>

          {/* Billing Address Fields */}
          <h5 className="text-xl md:text-4xl my-5 md:my-10 font-semibold">
            Billing Address
          </h5>
          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Billing Landmark"
                value={addr.billing_var_landmark || ""}
                placeholder="Billing Landmark"
                onChange={(e) =>
                  onInputChange("billing_var_landmark", e.target.value, index)
                }
                error={errors[`billing_landmark_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="Billing Country"
                value={
                  countries.find(
                    (country) => country.name === addr.billing_var_country
                  )?.id || ""
                }
                options={dropdownOptions.countries || []}
                onChange={(e) => onBillingCountryChange(e.target.value, index)}
                error={errors[`billing_country_${index}`]}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <Dropdown
                label="Billing State"
                value={
                  billingStates.find(
                    (state) => state.name === addr.billing_var_state
                  )?.id || ""
                }
                options={dropdownOptions.billingStates || []}
                onChange={(e) => onBillingStateChange(e.target.value, index)}
                error={errors[`billing_state_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="Billing City"
                value={addr.billing_var_city || ""}
                options={dropdownOptions.billingCities || []}
                onChange={(e) =>
                  onInputChange("billing_var_city", e.target.value, index)
                }
                error={errors[`billing_city_${index}`]}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Billing Pincode"
                value={addr.billing_var_pincode || ""}
                placeholder="Billing Pincode"
                onChange={(e) =>
                  onInputChange("billing_var_pincode", e.target.value, index)
                }
                error={errors[`billing_pincode_${index}`]}
              />
            </div>
            <div className="w-[50%]"></div>
          </div>

          {/* Shipping Address Fields */}
          <h5 className="text-xl md:text-4xl my-5 md:my-10 font-semibold">
            Shipping Address
          </h5>
          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Shipping Landmark"
                value={addr.shipping_var_landmark || ""}
                placeholder="Shipping Landmark"
                onChange={(e) =>
                  onInputChange("shipping_var_landmark", e.target.value, index)
                }
                error={errors[`shipping_landmark_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="Shipping Country"
                value={
                  countries.find(
                    (country) => country.name === addr.shipping_var_country
                  )?.id || ""
                }
                options={dropdownOptions.countries || []}
                onChange={(e) => onShippingCountryChange(e.target.value, index)}
                error={errors[`shipping_country_${index}`]}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <Dropdown
                label="Shipping State"
                value={
                  shippingStates.find(
                    (state) => state.name === addr.shipping_var_state
                  )?.id || ""
                }
                options={dropdownOptions.shippingStates || []}
                onChange={(e) => onShippingStateChange(e.target.value, index)}
                error={errors[`shipping_state_${index}`]}
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                label="Shipping City"
                value={addr.shipping_var_city || ""}
                options={dropdownOptions.shippingCities || []}
                onChange={(e) =>
                  onInputChange("shipping_var_city", e.target.value, index)
                }
                error={errors[`shipping_city_${index}`]}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-[50%]">
              <InputField
                label="Shipping Pincode"
                value={addr.shipping_var_pincode || ""}
                placeholder="Shipping Pincode"
                onChange={(e) =>
                  onInputChange("shipping_var_pincode", e.target.value, index)
                }
                error={errors[`shipping_pincode_${index}`]}
              />
            </div>
            <div className="w-[50%]"></div>
          </div>

          {/* Consent Fields */}
          <div className="flex space-x-3">
            <div className="flex w-[50%]">
              <label className="block text-xs md:text-base font-medium text-gray-700 mb-1 mr-2 w-[50%]">
                Agree to SMS Notifications
              </label>
              <input
                type="checkbox"
                checked={addr.agreedSMS === "yes"}
                onChange={(e) =>
                  onInputChange(
                    "agreedSMS",
                    e.target.checked ? "yes" : "no",
                    index
                  )
                }
                className="col-span-2 h-3 w-3 md:h-5 md:w-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-[50%]">
              <label className="block text-xs md:text-base font-medium text-gray-700 mb-1 mr-2 w-[50%]">
                Agree to Email Notifications
              </label>
              <input
                type="checkbox"
                checked={addr.agreedMail === "yes"}
                onChange={(e) =>
                  onInputChange(
                    "agreedMail",
                    e.target.checked ? "yes" : "no",
                    index
                  )
                }
                className="col-span-2 h-3 w-3 md:h-5 md:w-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end mb-4">
        <button
          className="text-base md:text-xl bg-black text-white px-10 md:px-16 py-2 md:py-4 rounded-xl hover:bg-gray-900"
          onClick={handleSubmit}
          disabled={formLoading}
        >
          {formLoading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </fieldset>
  );
};

export default AddressForm;
