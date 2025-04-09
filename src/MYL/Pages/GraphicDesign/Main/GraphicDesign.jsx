import React from 'react';
import GraphicHero from '../../GraphicDesign/Components/GraphicHero';
import GraphicAbout from '../../GraphicDesign/Components/GraphicAbout';
import GraphicWork from '../../GraphicDesign/Components/GraphicWork';
import GraphicServices from '../../GraphicDesign/Components/GraphicServices';
import GraphicProcess from '../../GraphicDesign/Components/GraphicProcess';
import GraphicFAQ from '../../GraphicDesign/Components/GraphicFAQ';

function GraphicDesign() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <GraphicHero />
      <GraphicAbout />
      {/* <GraphicWork /> */}
      <GraphicServices />
      <GraphicProcess />
      <GraphicFAQ />
    </div>
  );
}

export default GraphicDesign;