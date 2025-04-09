import React from 'react';
import PhotographyHero from '../../Photography/Components/PhotographyHero';
import PhotographyAbout from '../../Photography/Components/PhotographyAbout';
import PhotographyWork from '../../Photography/Components/PhotographyWork';
import PhotographyServices from '../../Photography/Components/PhotographyServices';
import PhotographyProcess from '../../Photography/Components/PhotographyProcess';
import PhotographyFAQ from '../../Photography/Components/PhotographyFAQ';

function Photography() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <PhotographyHero />
      <PhotographyAbout />
      {/* <PhotographyWork /> */}
      <PhotographyServices />
      <PhotographyProcess />
      <PhotographyFAQ />
    </div>
  );
}

export default Photography;