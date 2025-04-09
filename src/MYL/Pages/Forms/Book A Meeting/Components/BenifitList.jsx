import React from 'react';

const benefits = [
  ["Client Oriented", "Independent", "Problem solving"],
  ["Results driven", "Competent", "Transparent"]
];

const BenefitsList = () => {
  return (
    <div className="flex flex-wrap gap-10 items-center mt-9 w-full text-xl leading-tight max-md:max-w-full text-black">
      {benefits.map((column, columnIndex) => (
        <ul key={columnIndex} className="list-disc pl-5 flex flex-col self-stretch my-auto w-[181px]">
          {column.map((benefit, benefitIndex) => (
            <li key={benefitIndex} className={benefitIndex > 0 ? "mt-4" : ""}>
              {benefit}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default BenefitsList;
