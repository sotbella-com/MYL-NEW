import React from "react";

const ContactInputField = ({ label, placeholder, type = "text" }) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={label.toLowerCase().replace(" ", "-")}
        className="text-base font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase().replace(" ", "-")}
        className="px-4 py-3 mt-2 w-full rounded-lg border border-gray-300 bg-gray-100"
        placeholder={placeholder}
      />
    </div>
  );
};

export default ContactInputField;
