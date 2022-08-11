import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CellsCounter = () => {
  const { remainingCellsCount, totalCellsCount } = useSelector(
    (state: RootState) => state.game
  );

  return (
    <>
      <span className="flex w-5 h-5 border-2 border-gray-400/80 mr-2 rounded-full" />
      {`${remainingCellsCount} / ${totalCellsCount}`}
      <span className="flex w-5 h-5 border-2 border-gray-400/80 ml-2" />
    </>
  );
};

export default React.memo(CellsCounter);
