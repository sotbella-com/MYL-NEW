import React, { useEffect, useState } from "react";
import FilterAndSort from "./FilterAndSort"

const FilterSortDrawer = ({ applyFilters, categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ✅ Prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"; // Stop scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    // ✅ Cleanup function (restores scrolling when component unmounts)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="relative ">
      {/* Open Drawer Button */}
      <div className="w-[90vw] flex justify-between">
        <button className="flex gap-1 items-center text-base font-medium text-gray-600" onClick={toggleDrawer}>
          <span>Filter & Sort</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/11255c1efea28d678c188cecf57df31d01ffec2f665b257ad9d77c3f2cad0c95?"
            className="w-4"
            alt="Filter Icon"
          />
        </button>
        {/* <div
          className="flex gap-3 items-center self-stretch my-auto"
          role="group"
          aria-label="View controls"
        >
          <button
            className="flex shrink-0 self-stretch my-auto border border-gray-600 border-solid h-[21px] w-[19px]"
            aria-label="Single column view"
          />
          <button
            className="flex gap-0.5 items-center self-stretch my-auto"
            aria-label="Two column view"
          >
            <div className="flex shrink-0 self-stretch my-auto w-1.5 border border-gray-600 border-solid h-[21px]" />
            <div className="flex shrink-0 self-stretch my-auto w-1.5 border border-gray-600 border-solid h-[21px]" />
          </button>
          <button
            className="flex flex-wrap gap-px items-start self-stretch my-auto w-[19px]"
            aria-label="Grid view"
          >
            <div className="flex grow shrink h-2.5 border border-gray-600 border-solid w-[7px]" />
            <div className="flex grow shrink h-2.5 border border-gray-600 border-solid w-[7px]" />
            <div className="flex grow shrink h-2.5 border border-gray-600 border-solid w-[7px]" />
            <div className="flex grow shrink h-2.5 border border-gray-600 border-solid w-[7px]" />
          </button>
        </div> */}
      </div>

      {/* Drawer Container */}
      <div className={`fixed top-0 left-0 z-50 w-full md:w-[476px] h-full md:h-[85vh] bg-white transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* ✅ Pass applyFilters and categories to FilterAndSort */}
        <FilterAndSort closeDrawer={toggleDrawer} applyFilters={applyFilters} categories={categories} />
      </div>

      {/* ✅ Clicking outside the drawer closes it */}
      {isDrawerOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={toggleDrawer} />}
    </div>
  );
};

export default FilterSortDrawer;
