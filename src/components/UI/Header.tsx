import React from 'react';
import CellsCounter from './CellsCounter';
import Timer from './Timer';

const Header = () => {
  return (
    <div className="flex justify-between w-full items-center text-5xl text-gray-300/80 uppercase text-shadow">
      <div className="py-21 flex text-lg items-center">
        <CellsCounter />
      </div>
      <div className="flex">find black holes</div>
      <div className="flex text-lg items-center">
        <Timer />
      </div>
    </div>
  );
};

export default React.memo(Header);
