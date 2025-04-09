import React from 'react';
import DesignHero from '../../Design/Components/DesignHero';
import DesignAbout from '../../Design/Components/DesignAbout';
import DesignWork from '../../Design/Components/DesignWork';
import DesignServices from '../../Design/Components/DesignServices';
import DesignProcess from '../../Design/Components/DesignProcess';
import DesignFAQ from '../../Design/Components/DesignFAQ';

function Design() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <DesignHero />
      <DesignAbout />
      {/* <DesignWork /> */}
      <DesignServices />
      <DesignProcess />
      <DesignFAQ />
    </div>
  );
}

export default Design;