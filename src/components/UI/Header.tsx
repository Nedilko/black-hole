import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';

type PropsType = {
  cellsCount: number;
  openedCellsCount: number;
  timer: string;
};

const Header = ({ cellsCount, openedCellsCount, timer }: PropsType) => {
  return (
    <div className="flex justify-between w-full items-center text-5xl text-gray-300/80 uppercase text-shadow">
      <div className="py-21 flex text-lg items-center">
        <span className="flex w-5 h-5 border-2 border-gray-400/80 mr-2 rounded-full" />
        {`${openedCellsCount} / ${cellsCount}`}
        <span className="flex w-5 h-5 border-2 border-gray-400/80 ml-2" />
      </div>
      <div className="flex">find black holes</div>
      <div className="flex text-lg items-center">
        {timer}
        <MdOutlineTimer className="ml-2" />
      </div>
    </div>
  );
};

export default React.memo(Header);
