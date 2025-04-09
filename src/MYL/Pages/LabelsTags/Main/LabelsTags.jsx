import React from 'react';
import LabelsTagsHero from '../../LabelsTags/Components/LabelsTagsHero';
import LabelsTagsAbout from '../../LabelsTags/Components/LabelsTagsAbout';
import LabelsTagsWork from '../../LabelsTags/Components/LabelsTagsWork';
import LabelsTagsServices from '../../LabelsTags/Components/LabelsTagsServices';
import LabelsTagsProcess from '../../LabelsTags/Components/LabelsTagsProcess';
import LabelsTagsFAQ from '../../LabelsTags/Components/LabelsTagsFAQ';

function LabelsTags() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
     
      <LabelsTagsHero />
      <LabelsTagsAbout />
      {/* <LabelsTagsWork /> */}
      <LabelsTagsServices />
      <LabelsTagsProcess />
      <LabelsTagsFAQ />
    </div>
  );
}

export default LabelsTags;