import React from "react";

const FileUpload = ({ label, value, onChange }) => {
  return (
    <div className="mb-4 flex justify-between font-jakarta space-x-2">
      {/* <label className="block text-xs md:text-base font-medium text-gray-700 mb-1 w-[50%]">
        {label}
      </label> */}
      <div className="w-full">
        {/* File Input */}
        <input
          type="file"
          onChange={onChange}
          className="col-span-2 w-full border border-gray-300 rounded-lg px-2 py-1.5 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base cursor-pointer"
        />

        {/* Show "View Uploaded File" only if value is a valid ImageKit URL */}
        {typeof value === "string" && value.includes("imagekit.io") && (
          <div className="mt-1 text-xs italic text-blue-500 text-right">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View Uploaded File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
