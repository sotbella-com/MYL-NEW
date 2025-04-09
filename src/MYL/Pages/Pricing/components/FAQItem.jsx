import React from 'react';

function FAQItem({ question, answer, isExpanded, onClick }) {
  return (
    <div className="flex flex-col px-8 py-6 w-full bg-white rounded-lg border border-solid border-neutral-200 max-md:px-5 max-md:max-w-full mb-4">
      <div
        className="flex flex-wrap justify-between items-start w-full text-lg font-medium leading-tight text-black max-md:max-w-full cursor-pointer"
        onClick={onClick}
      >
        <div className="flex-1 shrink basis-0 max-md:max-w-full">{question}</div>
        <img
          loading="lazy"
          src={isExpanded ? "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/2e3bc9de39b8151a43ed70bbf59075d00b59ca225dfd18e6dbabd5f28da7a1bf?apiKey=c3781a61f99f45d9979de044d3603935&" : "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/9b74caf279287e42c45a8051c7e8f87aa7fabbdeed4e22197cc672c74873d6cb?apiKey=c3781a61f99f45d9979de044d3603935&"}
          className="object-contain shrink-0 w-6 aspect-square"
          alt={isExpanded ? "Collapse" : "Expand"}
        />
      </div>
      {isExpanded && (
        <div className="mt-4 text-base leading-6 text-neutral-500 max-md:max-w-full">
          {answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;