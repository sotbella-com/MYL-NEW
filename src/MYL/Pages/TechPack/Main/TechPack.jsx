import React from 'react';
import TechHero from '../../TechPack/Components/TechHero';
import TechAbout from '../../TechPack/Components/TechAbout';
import TechServices from '../../TechPack/Components/TechServices';
import TechProcess from '../../TechPack/Components/TechProcess';
import TechFAQ from '../../TechPack/Components/TechFAQ';

function TechPack() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <TechHero />
      <TechAbout />
      <TechServices/>
      <TechProcess />
      <TechFAQ/>
    </div>
  );
}

export default TechPack;