// import React, { useState, useEffect } from "react";
// import useCurrency from "../../../../Currency/useCurrency"; // ✅ Import currency conversion hook
// import { getCurrencySymbol } from "../../../../Currency/currencyUtils"; // ✅ Import currency symbol utility

// // ✅ Ensure that the max price never exceeds 1000
// const MAX_ALLOWED_PRICE = 1000;

// const FilterAndSort = ({ applyFilters, closeDrawer, categories, products }) => {
//   const { convertPrice, selectedCurrency } = useCurrency(); // ✅ Get currency conversion function
//   const [selectedSort, setSelectedSort] = useState("relevance");

//   // ✅ Filters that are applied after clicking "Apply"
//   const [filters, setFilters] = useState({
//     color: [],
//     category: "", // ✅ Only one category can be selected
//     material: [],
//     priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
//   });

//   // ✅ Automatically apply filters when filters change
//   useEffect(() => {
//     applyFilters(filters, selectedSort);
//   }, [filters, selectedSort]); // ✅ No need for filters.priceRange separately

//   // ✅ Find the highest price in the products list (Capped at 1000)
//   useEffect(() => {
//     if (products && products.length > 0) {
//       let highestPrice = Math.max(
//         ...products.map((p) => p.default_variant?.selling_price || 0)
//       );
//       highestPrice = Math.min(highestPrice, MAX_ALLOWED_PRICE); // ✅ Cap at 1000

//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         priceRange: { min: 0, max: highestPrice },
//       }));
//     }
//   }, [products]);

//   // ✅ Handle Sorting Selection
//   const handleSortChange = (sortValue) => {
//     setSelectedSort(sortValue);
//   };

//   // ✅ Handle Category Selection (Single Choice)
//   const handleCategoryChange = (categoryId) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       category: prevFilters.category === categoryId ? "" : categoryId, // ✅ Acts like a radio button
//     }));
//   };

//   // ✅ Handle Multi-Select for Color & Material
//   const handleMultiSelectChange = (filterKey, value) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterKey]: prevFilters[filterKey].includes(value)
//         ? prevFilters[filterKey].filter((val) => val !== value)
//         : [...prevFilters[filterKey], value],
//     }));
//   };

//   // ✅ Ensure Numeric Price Input (Capped at 1000)
//   const handlePriceChange = (type, value) => {
//     let numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
//     numericValue = Math.min(numericValue, MAX_ALLOWED_PRICE); // ✅ Ensure max price does not exceed 1000

//     setFilters((prevFilters) => {
//       const updatedFilters = {
//         ...prevFilters,
//         priceRange: { ...prevFilters.priceRange, [type]: numericValue },
//       };

//       return updatedFilters;
//     });
//   };

//   // ✅ Apply Filters When "Apply" Button is Clicked
//   const handleApplyFilters = () => {
//     applyFilters(filters, selectedSort); // ✅ Triggers API call when button is clicked
//     closeDrawer(); // ✅ Close the drawer after applying filters
//   };

//   // ✅ Clear All Filters
//   const handleClearFilters = () => {
//     setFilters({
//       color: [],
//       category: "",
//       material: [],
//       priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
//     });
//     setSelectedSort("relevance");
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-white w-full md:max-w-[476px] h-[85vh]">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg md:text-2xl font-medium text-black">
//             Filter & Sort
//           </h2>
//           <div className="flex flex-col items-end">
//             <button
//               className="text-gray-600 text-lg md:text-xl"
//               onClick={closeDrawer}
//             >
//               ✕
//             </button>
//             <button
//               className="mt-4 text-gray-600 text-sm md:text-base font-medium"
//               onClick={handleClearFilters}
//             >
//               Clear all
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col w-full mt-3.5">
//           <div className="flex gap-3 md:gap-4 items-center w-full text-sm md:text-base font-medium">
//             <div className="text-gray-600">Sort by:</div>
//           </div>

//           {/* Sorting Buttons */}
//           <div className="mt-3 flex flex-wrap gap-3 md:gap-4 items-center w-full text-sm md:text-base font-medium">
//             {[
//               { label: "Price, low to high", value: "lowToHigh" },
//               { label: "Price, high to low", value: "highToLow" },
//               { label: "A to Z", value: "aToZ" },
//               { label: "Z to A", value: "zToA" },
//             ].map((sort) => (
//               <button
//                 key={sort.value}
//                 className={`px-2 text-sm md:text-base border rounded ${
//                   selectedSort === sort.value
//                     ? "bg-black text-white"
//                     : "bg-white border-neutral-200"
//                 }`}
//                 onClick={() => handleSortChange(sort.value)}
//               >
//                 {sort.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <hr className="mt-3 border border-neutral-200" />

//         {/* Color & Material Filters */}
//         {/* {[
//           {
//             title: "Color",
//             options: ["Black", "Brown", "Blue", "Gold", "Blush", "Grey"],
//             filterKey: "color",
//           },
//           {
//             title: "Material",
//             options: [
//               "Cotton",
//               "Chiffon",
//               "Linen",
//               "Polyester",
//               "Leather",
//               "Silk",
//               "Wool",
//               "Satin",
//             ],
//             filterKey: "material",
//           },
//         ].map(({ title, options, filterKey }) => (
//           <div key={filterKey} className="mt-3 w-full">
//             <div className="text-sm md:text-base font-medium">{title}</div>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
//               {options.map((option) => (
//                 <label
//                   key={option}
//                   className="flex items-center cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={filters[filterKey].includes(option.toLowerCase())}
//                     onChange={() =>
//                       handleMultiSelectChange(filterKey, option.toLowerCase())
//                     }
//                     className="sr-only"
//                   />
//                   <span
//                     className={`w-3 h-3 border rounded-sm ${
//                       filters[filterKey].includes(option.toLowerCase())
//                         ? "bg-black"
//                         : "bg-stone-50 border-neutral-200"
//                     }`}
//                   ></span>
//                   <span className="ml-1.5">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//         <hr className="mt-3 border border-neutral-200" /> */}

//         {/* Category Filter */}
//         <div className="mt-3 w-full">
//           <div className="text-sm md:text-base font-medium">Category</div>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
//             {categories.map((cat) => (
//               <label key={cat.id} className="flex items-center cursor-pointer">
//                 <input
//                   type="radio"
//                   name="category"
//                   checked={filters.category === cat.id}
//                   onChange={() => handleCategoryChange(cat.id)}
//                   className="sr-only"
//                 />
//                 <span
//                   className={`w-3 h-3 border rounded-sm ${
//                     filters.category === cat.id
//                       ? "bg-black"
//                       : "bg-stone-50 border-neutral-200"
//                   }`}
//                 ></span>
//                 <span className="ml-1.5" title={cat.name}>
//                   {cat.name.split(" ").length > 2
//                     ? cat.name.split(" ").slice(0, 2).join(" ") + "..."
//                     : cat.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <hr className="mt-3 border border-neutral-200" />

//         {/* Price Filter */}
//         <div className="mt-3 w-full">
//           <div className="text-sm md:text-base font-medium">
//             Price Range ({selectedCurrency})
//           </div>
//           <div className="flex justify-between mt-2 text-sm text-gray-600">
//             <span>
//               {getCurrencySymbol(selectedCurrency)}{" "}
//               {convertPrice(filters.priceRange.min)}
//             </span>
//             <span>
//               {getCurrencySymbol(selectedCurrency)}{" "}
//               {convertPrice(filters.priceRange.max)}
//             </span>
//           </div>
//           {/* Slider for Price Selection */}
//           <input
//             type="range"
//             min="0"
//             max={MAX_ALLOWED_PRICE}
//             step="20"
//             value={filters.priceRange.max}
//             onChange={(e) => handlePriceChange("max", e.target.value)}
//             className="w-full mt-2"
//           />
//           {/* Input fields for manual entry */}
//           <div className="flex justify-between items-center mt-3">
//             <input
//               type="text"
//               value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(filters.priceRange.min)}`}
//               onChange={(e) => handlePriceChange("min", e.target.value)}
//               className="border border-gray-300 rounded px-1 py-1 w-24 text-center"

//             />
//             <span>to</span>
//             <input
//               type="text"
//               value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(filters.priceRange.max)}`}
//               onChange={(e) => handlePriceChange("max", e.target.value)}
//               className="border border-gray-300 rounded px-1 py-1 w-24 text-center"

//             />
//           </div>
//         </div>
//         {/* Apply Filters Button */}
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleApplyFilters}
//             className="px-5 py-2 text-white bg-black rounded hover:bg-gray-900 transition"
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterAndSort;



// import React, { useState, useEffect } from "react";
// import useCurrency from "../../../../Currency/useCurrency";
// import { getCurrencySymbol } from "../../../../Currency/currencyUtils";

// const MAX_ALLOWED_PRICE = 1000;

// const FilterAndSort = ({ applyFilters, closeDrawer, categories, products }) => {
  
//   const { convertPrice, selectedCurrency } = useCurrency();
//   const [selectedSort, setSelectedSort] = useState("relevance");

//   // ✅ Temporary state to update filters without immediate API call
//   const [tempFilters, setTempFilters] = useState({
//     color: [],
//     category: "",
//     material: [],
//     priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
//   });

//   // ✅ Ensure max price does not exceed 1000
//   useEffect(() => {
//     if (products?.length > 0) {
//       let highestPrice = Math.max(
//         ...products.map((p) => p.default_variant?.selling_price || 0)
//       );
//       highestPrice = Math.min(highestPrice, MAX_ALLOWED_PRICE);

//       setTempFilters((prevFilters) => ({
//         ...prevFilters,
//         priceRange: { min: 0, max: highestPrice },
//       }));
//     }
//   }, [products]);

//   // ✅ Handle Sorting Selection
//   const handleSortChange = (sortValue) => {
//     setSelectedSort(sortValue);
//   };

//   // ✅ Handle Category Selection (Single Choice)
//   const handleCategoryChange = (categoryId) => {
//     setTempFilters((prevFilters) => ({
//       ...prevFilters,
//       category: prevFilters.category === categoryId ? "" : categoryId,
//     }));
//   };

//   // ✅ Handle Multi-Select for Color & Material
//   const handleMultiSelectChange = (filterKey, value) => {
//     setTempFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterKey]: prevFilters[filterKey].includes(value)
//         ? prevFilters[filterKey].filter((val) => val !== value)
//         : [...prevFilters[filterKey], value],
//     }));
//   };
  

//   // ✅ Handle Price Input
//   const handlePriceChange = (type, value) => {
//     let numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
//     numericValue = Math.min(numericValue, MAX_ALLOWED_PRICE);

//     setTempFilters((prevFilters) => {
//         const updatedFilters = {
//             ...prevFilters,
//             priceRange: { ...prevFilters.priceRange, [type]: numericValue },
//         };

//         console.log("✅ Updated Price Filters:", updatedFilters);
//         return updatedFilters;
//     });
// };

//   const handleApplyFilters = () => {
//     console.log("✅ Applying Price Filter:", tempFilters.priceRange);

//     applyFilters({
//         ...tempFilters,
//         priceRange: {
//             min: Number(tempFilters.priceRange.min),
//             max: Number(tempFilters.priceRange.max),
//         },
//     }, selectedSort);

//     closeDrawer(); // ✅ Close filter drawer after applying
// };


//   // ✅ Clear All Filters
//   const handleClearFilters = () => {
//     setTempFilters({
//       color: [],
//       category: "",
//       material: [],
//       priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
//     });
//     setSelectedSort("relevance");
//     closeDrawer();
//   };
  

//   return (
//     <div className="flex flex-col p-4 md:p-6 bg-white w-full md:max-w-[476px]  h-full md:h-[85vh]">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg md:text-2xl font-medium text-black">
//           Filter & Sort
//         </h2>
//         <div className="flex flex-col items-end">
//           <button
//             className="text-gray-600 text-lg md:text-xl"
//             onClick={closeDrawer}
//           >
//             ✕
//           </button>
//           <button
//             className="mt-4 text-gray-600 text-sm md:text-base font-medium"
//             onClick={handleClearFilters}
//           >
//             Clear all
//           </button>
//         </div>
//       </div>

//       {/* Sorting Options */}
//       <div className="mt-3">
//         <div className="text-gray-600 text-sm md:text-base font-medium">
//           Sort by:
//         </div>
//         <div className="mt-3 flex flex-wrap gap-3">
//           {[
//             { label: "Price, low to high", value: "lowToHigh" },
//             { label: "Price, high to low", value: "highToLow" },
//             { label: "A to Z", value: "aToZ" },
//             { label: "Z to A", value: "zToA" },
//           ].map((sort) => (
//             <button
//               key={sort.value}
//               className={`px-2 text-sm md:text-base border rounded ${
//                 selectedSort === sort.value
//                   ? "bg-black text-white"
//                   : "bg-white border-neutral-200"
//               }`}
//               onClick={() => handleSortChange(sort.value)}
//             >
//               {sort.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <hr className="mt-3 border border-neutral-200" />

//       {/* Category Filter */}
//       <div className="mt-3">
//         <div className="text-sm md:text-base font-medium">Category</div>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
//           {categories.map((cat) => (
//             <label key={cat.id} className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="category"
//                 checked={tempFilters.category === cat.id}
//                 onChange={() => handleCategoryChange(cat.id)}
//                 className="sr-only"
//               />
//               <span
//                 className={`w-3 h-3 border rounded-sm ${
//                   tempFilters.category === cat.id
//                     ? "bg-black"
//                     : "border-neutral-200"
//                 }`}
//               ></span>

//               <span className="ml-1.5">{cat.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <hr className="mt-3 border border-neutral-200" />

//       {/* Price Filter */}
//       <div className="mt-3">
//         <div className="text-sm md:text-base font-medium">
//           Price Range ({selectedCurrency})
//         </div>
//         <div className="flex justify-between mt-2 text-sm text-gray-600">
//           <span>
//             {getCurrencySymbol(selectedCurrency)}{" "}
//             {convertPrice(tempFilters.priceRange.min)}
//           </span>
//           <span>
//             {getCurrencySymbol(selectedCurrency)}{" "}
//             {convertPrice(tempFilters.priceRange.max)}
//           </span>
//         </div>
//         <input
//           type="range"
//           min="0"
//           max={MAX_ALLOWED_PRICE}
//           step="10"
//           value={tempFilters.priceRange.max}
//           onChange={(e) => handlePriceChange("max", e.target.value)}
//           className="w-full mt-2"
//         />
//         <div className="flex justify-between items-center mt-3">
//           <input
//             type="text"
//             value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(
//               tempFilters.priceRange.min
//             )}`}
//             onChange={(e) => handlePriceChange("min", e.target.value)}
//             className="border border-gray-300 rounded px-1 py-1 w-24 text-center"
//           />
//           <span>to</span>
//           <input
//             type="text"
//             value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(
//               tempFilters.priceRange.max
//             )}`}
//             onChange={(e) => handlePriceChange("max", e.target.value)}
//             className="border border-gray-300 rounded px-1 py-1 w-24 text-center"
//           />
//         </div>
//       </div>

//       {/* Apply Filters Button */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={handleApplyFilters}
//           className="px-5 py-2 text-white bg-black rounded hover:bg-gray-900 transition"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterAndSort;








import React, { useState, useEffect } from "react";
import useCurrency from "../../../../Currency/useCurrency";
import { getCurrencySymbol } from "../../../../Currency/currencyUtils";

const MAX_ALLOWED_PRICE = 1000;

const FilterAndSort = ({ applyFilters, closeDrawer, categories, products }) => {
  const { convertPrice, selectedCurrency } = useCurrency();
  const [selectedSort, setSelectedSort] = useState("relevance");

  const [tempFilters, setTempFilters] = useState({
    color: [],
    category: "",
    material: [],
    priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
  });

  useEffect(() => {
    if (products?.length > 0) {
      let highestPrice = Math.max(
        ...products.map((p) => p.default_variant?.selling_price || 0)
      );
      highestPrice = Math.min(highestPrice, MAX_ALLOWED_PRICE);

      setTempFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: { min: 0, max: highestPrice },
      }));
    }
  }, [products]);

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
  };

  const handleCategoryChange = (categoryId) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category === categoryId ? "" : categoryId,
    }));
  };

  const handleMultiSelectChange = (filterKey, value) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: prevFilters[filterKey].includes(value)
        ? prevFilters[filterKey].filter((val) => val !== value)
        : [...prevFilters[filterKey], value],
    }));
  };

  const handlePriceChange = (type, value) => {
    let numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
    numericValue = Math.min(numericValue, MAX_ALLOWED_PRICE);

    setTempFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        priceRange: { ...prevFilters.priceRange, [type]: numericValue },
      };

      console.log("✅ Updated Price Filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const handleApplyFilters = () => {
    console.log("✅ Applying Price Filter:", tempFilters.priceRange);

    applyFilters(
      {
        ...tempFilters,
        priceRange: {
          min: Number(tempFilters.priceRange.min),
          max: Number(tempFilters.priceRange.max),
        },
      },
      selectedSort
    );

    closeDrawer(); // ✅ Close filter drawer after applying
  };

  const handleClearFilters = () => {
    setTempFilters({
      color: [],
      category: "",
      material: [],
      priceRange: { min: 0, max: MAX_ALLOWED_PRICE },
    });
    setSelectedSort("relevance");
    closeDrawer();
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-white w-full md:max-w-[476px] h-full md:h-[85vh]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-medium text-black">
          Filter & Sort
        </h2>
        <div className="flex flex-col items-end">
          <button
            className="text-gray-600 text-lg md:text-xl"
            onClick={closeDrawer}
          >
            ✕
          </button>
          <button
            className="mt-4 text-gray-600 text-sm md:text-base font-medium"
            onClick={handleClearFilters}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-gray-600 text-sm md:text-base font-medium">
          Sort by:
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            { label: "Price, low to high", value: "lowToHigh" },
            { label: "Price, high to low", value: "highToLow" },
            { label: "A to Z", value: "aToZ" },
            { label: "Z to A", value: "zToA" },
          ].map((sort) => (
            <button
              key={sort.value}
              className={`px-2 text-sm md:text-base border rounded ${
                selectedSort === sort.value
                  ? "bg-black text-white"
                  : "bg-white border-neutral-200"
              }`}
              onClick={() => handleSortChange(sort.value)}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="mt-3 border border-neutral-200" />

      <div className="mt-3">
        <div className="text-sm md:text-base font-medium">Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={tempFilters.category === cat.id}
                onChange={() => handleCategoryChange(cat.id)}
                className="sr-only"
              />
              <span
                className={`w-3 h-3 border rounded-sm ${
                  tempFilters.category === cat.id
                    ? "bg-black"
                    : "border-neutral-200"
                }`}
              ></span>

              <span className="ml-1.5">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="mt-3 border border-neutral-200" />

      <div className="mt-3">
        <div className="text-sm md:text-base font-medium">
          Price Range ({selectedCurrency})
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>
            {getCurrencySymbol(selectedCurrency)}{" "}
            {convertPrice(tempFilters.priceRange.min)}
          </span>
          <span>
            {getCurrencySymbol(selectedCurrency)}{" "}
            {convertPrice(tempFilters.priceRange.max)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={MAX_ALLOWED_PRICE}
          step="10"
          value={tempFilters.priceRange.max}
          onChange={(e) => handlePriceChange("max", e.target.value)}
          className="w-full mt-2"
        />
        <div className="flex justify-between items-center mt-3">
          <input
            type="text"
            value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(
              tempFilters.priceRange.min
            )}`}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="border border-gray-300 rounded px-1 py-1 w-24 text-center"
          />
          <span>to</span>
          <input
            type="text"
            value={`${getCurrencySymbol(selectedCurrency)} ${convertPrice(
              tempFilters.priceRange.max
            )}`}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="border border-gray-300 rounded px-1 py-1 w-24 text-center"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleApplyFilters}
          className="px-5 py-2 text-white bg-black rounded hover:bg-gray-900 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterAndSort;