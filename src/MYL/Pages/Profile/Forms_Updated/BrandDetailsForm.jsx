import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import CountryDropdown from "./CountryDropdown";

// Country Data Array (Country Code & Name)
const countryData = [
  { id: "IN", dialCode: "+91" },
  { id: "US", dialCode: "+1" },
  { id: "GB", dialCode: "+44" },
  { id: "JP", dialCode: "+81" },
];

const BrandDetailsForm = ({
  formData,
  dropdownOptions,
  onInputChange,
  onCountryChange,
  errorList,
}) => {
  const countries = dropdownOptions.countries || [];

  return (
    <fieldset>
      <div className="text-xl md:text-4xl mb-5 md:mb-10 font-semibold font-jakarta">
        Basic Info
      </div>

      {/* Personal Details */}
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <InputField
            label="First Name"
            value={formData.var_first_name}
            placeholder="First Name"
            onChange={(e) => onInputChange("var_first_name", e.target.value)}
            errorInput={errorList.firstName}
          />
        </div>
        <div className="w-[50%]">
          <InputField
            label="Second Name"
            value={formData.var_second_name}
            placeholder="Second Name"
            onChange={(e) => onInputChange("var_second_name", e.target.value)}
            errorInput={errorList.secondName}
          />
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <CountryDropdown
            label="Country Code"
            value={formData.var_country_code}
            placeholder="Country Code"
            options={countryData.map((c) => ({
              ...c,
              value: c.dialCode,
            }))}            
            onChange={(val) => onInputChange("var_country_code", val)}
            errorInput={errorList.countryCode}
          />
        </div>

        <div className="w-[50%]">
          <InputField
            label="Mobile Number"
            value={formData.var_mobile_no}
            placeholder="Mobile Number"
            onChange={(e) => onInputChange("var_mobile_no", e.target.value)}
            errorInput={errorList.mobileNo}
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <div className="w-[50%]">
          <InputField
            label="Email"
            type="email"
            value={formData.var_email}
            placeholder="Email"
            onChange={(e) => onInputChange("var_email", e.target.value)}
            errorInput={errorList.email}
          />
        </div>
        <div className="w-[50%]">
          <Dropdown
            label="Country"
            value={
              countries.find((country) => country.name === formData.country)
                ?.id || ""
            } // Match `isoCode` from the options
            options={dropdownOptions.countries}
            onChange={(e) => onCountryChange(e.target.value)} // Pass `isoCode` to handler
          />
        </div>
      </div>

      {/* Company Details */}
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <Dropdown
            label="Job Title"
            value={formData.job_title}
            options={dropdownOptions.jobTitles}
            onChange={(e) => onInputChange("job_title", e.target.value)}
          />
        </div>
        <div className="w-[50%]">
          <InputField
            label="Company Name"
            value={formData.company_name}
            placeholder="Company Name"
            onChange={(e) => onInputChange("company_name", e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <div className="w-[50%]">
          <InputField
            label="Company Website"
            value={formData.company_website}
            placeholder="Company Website"
            onChange={(e) => onInputChange("company_website", e.target.value)}
          />
        </div>

        <div className="w-[50%]">
          <InputField
            label="Company Email"
            type="email"
            value={formData.company_email}
            placeholder="Company Email"
            onChange={(e) => onInputChange("company_email", e.target.value)}
          />
        </div>
      </div>

      {/* Business Details */}

      <div className="flex space-x-3">
        <div className="w-[50%]">
          <Dropdown
            label="Category"
            value={formData.category}
            options={dropdownOptions.categories}
            onChange={(e) => onInputChange("category", e.target.value)}
          />
        </div>
        <div className="w-[50%]">
          <Dropdown
            label="Product Type"
            value={formData.product_type}
            options={dropdownOptions.productTypes}
            onChange={(e) => onInputChange("product_type", e.target.value)}
          />
        </div>
      </div>

      {/* Cost Range */}
      <div className="flex space-x-3">
        <label className="self-center text-xs md:text-base font-medium text-gray-700 w-[25%]">
          Cost Range
        </label>
        <div className="w-[25%]">
          <Dropdown
            label="Currency"
            value={formData.currency}
            options={dropdownOptions.currencies}
            onChange={(e) => onInputChange("currency", e.target.value)}
          />
        </div>

        <div className="w-[25%]">
          <InputField
            type="number"
            placeholder="Min Cost"
            value={formData.min_cost}
            onChange={(e) => onInputChange("min_cost", e.target.value)}
          />
        </div>
        <div className="w-[25%]">
          <InputField
            type="number"
            placeholder="Max Cost"
            value={formData.max_cost}
            onChange={(e) => onInputChange("max_cost", e.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default BrandDetailsForm;
