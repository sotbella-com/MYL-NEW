import React, { useState } from "react";

const Dropdown = ({
  label,
  value,
  options,
  onChange,
}) => {

  const handleDropdownChange = (e) => {
    onChange(e);
  };


  return (
    <div className="mb-4 flex justify-between font-jakarta space-x-2">
      {/* <label className="block text-xs md:text-base font-medium text-gray-700 mb-1 w-[50%]">
        {label}
      </label> */}
      <div className="w-full">
        <select
          value={value || ""}
          onChange={handleDropdownChange}
           className="w-full border border-gray-300 rounded-lg px-2 py-2 md:py-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-400 text-xs md:text-base"
        >
          <option value="">{label || "Select"}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
