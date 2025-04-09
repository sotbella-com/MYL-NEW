import React from 'react';
import SourcingHero from '../../Sourcing/Components/SourcingHero';
import SourcingAbout from '../../Sourcing/Components/SourcingAbout';
import SourcingWork from '../../Sourcing/Components/SourcingWork';
import SourcingServices from '../../Sourcing/Components/SourcingServices';
import SourcingProcess from '../../Sourcing/Components/SourcingProcess';
import SourcingFAQ from '../../Sourcing/Components/SourcingFAQ';


function Sourcing() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <SourcingHero />
      <SourcingAbout />
      {/* <SourcingWork /> */}
      <SourcingServices />
      <SourcingProcess />
      <SourcingFAQ />
    </div>
  );
}

export default Sourcing;