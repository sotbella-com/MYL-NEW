import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import FileUpload from "./FileUpload";

const KYCDetailsForm = ({
  kycDetails,
  dropdownOptions,
  onInputChange,
  onFileChange,  
}) => {
 
  return (
    <fieldset className="space-y-6 font-jakarta">
      <legend className="text-xl md:text-4xl font-semibold">KYC Details</legend>

      {/* GST Number */}
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <InputField
            label="GST/Business Registration Number"
            value={kycDetails.gst_number || ""}
            onChange={(e) => onInputChange("gst_number", e.target.value)}
            placeholder="e.g., 22AAAAA0000A1Z5"
          />
        </div>

        {/* GST Certificate Upload */}
        <div className="w-[50%]">
          <FileUpload
            label="Upload GST Certificate"
            value={kycDetails.gst_certificate}
            onChange={(e) => onFileChange("gst_certificate", e)} // Directly using onFileChange
          />
        </div>
      </div>

      {/* KYC Document Type */}
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <Dropdown
            label="KYC Document Type"
            value={kycDetails.kyc_document_select}
            placeholder="KYC Document Type"
            options={dropdownOptions.kycDocumentTypes}
            onChange={(e) =>
              onInputChange("kyc_document_select", e.target.value)
            }
          />
        </div>

        {/* KYC Document Number */}
        <div className="w-[50%]">
          <InputField
            label="KYC Document Number"
            value={kycDetails.kyc_document_number || ""}
            placeholder="e.g., 1234567890"
            onChange={(e) =>
              onInputChange("kyc_document_number", e.target.value)
            }
          />
        </div>
      </div>

      {/* KYC Document Upload */}
      <div className="flex space-x-3">
        <div className="w-[50%]">
          <FileUpload
            label="Upload KYC Document"
            value={kycDetails.kyc_document}
            onChange={(e) => onFileChange("kyc_document", e)} // Directly using onFileChange
          />
        </div>
        <div className="w-[50%]"></div>
      </div>
    </fieldset>
  );
};

export default KYCDetailsForm;
