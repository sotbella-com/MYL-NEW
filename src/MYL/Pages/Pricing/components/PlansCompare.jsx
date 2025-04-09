import React from "react";

const PlansCompare = () => {
  // Dynamic data inside the component
  const features = [
    { name: "Cost Effective For Large Orders", values: [true, true, false] },
    { name: "Low Minimum Order", values: [true, false, true] },
    { name: "Wide Range Of Products, Fabrics, Notions And Accessories Under One Roof", values: [true, false, false] },
    { name: "Best Value For Quality", values: [true, false, false] },
    { name: "Convenient Ordering Process", values: [true, false, true] },
    { name: "Custom Labels, Tags & Packaging Options", values: [true, true, false] },
    { name: "100% Customization/ Exclusive Products", values: [true, true, false] },
  ];

  return (
    <div className="w-[90vw] mx-auto my-10">
      <div className="overflow-x-auto">
        <h2 className="font-jakarta text-xl md:text-3xl lg:text-5xl font-bold leading-tight text-center text-black">
          Compare Plans
        </h2>
        <table className="w-full border-collapse mt-6 lg:mt-16 bg-white">
          {/* Table Header */}
          <thead>
            <tr className="text-left bg-gray-50 text-black text-[10px] sm:text-xs md:text-sm lg:text-xl">
              <th className="p-2 md:px-4 md:py-7"></th>
              <th className="p-2 md:px-4 md:py-7 bg-black text-white text-center rounded-tl-lg rounded-tr-lg">
                MAKE YOUR LABEL
              </th>
              <th className="p-2 md:px-4 md:py-7 text-center">Traditional Clothing Manufacturers</th>
              <th className="p-2 md:px-4 md:py-7 text-center">Print On Demand Companies</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} font-semibold text-[10px] sm:text-xs md:text-sm lg:text-xl`}>
                <td className="p-2 md:px-4 md:py-7">{feature.name}</td>

                {/* Last row should have bottom rounded corners */}
                <td className={`p-2 md:px-4 md:py-7 bg-black text-white text-center ${index === features.length - 1 ? "rounded-bl-lg rounded-br-lg" : ""}`}>
                  {feature.values[0] ? "✔" : "✖"}
                </td>

                <td className="p-2 md:px-4 md:py-7 text-center">{feature.values[1] ? "✔" : "✖"}</td>

                {/* Right bottom rounded corner in the last row */}
                <td className={`p-2 md:px-4 md:py-7 text-center ${index === features.length - 1 ? "" : ""}`}>
                  {feature.values[2] ? "✔" : "✖"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansCompare;
