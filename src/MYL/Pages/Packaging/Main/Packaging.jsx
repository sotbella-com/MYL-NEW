import React from 'react';
import PackagingHero from '../../Packaging/Components/PackagingHero';
import PackagingAbout from '../../Packaging/Components/PackagingAbout';
import PackagingWork from '../../Packaging/Components/PackagingWork';
import PackagingServices from '../../Packaging/Components/PackagingServices';
import PackagingProcess from '../../Packaging/Components/PackagingProcess';
import PackagingFAQ from '../../Packaging/Components/PackagingFAQ';

function Packaging() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <PackagingHero />
      <PackagingAbout />
      {/* <PackagingWork /> */}
      <PackagingServices />
      <PackagingProcess />
      <PackagingFAQ />
    </div>
  );
}

export default Packaging;