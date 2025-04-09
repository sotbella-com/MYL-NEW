import React from 'react';

const ImageWithCaption = ({ src, alt, caption }) => {
  return (
    <figure className="mt-11 max-md:mt-10 max-md:max-w-full">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="object-contain w-full aspect-[1.91] max-w-[1035px] max-md:max-w-full"
      />
      <figcaption className="mt-5 ml-2.5 text-3xl font-bold leading-tight text-black">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageWithCaption;