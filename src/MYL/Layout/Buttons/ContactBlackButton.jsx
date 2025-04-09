import React from "react";
import { Link } from "react-router-dom";

const ContactButton = () => {
  return (
    <div>
  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
    <button className="self-stretch px-8 py-3 text-base lg:text-lg my-auto rounded-xl text-white bg-gradient-to-r from-[#616363] to-[#1e1e1e]">
      Book A Meeting
    </button>
  </Link>
</div>

  );
};

export default ContactButton;
