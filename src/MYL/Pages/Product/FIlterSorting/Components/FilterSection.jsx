import React from 'react';

function FilterSection({ title, options }) {
  return (
    <div className="flex flex-col mt-3 max-w-full text-gray-600 w-[312px]">
      <div className="text-sm font-medium">{title}</div>
      
   
      <div className="grid grid-cols-3 gap-3 mt-3 w-full text-xs">
        {options.map((option, index) => (
          <div key={index} className="flex gap-1.5 items-center">
            <input
              type="checkbox"
              id={`${title.toLowerCase()}-${option.value}`}
              className="sr-only"
            />
            <label
              htmlFor={`${title.toLowerCase()}-${option.value}`}
              className="flex items-center cursor-pointer"
            >
              <span className="flex shrink-0 w-3 h-3 border border-solid bg-stone-50 border-neutral-200"></span>
              <span className="ml-1.5">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterSection;
