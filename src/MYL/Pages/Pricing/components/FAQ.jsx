import React, { useState } from 'react';
import FAQItems from '../../FAQ/Components/FAQItem';
import { faqItems } from '../../../Data/FAQ/FAQData';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? faqItems : faqItems.slice(0, 3);

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <div id="faq" className="flex flex-col justify-center bg-white shadow-[0px_4px_200px_rgba(232,249,247,0.2)]">
      <div className="flex flex-col w-[90vw] mx-auto my-20">
        {/* Header Section */}
        <div className="flex flex-col text-base leading-tight text-black whitespace-nowrap">
          <div className="border-2 border-black border-solid"></div>
          <div className="flex flex-wrap gap-10 justify-between items-center mt-4">
            {/* <div className="text-xl font-medium">FAQ's</div> */}
            {/* <div className="text-xl font-medium">08</div> */}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col mt-10">
          <h2 className="font-jakarta text-3xl md:text-6xl font-semibold leading-tight text-center text-black">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col self-center gap-5 mt-10 w-[80%]">
            {visibleItems.map((item, index) => (
              <FAQItems
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={index === openIndex}
                toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}

            {/* View More / View Less Button */}
            <div className="flex flex-col justify-center mt-4">
              <button
                className="flex gap-2.5 justify-center items-center self-center px-10 py-3 mt-10 text-base leading-tight rounded-xl border-2 border-solid border-zinc-400 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300"
                onClick={handleToggleView}
              >
                <span>{showAll ? 'View Less' : 'View More'} →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
