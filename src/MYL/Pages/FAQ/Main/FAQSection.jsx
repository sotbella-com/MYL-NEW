import React, { useState } from "react";
import FAQItem from "../Components/FAQItem";
import CustomerReview from "../Components/CustomerReview";
import { faqData } from "../../../Data/FAQ/FAQData";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden my-6 md:my-10">
      <div
        className="relative flex flex-col mx-auto w-[90vw] min-h-[500px] md:min-h-[697px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/da16b0cc0fdc416ec938893547aac43ee23ec3ecd06919f46eb7f680173fc315?apiKey=c3781a61f99f45d9979de044d3603935&')",
        }}
      >
        <div className="relative z-10 flex flex-col justify-center">
          <h2 className="font-jakarta text-3xl md:text-5xl font-semibold leading-tight text-center text-black">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col self-center mt-4 md:mt-10 gap-4 w-[80%]">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleOpen(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <CustomerReview />
    </div>
  );
}

export default FAQSection;
