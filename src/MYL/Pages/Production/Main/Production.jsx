import React from 'react';
import ProductionHero from '../../Production/Components/ProductionHero';
import ProductionAbout from '../../Production/Components/ProductionAbout';
import ProductionWork from '../../Production/Components/ProductionWork';
import ProductionServices from '../../Production/Components/ProductionServices';
import ProductionProcess from '../../Production/Components/ProductionProcess';
import ProductionFAQ from '../../Production/Components/ProductionFAQ';

function Production() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <ProductionHero />
      <ProductionAbout />
      {/* <ProductionWork /> */}
      <ProductionServices />
      <ProductionProcess />
      <ProductionFAQ />
    </div>
  );
}

export default Production;