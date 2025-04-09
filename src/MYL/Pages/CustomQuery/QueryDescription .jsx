import React from "react";
import { Link } from "react-router-dom";

const QueryDescription = () => {
  return (
    <section className="flex flex-col text-black px-4 md:px-6 lg:px-0">
      <h1 className="font-jakarta text-3xl md:text-4xl lg:text-5xl font-semibold leading-[40px] md:leading-[50px] lg:leading-[56px]">
        Avoid making these mistakes with your fashion brand
      </h1>

      <ul className="list-disc pl-5 mt-6 text-base md:text-lg leading-tight">
        <li className="mt-4">Ordering too much inventory when you're just starting out</li>
        <li className="mt-4">High manufacturing costs that eat away at your profits</li>
        <li className="mt-4">Inferior quality clothing that cost you customers</li>
        <li className="mt-4">Supply chain and order fulfillment problems that frustrate your customers</li>
      </ul>

      <Link
        to="/custom-query-list"
        className="flex items-center mt-8 md:mt-10 text-lg font-medium text-black border-b border-black w-fit hover:opacity-80"
      >
        <span>View Status</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/53c6ee5b149bc06e453392c24e1ff0c43afb275cd45f8a6be9395c98ca24cce1"
          className="w-4 md:w-5 ml-2"
          alt="Status icon"
        />
      </Link>
    </section>
  );
};

export default QueryDescription;
