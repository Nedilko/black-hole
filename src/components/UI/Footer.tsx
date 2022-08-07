import React from 'react';

const Footer = () => {
  return (
    <div className="flex w-full text-3xl text-gray-300/80 uppercase justify-center border-t-2 pt-4 border-gray-400/50">
      <a
        className="hover:cursor-pointer hover:text-shadow hover:text-gray-300 transition-all duration-150"
        href="mailto:alexandr.nedilko@gmail.com"
      >
        contact me
      </a>
    </div>
  );
};

export default React.memo(Footer);
