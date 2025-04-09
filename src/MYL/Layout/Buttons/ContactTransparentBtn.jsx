import React from "react";
import { Link } from "react-router-dom";

const ContactTransparentBtn = () => {
  return (
    <div>
      <Link to='/contact'
      onClick={() => window.scrollTo(0, 0)}>
      <button className="px-4 lg:px-8 py-2 lg:py-3 lg:text-lg font-semibold text-base text-white rounded-xl border-2 border-solid border-zinc-400 hover:bg-zinc-900">
        Book a Meeting
      </button>
      </Link>
    </div>
  );
};

export default ContactTransparentBtn;
