import React from 'react';
import MainContent from '../Components/MainContent';
import ContactForm from '../Components/ContactForm';

const BookAMeetingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white my-10 w-full px-4 md:px-6">
      <div className="w-full max-w-[90vw] lg:max-w-[80vw]">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center lg:items-start lg:justify-between w-full">
          <MainContent />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default BookAMeetingPage;
