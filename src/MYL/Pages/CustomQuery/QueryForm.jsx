import React, { useState } from "react";
import ImageKit from "imagekit-javascript";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Base URL for API endpoints
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const QueryForm = () => {
  const navigate = useNavigate();

  // Initialize ImageKit instance
  const imageKit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_2hgv92qNdBK1r7ZVrmfvCs2MJI8=",
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/s7pwlfxmi",
  });

  const [formData, setFormData] = useState({
    file: null,
    description: "",
  });

  const [errors, setErrors] = useState({
    file: "",
    description: "",
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && !["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "Invalid file type. Please upload JPEG, PNG, or PDF.",
      }));
      return;
    }

    setFormData((prevFormData) => ({ ...prevFormData, file }));
    setErrors((prevErrors) => ({ ...prevErrors, file: "" }));
  };

  // Handle description input
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, description: value }));
    setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {
      file: "",
      description: "",
    };

    if (!formData.file) newErrors.file = "Please upload a file.";
    if (!formData.description.trim()) {
      newErrors.description = "Description cannot be empty.";
    }

    setErrors(newErrors);
    return !newErrors.file && !newErrors.description;
  };

  // Upload file to ImageKit
  const uploadFileToImageKit = async (file) => {
    try {
      const authResponse = await axios.get(`${baseUrl}/v1/imagekit-auth`);
      const authParams = authResponse.data;
      const { token, signature, expire } = authParams;

      const uploadResponse = await imageKit.upload({
        file,
        fileName: file.name,
        token,
        signature,
        expire,
        folder: "/custom-query-images",
      });

      return uploadResponse.url;
    } catch (error) {
      throw new Error("File upload failed");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Unauthorized: Please log in.");
      setIsSubmitting(false);
      return;
    }

    try {
      const fileUrl = await uploadFileToImageKit(formData.file);

      await axios.post(
        `${baseUrl}/v1/custom-query`,
        { fileUrl, description: formData.description },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );

      setPopupVisible(true);
      setFormData({ file: null, description: "" });
      navigate("/thankyou");
    } catch (error) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-[#ECEFF5] rounded-3xl lg:max-w-lg w-full mx-auto">
      <h2 className="font-jakarta text-2xl font-semibold text-black">Submit Your Custom Query</h2>
      <p className="mt-2 text-sm text-[#4B5262]">Describe your query and upload a reference file for more details.</p>

      {/* File Upload */}
      <div className="mt-6">
        <label className="block text-base font-medium text-[#4B5262]">Upload Reference File (JPEG, PNG, or PDF)</label>
        <input
          type="file"
          className="mt-2 w-full border border-neutral-300 rounded-lg p-2"
          accept="image/jpeg, image/png, application/pdf"
          onChange={handleFileChange}
        />
        {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block text-base font-medium text-[#4B5262]">Description</label>
        <textarea
          className="w-full mt-2 p-2 border border-neutral-200 rounded-lg bg-white resize-none placeholder:text-sm placeholder:font-normal placeholder:text-[#4B5262]"
          rows={4}
          placeholder="Describe your query in detail..."
          value={formData.description}
          onChange={handleDescriptionChange}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full mt-6 py-3 text-lg font-medium text-white bg-black rounded-xl hover:bg-gray-800">
        {isSubmitting ? "Submitting..." : "Submit Query"}
      </button>
    </form>
  );
};

export default QueryForm;
