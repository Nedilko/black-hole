import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CellsCounter from './CellsCounter';
import Timer from './Timer';

const Header = () => {
  const { showTime, showCounter } = useSelector(
    (state: RootState) => state.game
  );
  return (
    <div className="flex flex-col justify-center w-full items-center text-5xl text-gray-300/80 uppercase text-shadow">
      <div className="flex text-center">find black holes</div>
      <div className="flex justify-between sm:absolute w-full px-4 mt-2 sm:mt-0">
        <div className="py-21 flex text-lg items-center">
          {showCounter && <CellsCounter />}
        </div>
        <div className="flex text-lg items-center">{showTime && <Timer />}</div>
      </div>
    </div>
  );
};

export default React.memo(Header);
