import React from "react";

const CountryDropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="mb-4 font-jakarta">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-2 py-2 md:py-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700 text-xs md:text-base"
      >
        <option value="">{label || "Select"}</option>
        {options?.length > 0 ? (
          options.map((option) => (
            <option
              key={option.id || option.dialCode}
              value={option.dialCode}
            >
              {option.dialCode}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default CountryDropdown;
