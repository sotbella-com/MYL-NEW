import React from 'react';
import FreeConsultHero from '../../FreeConsulation/Components/FreeConsultHero';
import FreeConsultAbout from '../../FreeConsulation/Components/FreeConsultAbout';
import FreeConsultWork from '../../FreeConsulation/Components/FreeConsultWork';
import FreeConsultServices from '../../FreeConsulation/Components/FreeConsultServices';
import FreeConsultProcess from '../../FreeConsulation/Components/FreeConsultProcess';
import FreeConsultFAQ from '../../FreeConsulation/Components/FreeConsultFAQ';

function FreeConsultation() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <FreeConsultHero />
      <FreeConsultAbout />
      {/* <FreeConsultWork /> */}
      <FreeConsultServices />
      <FreeConsultProcess />
      <FreeConsultFAQ/>
    </div>
  );
}

export default FreeConsultation;