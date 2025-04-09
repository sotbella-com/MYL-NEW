// import React, { useState } from "react";
// import SubmitButton from "./SubmitButton";
// import ContactInputField from "./ContactInputField";
// let baseURL = import.meta.env.VITE_APP_BASE_URL;

// const formFields = [
//   { id: "firstName", label: "First Name", type: "text" },
//   { id: "lastName", label: "Last Name", type: "text" },
// ];

// const additionalFields = [
//   { id: "company", label: "Company", type: "text" },
//   { id: "garmentTypes", label: "Garment Types", type: "text" },
// ];

// const dropdownFields = [
//   {
//     id: "numStyles",
//     label: "Number of Styles",
//     options: [
//       "Select Number of Styles",
//       "1-5",
//       "6-10",
//       "11-20",
//       "More than 20",
//     ],
//   },
//   {
//     id: "orderQuantity",
//     label: "Estimated Order Quantity",
//     options: ["Select Estimated Order Quantity", "50-100", "101-500", "501+"],
//   },
//   {
//     id: "designReq",
//     label: "Design Requirement",
//     options: ["Select Design Requirement", "Custom Design", "Ready-Made"],
//   },
//   {
//     id: "prodTimeline",
//     label: "Production Timeline",
//     options: [
//       "Select Production Timeline",
//       "1 Month",
//       "2-3 Months",
//       "More than 3 Months",
//     ],
//   },
//   {
//     id: "budgetRange",
//     label: "Budget Range",
//     options: [
//       "Select Budget Range",
//       "$1,000 - $5,000",
//       "$5,000 - $10,000",
//       "$10,000+",
//     ],
//   },
// ];

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     country: "",
//     phone: "",
//     showMore: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Form Submitted! 🎉");
//   };

//   return (
//     <form
//       className="flex flex-col bg-white leading-tight w-[90vw] min-w-[240px] lg:w-[576px] max-md:max-w-full"
//       onSubmit={handleSubmit}
//     >
//       <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 text-center">
//         Get in touch with us!
//       </h2>

//     {/* ✅ First Name & Last Name in One Row */}
// <div className="flex flex-wrap gap-6 w-full md:flex-nowrap">
//   {formFields.map(({ id, label, type }) => (
//     <div key={id} className="w-full md:w-1/2">
//       <ContactInputField
//         label={label}
//         type={type}
//         id={id}
//         value={formData[id]}
//         onChange={handleChange}
//       />
//     </div>
//   ))}
// </div>

//       {/* Phone Number */}
//       <div className="form-group">
//         <label
//           htmlFor="phone"
//           className="block text-black font-bold mb-2 text-sm md:text-base"
//         >
//           Phone*
//         </label>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             id="countryCode"
//             name="countryCode"
//             value="+91"
//             readOnly
//             className="w-1/4 border border-gray-300 p-3 rounded-md bg-gray-100 focus:outline-none"
//           />
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone number"
//             required
//             className="w-3/4 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* ✅ Email Input Full Width */}
//       <ContactInputField
//         label="Email Address"
//         type="email"
//         id="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full"
//       />

//       {/* Country Select */}
//       <div className="form-group">
//         <label
//           htmlFor="country"
//           className="block text-black font-bold mb-2 text-sm md:text-base"
//         >
//           Country*
//         </label>
//         <select
//           id="country"
//           name="country"
//           value={formData.country}
//           onChange={handleChange}
//           className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="" disabled>
//             Select Your Country
//           </option>
//           {["USA", "India", "UK", "Canada"].map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Checkbox to Show More Fields */}
//       <div className="form-group flex items-center mt-6">
//         <input
//           type="checkbox"
//           id="showMore"
//           checked={formData.showMore}
//           onChange={() =>
//             setFormData((prev) => ({ ...prev, showMore: !prev.showMore }))
//           }
//           className="mr-2"
//         />
//         <label
//           htmlFor="showMore"
//           className="text-black font-bold text-sm md:text-base"
//         >
//           Do you want to fill more details?
//         </label>
//       </div>

//       {/* Additional Fields (Only Show If Checkbox is Checked) */}
//       {formData.showMore && (
//         <>
//           {additionalFields.map(({ id, label, type }) => (
//             <ContactInputField
//               key={id}
//               label={label}
//               type={type}
//               id={id}
//               value={formData[id] || ""}
//               onChange={handleChange}
//             />
//           ))}

//           {/* Dropdown Fields */}
//           {dropdownFields.map(({ id, label, options }) => (
//             <div key={id} className="form-group">
//               <label
//                 htmlFor={id}
//                 className="block text-black font-bold mb-2 text-sm md:text-base"
//               >
//                 {label}
//               </label>
//               <select
//                 id={id}
//                 name={id}
//                 value={formData[id] || ""}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base h-10 md:h-auto"
//               >
//                 {options.map((option, idx) => (
//                   <option key={idx} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ))}
//         </>
//       )}

//       {/* ✅ Use SubmitButton Component */}
//       <SubmitButton text="Submit" />
//     </form>
//   );
// };

// export default ContactForm;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  countryToCode,
  dropdownFields,
  formFields,
  moreFields,
} from "../../../../Data/ContactForm/ContactFormData";
import SubmitButton from "./SubmitButton";
let baseURL = import.meta.env.VITE_APP_BASE_URL;

function ContactForm() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    countryCode: "",
    phone: "",
    company: "",
    numberOfStyles: "",
    estimatedOrderQuantity: "",
    garmentTypes: "",
    designRequirement: "",
    productionTimeline: "",
    budgetRange: "",
    source:'Make-Your-Label',
  });

  const [showMoreFields, setShowMoreFields] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        countryCode: countryToCode[value] || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`,
    };

    try {
      const response = await fetch(`${baseURL}/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // navigate("/submit-greetings");
        setMessage("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          countryCode: "",
          phone: "",
          company: "",
          numberOfStyles: "",
          estimatedOrderQuantity: "",
          garmentTypes: "",
          designRequirement: "",
          productionTimeline: "",
          budgetRange: "",
        });
      } else {
        throw new Error(
          `Failed to submit the form. Status Code: ${response.status}`
        );
      }
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="IKGFashion"
      className="flex flex-col space-y-4 bg-white leading-tight w-[90vw] min-w-[240px] lg:w-[626px] max-md:max-w-full text-black"
      onSubmit={handleSubmit}
    >
      <h2 className="font-jakarta text-2xl lg:text-4xl font-medium text-black mb-6 text-center lg:text-left">
         Get in touch with us!
       </h2> 

      {/* ✅ First Name & Last Name in One Row */}
      <div className="flex flex-wrap gap-6 w-full md:flex-nowrap">
        {["firstName", "lastName"].map((field) => (
          <div key={field} className="w-full md:w-1/2">
            <label className="block text-black font-medium mb-2 text-sm md:text-base">
              {field === "firstName" ? "First Name" : "Last Name"}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
          </div>
        ))}
      </div>

       {/* Country Select */}
       <div className="form-group">
        <label
          htmlFor="country"
          className="block text-black mb-2 font-medium text-sm md:text-base"
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select Your Country
          </option>
          {Object.keys(countryToCode).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label
          htmlFor="phone"
          className="block text-black font-medium mb-2 text-sm md:text-base"
        >
          Phone Number
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            readOnly
            className="w-1/4 border border-gray-300 p-3 rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className="w-3/4 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ✅ Email Input */}
      <label className="block text-black font-medium text-sm md:text-base">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
      />


      {/* Checkbox to Show More Fields */}
      <div className="form-group flex items-center">
        <input
          type="checkbox"
          id="showMoreFields"
          checked={showMoreFields}
          onChange={() => setShowMoreFields(!showMoreFields)}
          className="mr-2"
        />
        <label
          htmlFor="showMoreFields"
          className="text-black font-medium text-sm md:text-base"
        >
          Do you want to fill more details?
        </label>
      </div>

      {/* Additional Fields (Only Show If Checkbox is Checked) */}
      {showMoreFields && (
        <>
          {moreFields.map(({ id, label, type }) => (
            <div key={id} className="form-group">
              <label
                htmlFor={id}
                className="block text-black font-medium mb-2 text-sm md:text-base"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          {/* Dropdown Fields */}
          {dropdownFields.map(({ id, label, options }) => (
            <div key={id} className="form-group">
              <label
                htmlFor={id}
                className="block text-black font-medium mb-2 text-sm md:text-base"
              >
                {label}
              </label>
              <select
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base h-10 md:h-auto"
              >
                <option value="" disabled>
                  Select {label}
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </>
      )}

      {/* Submit Button */}
      <SubmitButton text={isSubmitting ? "Submitting..." : "Submit"} />
      {message && <p className="mt-6 text-center text-green-500">{message}</p>}
    </form>
  );
}

export default ContactForm;
