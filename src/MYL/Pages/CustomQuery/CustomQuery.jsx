// import React, { useState } from "react";
// import ImageKit from "imagekit-javascript";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // Base URL for API endpoints
// const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// const CustomQuery = () => {
//   // Initialize ImageKit instance
//   const imageKit = new ImageKit({
//     publicKey:
//       import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY ||
//       "public_2hgv92qNdBK1r7ZVrmfvCs2MJI8=",
//     urlEndpoint:
//       import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ||
//       "https://ik.imagekit.io/s7pwlfxmi",
//   });

//   const [formData, setFormData] = useState({
//     file: null,
//     description: "",
//   });

//   const [errors, setErrors] = useState({
//     file: "",
//     description: "",
//   });

//   const [popupVisible, setPopupVisible] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files ? e.target.files[0] : null;

//     if (
//       file &&
//       !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
//     ) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         file: "Invalid file type. Please upload JPEG, PNG, or PDF.",
//       }));
//       return;
//     }

//     setFormData((prevFormData) => ({ ...prevFormData, file }));
//     setErrors((prevErrors) => ({ ...prevErrors, file: "" }));
//   };

//   // Handle description input
//   const handleDescriptionChange = (e) => {
//     const value = e.target.value;
//     setFormData((prevFormData) => ({ ...prevFormData, description: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {
//       file: "",
//       description: "",
//     };

//     if (!formData.file) newErrors.file = "Please upload a file.";
//     if (!formData.description.trim()) {
//       newErrors.description = "Description cannot be empty.";
//     }

//     setErrors(newErrors);
//     return !newErrors.file && !newErrors.description;
//   };

//   // Upload file to ImageKit
//   const uploadFileToImageKit = async (file) => {
//     try {
//       const authResponse = await axios.get(`${baseUrl}/v1/imagekit-auth`);
//       const authParams = authResponse.data;

//       // Extract token, signature, and expire directly
//       const { token, signature, expire } = authParams;

//       const uploadResponse = await imageKit.upload({
//         file, // File object
//         fileName: file.name, // Original file name
//         token, // Use token directly
//         signature, // Use signature directly
//         expire, // Use expire directly
//         folder: "/custom-query-images", // Specify the folder path
//       });

//       return uploadResponse.url; // Return the uploaded file URL
//     } catch (error) {
//       throw new Error("File upload failed");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       alert("Unauthorized: Please log in.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Upload file to ImageKit and get the file URL
//       const fileUrl = await uploadFileToImageKit(formData.file);

//       // Send file URL and description to the backend
//       const response = await axios.post(
//         `${baseUrl}/v1/custom-query`,
//         {
//           fileUrl,
//           description: formData.description,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setPopupVisible(true);
//         setFormData({ file: null, description: "" });
//       } else {
//         alert(response.data.message || "An error occurred while submitting.");
//       }
//     } catch (error) {
//       alert("An unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//           Submit Your Custom Query
//         </h1>
//         {/* Link to view all custom queries */}
//         <Link to="/custom-query-list">
//           <h2 className="text-sm text-gray-800 mt-4 underline">
//             View Status of your Query
//           </h2>
//         </Link>
//         <p className="text-sm text-gray-600 mb-6">
//           Describe your query and upload a reference file for more details.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Upload File Field */}
//           <div>
//             <label
//               htmlFor="custom-query-file"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Upload Reference File (JPEG, PNG, or PDF)
//             </label>
//             <input
//               type="file"
//               id="custom-query-file"
//               onChange={handleFileChange}
//               className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//             {errors.file && (
//               <span className="text-red-500 text-sm">{errors.file}</span>
//             )}
//           </div>

//           {/* Textarea for Description */}
//           <div>
//             <label
//               htmlFor="custom-query-description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="custom-query-description"
//               value={formData.description}
//               onChange={handleDescriptionChange}
//               className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Describe your query in detail..."
//               rows={5}
//             ></textarea>
//             {errors.description && (
//               <span className="text-red-500 text-sm">{errors.description}</span>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-black text-white text-lg font-bold rounded-md shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Query"}
//           </button>
//         </form>

//         {/* Success Popup */}
//         {popupVisible && (
//           <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//               <h2 className="text-xl font-bold text-green-600">Success!</h2>
//               <p className="mt-4">Custom query submitted successfully!</p>

             
//                   <Link to="/custom-query-list">
//                     <h2 className="text-xs text-gray-800 underline">
//                       View your Queries
//                     </h2>
//                   </Link>
                
//                   <button
//                     onClick={() => setPopupVisible(false)}
//                     className="mt-4 py-1 px-4 bg-black text-white text-base font-semibold rounded-md shadow-sm hover:bg-gray-700"
//                   >
//                     Close
//                   </button>
                
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomQuery;





// import React from "react";
// import QueryForm from "./ QueryForm";
// import QueryDescription from "./QueryDescription ";

// const CustomQuery = () => {
//   return (
//     <main className="flex flex-col bg-white w-[90vw] my-5 lg:my-10 mx-auto">
//       <section className="flex flex-col items-center justify-center mt-10 md:mt-16 w-full mx-auto">
//         <div className="flex flex-col justify-between items-center gap-10 lg:flex-row w-full"> 
//           {/* Left Section: Query Description */}
//           <div className="w-full lg:w-[56%]">
//             <QueryDescription />
//           </div>

//           {/* Right Section: Query Form */}
//           <div className="w-full lg:w-[44%]">
//             <QueryForm />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default CustomQuery;



import React, { useEffect, useState } from "react";
import QueryForm from "./QueryForm";
import QueryDescription from "./QueryDescription ";
import QuerySkeleton from "./QuerySkeleton"; 

const CustomQuery = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main id="export-area" className="flex flex-col bg-white w-[90vw] my-5 lg:my-10 mx-auto">
      {loading ? (
        <QuerySkeleton />
      ) : (
        <section className="flex flex-col items-center justify-center mt-10 md:mt-16 w-full mx-auto">
          <div className="flex flex-col justify-between items-center gap-10 lg:flex-row w-full">
            {/* Left Section: Query Description */}
            <div className="w-full lg:w-[56%]">
              <QueryDescription />
            </div>

            {/* Right Section: Query Form */}
            <div className="w-full lg:w-[44%]">
              <QueryForm />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CustomQuery;
