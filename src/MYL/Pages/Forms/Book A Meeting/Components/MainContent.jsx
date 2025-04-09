import React from 'react';
import BenefitsList from '../Components/BenifitList';

const MainContent = () => {
  return (
    <div className="flex flex-col justify-start items-start min-w-[240px] w-[734px] max-md:max-w-full text-black">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h1 className="font-jakarta text-5xl font-semibold leading-[56px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
          Avoid making these mistakes with your fashion brand
        </h1>

     
        <ul className="list-disc pl-5 mt-9 max-w-full text-xl leading-tight w-[646px]">
          <li className="max-md:max-w-full">
            Ordering too much inventory when you're just starting out
          </li>
          <li className="mt-4 max-md:max-w-full">
            High manufacturing costs that eat away at your profits
          </li>
          <li className="mt-4 max-md:max-w-full">
            Inferior quality clothing that cost you customers
          </li>
          <li className="mt-4 leading-8 max-md:max-w-full">
            Supply chain and order fulfillment problems that frustrate your customers
          </li>
        </ul>
      </div>

  
      <div className="flex flex-col mt-9 w-full max-md:max-w-full">
        <h2 className="font-jakarta text-5xl font-semibold leading-none max-md:max-w-full max-md:text-4xl">
          Your benefits
        </h2>

        <BenefitsList />
      </div>
    </div>
  );
};

export default MainContent;
