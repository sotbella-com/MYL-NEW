import React, { useState, useEffect, useRef } from "react";
import BrandDetailsForm from "./Forms_Updated/BrandDetailsForm";
import AddressForm from "./Forms_Updated/AddressForm";
import KYCDetailsForm from "./Forms_Updated/KYCDetailsForm";
import {
  fetchUserData,
  fetchAddressData,
  fetchJobDropdownOptions,
  updateUserData,
  fetchCountries,
  fetchStates,
  fetchCities,
} from "../../../MYL/utils/api";
import {
  initialFormData,
  defaultDropdownOptions,
} from "../../../MYL/utils/formAttributes";
import {
  validateEmail,
  validateMobileNumber,
  validateRequired,
} from "../../../MYL/utils/formValidation";
import { uploadFileToImageKit } from "../../../MYL/utils/fileUploadUtils";
import Loader from "../../../MYL/utils/Loader";
import { useNavigate } from "react-router-dom";

const FormComponent_Updated = () => {
  const navigate = useNavigate();
  //state Logic
  const [activeTab, setActiveTab] = useState("BrandDetails");
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [error, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [dropdownOptions, setDropdownOptions] = useState(
    defaultDropdownOptions
  );
  const [formLoading, setFormLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // const brandDetailsRef = useRef();
  // const addressFormRef = useRef();
  // const kycDetailsFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, address, countries, jobTitles] = await Promise.all([
          fetchUserData(baseURL, headers),
          fetchAddressData(baseURL, headers),
          fetchCountries(baseURL),
          fetchJobDropdownOptions(baseURL, headers),
        ]);

        const formattedCountries = countries.map((country) => ({
          id: country.isoCode,
          name: country.name,
        }));
        const formattedJobTitles = jobTitles.map((job) => ({
          id: job._id,
          name: job.title,
        }));
        // Populate formData and address
        const populatedAddress =
          address.length > 0 ? address : initialFormData.address;

        setFormData((prev) => ({
          ...prev,
          ...userData,
          address: populatedAddress,
        }));

        // Set initial dropdown options
        setDropdownOptions({
          jobTitles: formattedJobTitles,
          countries: formattedCountries,
          categories: [
            { id: 1, name: "Electronics" },
            { id: 2, name: "Clothing" },
          ],
          productTypes: [
            { id: 1, name: "Gadgets" },
            { id: 2, name: "Accessories" },
          ],
          currencies: [
            { id: 1, name: "USD" },
            { id: 2, name: "INR" },
          ],
          kycDocumentTypes: [
            { id: 1, name: "Passport" },
            { id: 2, name: "Driver's License" },
          ],
          states: [],
          cities: [],
          billingStates: [],
          billingCities: [],
          shippingStates: [],
          shippingCities: [],
        });

        // Populate states and cities for general, billing, and shipping addresses from address data
        for (const addr of populatedAddress) {
          // General address
          if (addr.var_country) {
            const countryIsoCode = formattedCountries.find(
              (country) => country.name === addr.var_country
            )?.id;

            if (countryIsoCode) {
              const existingStates = populatedAddress
                .filter((a) => a.var_country === addr.var_country)
                .map((a) => ({ id: a.var_state, name: a.var_state }));

              setDropdownOptions((prev) => ({
                ...prev,
                states: existingStates,
              }));

              if (addr.var_state) {
                const existingCities = populatedAddress
                  .filter((a) => a.var_state === addr.var_state)
                  .map((a) => ({ id: a.var_city, name: a.var_city }));

                setDropdownOptions((prev) => ({
                  ...prev,
                  cities: existingCities,
                }));
              }
            }
          }

          // Billing address
          if (addr.billing_var_country) {
            const billingCountryIsoCode = formattedCountries.find(
              (country) => country.name === addr.billing_var_country
            )?.id;

            if (billingCountryIsoCode) {
              const existingBillingStates = populatedAddress
                .filter(
                  (a) => a.billing_var_country === addr.billing_var_country
                )
                .map((a) => ({
                  id: a.billing_var_state,
                  name: a.billing_var_state,
                }));

              setDropdownOptions((prev) => ({
                ...prev,
                billingStates: existingBillingStates,
              }));

              if (addr.billing_var_state) {
                const existingBillingCities = populatedAddress
                  .filter((a) => a.billing_var_state === addr.billing_var_state)
                  .map((a) => ({
                    id: a.billing_var_city,
                    name: a.billing_var_city,
                  }));

                setDropdownOptions((prev) => ({
                  ...prev,
                  billingCities: existingBillingCities,
                }));
              }
            }
          }

          // Shipping address
          if (addr.shipping_var_country) {
            const shippingCountryIsoCode = formattedCountries.find(
              (country) => country.name === addr.shipping_var_country
            )?.id;

            if (shippingCountryIsoCode) {
              const existingShippingStates = populatedAddress
                .filter(
                  (a) => a.shipping_var_country === addr.shipping_var_country
                )
                .map((a) => ({
                  id: a.shipping_var_state,
                  name: a.shipping_var_state,
                }));

              setDropdownOptions((prev) => ({
                ...prev,
                shippingStates: existingShippingStates,
              }));

              if (addr.shipping_var_state) {
                const existingShippingCities = populatedAddress
                  .filter(
                    (a) => a.shipping_var_state === addr.shipping_var_state
                  )
                  .map((a) => ({
                    id: a.shipping_var_city,
                    name: a.shipping_var_city,
                  }));

                setDropdownOptions((prev) => ({
                  ...prev,
                  shippingCities: existingShippingCities,
                }));
              }
            }
          }
        }
      } catch (error) {
        
      } finally {
        setProfileLoading(false); // Ensure loader is removed
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (key, value, index = null) => {
    if (index !== null) {
      setFormData((prev) => {
        const updatedAddresses = [...prev.address];
        updatedAddresses[index][key] =
          typeof value === "boolean" ? (value ? "yes" : "no") : value;
        return { ...prev, address: updatedAddresses };
      });
    }
     else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Handles general address country changes
  const handleCountryChange = async (isoCode, index) => {
    const selectedCountry = dropdownOptions.countries.find(
      (country) => country.id === isoCode
    );
    if (!isoCode) return;

    try {
      const states = await fetchStates(isoCode);
      const formattedStates = states.map((state) => ({
        id: state.isoCode,
        name: state.name,
      }));

      setDropdownOptions((prev) => ({
        ...prev,
        states: formattedStates,
        cities: [], // Clear cities
      }));
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        states: [],
        cities: [], // Clear cities
      }));
      console.error("Error fetching states:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        var_country: selectedCountry.name, // Store selected country ISO code
        var_state: "", // Clear state
        var_city: "", // Clear city
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  const handleBrandCountryChange = (isoCode) => {
    const selectedCountry = dropdownOptions.countries.find(
      (country) => country.id === isoCode
    );

    if (!selectedCountry) return;

    // Update formData with the selected country name
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry.name, // Store country name for Brand Details
    }));
  };

  // Handles general address state changes
  const handleStateChange = async (stateCode, index) => {
    const selectedState = dropdownOptions.states.find(
      (state) => state.id === stateCode
    );

    // Find the isoCode for the country from dropdownOptions
    const countryName = formData.address[index]?.var_country;
    const countryIsoCode = dropdownOptions.countries.find(
      (country) => country.name === countryName
    )?.id; // Retrieve the isoCode (id)

    if (!stateCode || !countryIsoCode) {
      console.error("Missing state code or country isoCode");
      return;
    }

    try {
      // Fetch cities using the country isoCode and state code
      const cities = await fetchCities(countryIsoCode, stateCode);
      const formattedCities = cities.map((city) => ({
        id: city.id,
        name: city.name,
      }));

      // Update dropdown options and clear selected city
      setDropdownOptions((prev) => ({
        ...prev,
        cities: formattedCities,
      }));

      // Update formData
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        cities: [],
      }));
      console.error("Error fetching cities:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        var_state: selectedState.name, // Keep stateCode in formData
        var_city: "", // Clear city selection
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  // Handles billing address country changes
  const handleBillingCountryChange = async (isoCode, index) => {
    const selectedCountry = dropdownOptions.countries.find(
      (country) => country.id === isoCode
    );

    if (!isoCode || !selectedCountry) return;

    try {
      const states = await fetchStates(isoCode);
      const formattedStates = states.map((state) => ({
        id: state.isoCode,
        name: state.name,
      }));

      setDropdownOptions((prev) => ({
        ...prev,
        billingStates: formattedStates,
        billingCities: [], // Clear billing cities
      }));
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        billingStates: [],
        billingCities: [], // Clear billing cities
      }));
      console.error("Error fetching billing states:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        billing_var_country: selectedCountry.name, // Store country name
        billing_var_state: "", // Clear state
        billing_var_city: "", // Clear city
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  // Handles billing address state changes
  const handleBillingStateChange = async (stateCode, index) => {
    const countryName = formData.address[index]?.billing_var_country;
    const countryIsoCode = dropdownOptions.countries.find(
      (country) => country.name === countryName
    )?.id;

    const selectedState = dropdownOptions.billingStates.find(
      (state) => state.id === stateCode
    );

    if (!stateCode || !countryIsoCode || !selectedState) return;

    try {
      const cities = await fetchCities(countryIsoCode, stateCode);
      const formattedCities = cities.map((city) => ({
        id: city.id,
        name: city.name,
      }));

      setDropdownOptions((prev) => ({
        ...prev,
        billingCities: formattedCities,
      }));
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        billingCities: [],
      }));
      console.error("Error fetching billing cities:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        billing_var_state: selectedState.name, // Store state name
        billing_var_city: "", // Clear city
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  // Handles shipping address country changes
  const handleShippingCountryChange = async (isoCode, index) => {
    const selectedCountry = dropdownOptions.countries.find(
      (country) => country.id === isoCode
    );

    if (!isoCode || !selectedCountry) return;

    try {
      const states = await fetchStates(isoCode);
      const formattedStates = states.map((state) => ({
        id: state.isoCode,
        name: state.name,
      }));

      setDropdownOptions((prev) => ({
        ...prev,
        shippingStates: formattedStates,
        shippingCities: [], // Clear shipping cities
      }));
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        shippingStates: [],
        shippingCities: [], // Clear shipping cities
      }));
      console.error("Error fetching shipping states:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        shipping_var_country: selectedCountry.name, // Store country name
        shipping_var_state: "", // Clear state
        shipping_var_city: "", // Clear city
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  // Handles shipping address state changes
  const handleShippingStateChange = async (stateCode, index) => {
    const countryName = formData.address[index]?.shipping_var_country;
    const countryIsoCode = dropdownOptions.countries.find(
      (country) => country.name === countryName
    )?.id;

    const selectedState = dropdownOptions.shippingStates.find(
      (state) => state.id === stateCode
    );

    if (!stateCode || !countryIsoCode || !selectedState) return;

    try {
      const cities = await fetchCities(countryIsoCode, stateCode);
      const formattedCities = cities.map((city) => ({
        id: city.id,
        name: city.name,
      }));

      setDropdownOptions((prev) => ({
        ...prev,
        shippingCities: formattedCities,
      }));
    } catch (error) {
      setDropdownOptions((prev) => ({
        ...prev,
        shippingCities: [],
      }));
      console.error("Error fetching shipping cities:", error);
    }
    setFormData((prev) => {
      const updatedAddresses = [...prev.address];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        shipping_var_state: selectedState.name, // Store state name
        shipping_var_city: "", // Clear city
      };
      return { ...prev, address: updatedAddresses };
    });
  };

  const handleFileChange = async (key, e) => {
    try {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData((prev) => ({ ...prev, [key]: file })); // Store uploaded file URL
    } catch (error) {
      alert("Failed to upload file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileKeys = ["gst_certificate", "kyc_document"];

    const updatedFormData = { ...formData };

    let errorList = {};

    if (validateEmail(formData.var_email))
      errorList.email = validateEmail(formData.var_email);
    if (validateRequired(formData.var_first_name))
      errorList.firstName = validateRequired(
        formData.var_first_name,
        "First Name"
      );
    if (validateRequired(formData.var_second_name))
      errorList.secondName = validateRequired(
        formData.var_second_name,
        "Second Name"
      );
    if (validateRequired(formData.var_country_code))
      errorList.countryCode = validateRequired(
        formData.var_country_code,
        "Country Code"
      );
    if (validateMobileNumber(formData.var_mobile_no))
      errorList.mobileNo = validateMobileNumber(formData.var_mobile_no);

    if (Object.keys(errorList).length == 0) {
      setFormLoading(true);
      setErrors({});
      try {
        for (const key of fileKeys) {
          const file = updatedFormData[key];
          if (file instanceof File) {
            updatedFormData[key] = await uploadFileToImageKit(key, file);
          }
        }

        await updateUserData(baseURL, headers, updatedFormData);
        setFormLoading(false);
        alert("Profile updated successfully!");
      } catch (error) {
        setFormLoading(false);
        alert(error,"Failed to update profile. Please try again.");
      }
    } 
    else {
      setErrors(errorList);
      alert("Validation Failed, Check again for errors");
    }
  };
  useEffect(() => {
    if (formLoading) {
    }
  }, [formLoading]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div id="export-area" className="font-jakarta w-[90vw] mx-auto md:mt-10">
      {/* {profileLoading && <Loader />} */}
      {/* {!profileLoading && ( */}
        <div>
          {/* <div className="flex justify-end">
        <button className="text-base md:text-xl bg-black text-white px-10 md:px-16 py-2 md:py-4 rounded-xl hover:bg-gray-900" onClick={handleSubmit}>
          Save
        </button>
      </div> */}

          {formLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded shadow-lg">
            <p>Submitting Data...</p>
          </div>
        </div>
        )}

          {/* Brand Overview section */}
          <div className="flex space-x-8 md:space-x-20">
            {["Overview", "BrandDetails", "Address", "KYCDetails"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-2 text-sm md:text-2xl font-medium 
              ${
                activeTab === tab
                  ? "border-black border-b-2 text-black"
                  : "bg-transparent text-gray-500"
              }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.replace(/([A-Z])/g, " $1").trim()}
                </button>
              )
            )}
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <div class="flex flex-col w-full md:w-[30%] md:border-r md:border-black">
              <div class="flex space-x-2 mt-5 md:mt-10">               

                  <div class="w-[127px] h-[131px] bg-[#464646] rounded-xl flex justify-center items-center text-white text-base md:text-xl font-bold">

              <span className="text-lg lg:text-2xl">
                {formData.company_name ? formData.company_name.charAt(0).toUpperCase() : "logo"}
              </span>

                </div>

                <div>
                  <h2 class="font-semibold text-2xl mt-2">
                    {formData.company_name ? formData.company_name : "Brand Name"}
                  </h2>
                  <p class="text-lg text-[#4B5262] flex items-center font-semibold">
                    {formData.var_first_name || formData.var_second_name
                      ? `${formData.var_first_name || ""} ${
                          formData.var_second_name || ""
                        }`.trim()
                      : "Age - 45 years"}
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className="flex flex-col space-y-2 md:space-y-4 pb-2 md:pb-4 border-b border-black">
                <h3 className="text-base md:text-xl font-semibold mt-2 md:mt-4">
                  About
                </h3>
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15826 5.71223L8.7556 4.80625C8.49232 4.21388 8.36068 3.91768 8.16381 3.69101C7.91708 3.40694 7.59547 3.19794 7.23568 3.08785C6.94859 3 6.62446 3 5.97621 3C5.02791 3 4.55376 3 4.15573 3.18229C3.68687 3.39702 3.26344 3.86328 3.09473 4.3506C2.95151 4.76429 2.99254 5.18943 3.07458 6.0397C3.94791 15.0902 8.90982 20.0521 17.9603 20.9254C18.8106 21.0075 19.2358 21.0485 19.6494 20.9053C20.1368 20.7366 20.603 20.3131 20.8178 19.8443C21 19.4462 21 18.9721 21 18.0238C21 17.3755 21 17.0514 20.9122 16.7643C20.8021 16.4045 20.5931 16.0829 20.309 15.8362C20.0824 15.6393 19.7862 15.5077 19.1938 15.2444L18.2878 14.8417C17.6463 14.5566 17.3255 14.4141 16.9996 14.3831C16.6876 14.3534 16.3731 14.3972 16.0811 14.5109C15.776 14.6297 15.5064 14.8544 14.967 15.3038C14.4302 15.7512 14.1618 15.9749 13.8338 16.0947C13.543 16.2009 13.1586 16.2403 12.8524 16.1951C12.5069 16.1442 12.2424 16.0029 11.7133 15.7201C10.0673 14.8405 9.15953 13.9328 8.27987 12.2867C7.99714 11.7577 7.85578 11.4931 7.80487 11.1477C7.75974 10.8414 7.79908 10.457 7.9053 10.1663C8.02512 9.83828 8.24881 9.56986 8.69619 9.033C9.14562 8.49368 9.37034 8.22402 9.48915 7.91891C9.60285 7.62694 9.64662 7.3124 9.61695 7.00048C9.58594 6.67452 9.44338 6.35376 9.15826 5.71223Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  Phone: {formData.var_mobile_no}
                </p>
                <p className="flex items-center text-[#4B5262] text-sm md:text-base gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Email: {formData.var_email}
                </p>
              </div>

              {/* Address Section */}
              <div className="flex flex-col space-y-2 md:space-y-4 pb-2 md:pb-4 border-b border-black">
                <h3 className="text-base md:text-xl font-semibold text-[#4B5262] mt-2 md:mt-4">
                  Address
                </h3>
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 9H19C20.6569 9 22 10.3431 22 12V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V12C2 10.3431 3.34315 9 5 9H6.5"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 12L10.5 14.625M10.5 14.625L13.8 16.55M10.5 14.625L6 17.6M13.8 16.55L18 19M13.8 16.55L18 13.75"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Address:{" "}
                  {formData.address?.map((addr, index) => (
                    <span key={index}>{addr.var_landmark || "N/A"}</span>
                  ))}
                </p>
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2H6C3.518 2 3 2.518 3 5V22H15V5C15 2.518 14.482 2 12 2Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18 8H15V22H21V11C21 8.518 20.482 8 18 8Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6H10M8 9H10M8 12H10"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 22V18C11.5 17.0572 11.5 16.5858 11.2071 16.2929C10.9142 16 10.4428 16 9.5 16H8.5C7.55719 16 7.08579 16 6.79289 16.2929C6.5 16.5858 6.5 17.0572 6.5 18V22"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                  City state:
                  {formData.address?.map((addr, index) => (
                    <span key={index}>
                      {[
                        dropdownOptions.states?.find(
                          (state) => state.name === addr.var_state
                        )?.name || addr.var_state,
                        addr.var_city,
                      ]
                        .filter(Boolean)
                        .join(", ") || "N/A"}
                    </span>
                  ))}
                </p>
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                    />
                    <path
                      d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                    />
                  </svg>
                  Passcode:{" "}
                  {formData.address?.map((addr, index) => (
                    <span key={index}>{addr.var_pincode || "N/A"}</span>
                  ))}
                </p>
              </div>

              {/* Details Section */}
              <div className="flex flex-col space-y-2 md:space-y-4 pb-2 md:pb-4 border-b border-black">
                <h3 className="text-base md:text-xl font-semibold text-[#4B5262] mt-2 md:mt-4">
                  Details
                </h3>
                {/* <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5 20V17.9704C18.5 16.7281 17.9407 15.5099 16.8103 14.9946C15.4315 14.3661 13.7779 14 12 14C10.2221 14 8.5685 14.3661 7.18968 14.9946C6.05927 15.5099 5.5 16.7281 5.5 17.9704V20"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 11C13.933 11 15.5 9.433 15.5 7.5C15.5 5.567 13.933 4 12 4C10.067 4 8.5 5.567 8.5 7.5C8.5 9.433 10.067 11 12 11Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  National ID: {formData.pincode ? formData.pincode : "12345678"}
                </p> */}
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2H6C3.518 2 3 2.518 3 5V22H15V5C15 2.518 14.482 2 12 2Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18 8H15V22H21V11C21 8.518 20.482 8 18 8Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6H10M8 9H10M8 12H10"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 22V18C11.5 17.0572 11.5 16.5858 11.2071 16.2929C10.9142 16 10.4428 16 9.5 16H8.5C7.55719 16 7.08579 16 6.79289 16.2929C6.5 16.5858 6.5 17.0572 6.5 18V22"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Company Name: {formData.company_name}
                </p>
                <p className="flex items-center text-sm md:text-base text-[#4B5262] gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9986 8L21.5091 18.5758C21.7672 20.3831 20.3648 22 18.5392 22H5.4576C3.63195 22 2.22957 20.383 2.48775 18.5757L3.99857 8"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13 15H11C10.4477 15 10 15.4477 10 16V17C10 17.5523 10.4477 18 11 18H13C13.5523 18 14 17.5523 14 17V16C14 15.4477 13.5523 15 13 15Z"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.5 15C16.5 15 20 14 20 8H4C4 14 7.5 15 7.5 15"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 15V8"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.5 8.5C7.06991 4.49202 9.316 2 12 2C14.684 2 16.9301 4.49202 17.5 8.5"
                      stroke="#4B5262"
                      stroke-width="1.5"
                    />
                  </svg>
                  Title: {formData.job_title || "N/A"}
                </p>
              </div>

              {/* Logout Button */}
              <div
                className="flex gap-2 items-center cursor-pointer text-[#4B5262] py-2 md:py-4 mb-5 md:mb-10"
                onClick={handleLogout}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                      stroke="#4B5262"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm md:text-base text-[#4B5262] font-medium">
                  Logout
                </span>
              </div>
            </div>

            <div className="p-4 md:p-10 w-full md:w-[70%]">
              {activeTab === "BrandDetails" && (
                <BrandDetailsForm
                  // ref={brandDetailsRef}
                  formData={formData}
                  dropdownOptions={dropdownOptions}
                  onInputChange={handleInputChange}
                  onCountryChange={handleBrandCountryChange}
                  errorList={error}
                />
              )}
              {activeTab === "Address" && (
                <AddressForm
                  address={formData.address}
                  dropdownOptions={dropdownOptions}
                  onInputChange={handleInputChange}
                  onCountryChange={handleCountryChange}
                  onStateChange={handleStateChange}
                  onBillingCountryChange={handleBillingCountryChange}
                  onBillingStateChange={handleBillingStateChange}
                  onShippingCountryChange={handleShippingCountryChange}
                  onShippingStateChange={handleShippingStateChange}
                />
              )}
              {activeTab === "KYCDetails" && (
                <KYCDetailsForm
                  // ref={kycDetailsFormRef}
                  kycDetails={formData}
                  dropdownOptions={dropdownOptions}
                  onInputChange={handleInputChange}
                  onFileChange={handleFileChange}
                />
              )}
            </div>
          </div>
        </div>
      {/* // )} */}
      <div className="flex justify-end mb-4">
        <button className="text-base md:text-xl bg-black text-white px-10 md:px-16 py-2 md:py-4 rounded-xl hover:bg-gray-900" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default FormComponent_Updated;
