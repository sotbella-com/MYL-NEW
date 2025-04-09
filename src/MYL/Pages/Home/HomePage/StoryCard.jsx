import React from "react";

function StoryCard({ title, imageUrl, url }) {
  return (
    <div className="flex flex-col w-full max-w-[423px] min-h-[500px]">
      {/* Image Wrapper */}
      <div className="flex shrink max-w-full bg-zinc-300 h-[452px] w-full">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <div className="text-lg tracking-tighter text-white mt-6">
        {title}
      </div>

      {/* Learn More Button (Redirects to URL) */}
      <p className="mt-3 font-semibold">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-base md:text-lg text-white border-white border-b pb-1 hover:opacity-80 transition-opacity"
        >
          Learn More →
        </a>
      </p>
    </div>
  );
}

export default StoryCard;
