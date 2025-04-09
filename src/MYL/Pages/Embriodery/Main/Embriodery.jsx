import React from 'react';
import EmbroideryHero from '../../Embriodery/Components/EmbroideryHero';
import EmbroideryAbout from '../../Embriodery/Components/EmbroideryAbout';
import EmbroideryWork from '../../Embriodery/Components/EmbroideryWork';
import EmbroideryServices from '../../Embriodery/Components/EmbroideryServices';
import EmbroideryProcess from '../../Embriodery/Components/EmbroideryProcess';
import EmbroideryFAQ from '../../Embriodery/Components/EmbroideryFAQ';

function Embriodery() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <EmbroideryHero />
      <EmbroideryAbout />
      {/* <EmbroideryWork /> */}
      <EmbroideryServices />
      <EmbroideryProcess />
      <EmbroideryFAQ />
    </div>
  );
}

export default Embriodery;