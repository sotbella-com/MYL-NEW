import React, { useRef, useState, useEffect } from "react";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`flex flex-col px-6 py-5 w-full bg-white rounded-lg border transition-all duration-300 ease-in-out cursor-pointer ${
        isOpen ? "border-black shadow-md" : "border-neutral-200"
      } mb-3`}
      onClick={toggleOpen} 
    >
      {/* Question Section */}
      <div className="flex justify-between items-start text-lg md:text-xl font-medium text-black w-full">
        <span className="flex-1 text-left">{question}</span>
        <img
          loading="lazy"
          src={
            isOpen
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/2e3bc9de39b8151a43ed70bbf59075d00b59ca225dfd18e6dbabd5f28da7a1bf"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/9b74caf279287e42c45a8051c7e8f87aa7fabbdeed4e22197cc672c74873d6cb"
          }
          className="object-contain w-6 md:w-7 aspect-square"
          alt={isOpen ? "Collapse" : "Expand"}
        />
      </div>

      {/* Answer Section with Smooth Transition */}
      <div
        id={`faq-answer-${question}`}
        ref={contentRef}
        style={{ maxHeight: `${height}px` }}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mt-4" : "mt-0"
        }`}
      >
        <p className="text-base md:text-lg leading-6 text-neutral-500">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
