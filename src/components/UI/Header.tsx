import React from 'react';
import CellsCounter from './CellsCounter';
import Timer from './Timer';

const Header = () => {
  return (
    <div className="flex justify-center w-full items-center text-5xl text-gray-300/80 uppercase text-shadow">
      <div className="flex">find black holes</div>
      <div className="flex justify-between absolute w-full px-4">
        <div className="py-21 flex text-lg items-center">
          <CellsCounter />
        </div>
        <div className="flex text-lg items-center">
          <Timer />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
