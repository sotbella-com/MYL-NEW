import React from 'react';
import SortSection from '../Components/SortSection';
import FilterSection from '../Components/FilterSection';
import PriceFilter from '../Components/PriceFilter';

function FilterAndSort({ closeDrawer }) {
  
  return (
    <div className="flex overflow-y-auto scrollbar-hide mih-h-0 flex-col p-8 tracking-tight leading-tight bg-white max-w-[398px] h-[80vh]">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium text-black">Filter & Sort</h2>
          <SortSection />
        </div>
        <div className="flex flex-col self-start text-sm font-medium text-gray-600">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/2a52589d2bffcd0acf4487766659858212fe02e4f819a69d585750d4cb71bd9a?apiKey=c3781a61f99f45d9979de044d3603935&"
            className="object-contain self-end w-6 aspect-square cursor-pointer"
            alt="Close"
            onClick={closeDrawer}  // Close drawer on click
          />
          <button className="mt-10">Clear all</button>
        </div>
      </div>
      <hr className="shrink-0 mt-4 h-px border border-solid border-neutral-200" />
      <FilterSection
        title="Color"
        options={[
          { label: 'Black', value: 'black' },
          { label: 'Brown', value: 'brown' },
          { label: 'Blue', value: 'blue' },
          { label: 'Gold', value: 'gold' },
          { label: 'Blush', value: 'blush' },
          { label: 'Grey', value: 'grey' },
        ]}
      />
      <hr className="shrink-0 mt-3 h-px border border-solid border-neutral-200" />
      <FilterSection
        title="Category"
        options={[
          { label: 'All', value: 'all' },
          { label: 'Co-rd Set', value: 'co-rd-set' },
          { label: 'Maxi Dress', value: 'maxi-dress' },
          { label: 'Party Wear', value: 'party-wear' },
          { label: 'Short Sassy', value: 'short-sassy' },
          { label: 'Slit Dress', value: 'slit-dress' },
          { label: 'Dress', value: 'dress' },
          { label: 'Bodycon Dress', value: 'bodycon-dress' },
          { label: 'Black Dress', value: 'black-dress' },
        ]}
      />
      <hr className="shrink-0 mt-3 h-px border border-solid border-neutral-200" />
      <FilterSection
        title="Material"
        options={[
          { label: 'All', value: 'all' },
          { label: 'Cotton', value: 'cotton' },
          { label: 'Chiffon', value: 'chiffon' },
          { label: 'Linen', value: 'linen' },
          { label: 'Polyester', value: 'polyester' },
          { label: 'Leather', value: 'leather' },
          { label: 'Silk', value: 'silk' },
          { label: 'Wool', value: 'wool' },
          { label: 'Satin', value: 'satin' },
        ]}
      />
      <hr className="shrink-0 mt-3 h-px border border-solid border-neutral-200" />
      <PriceFilter />
    </div>
  );
}

export default FilterAndSort;
