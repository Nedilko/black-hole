import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';

const CellsCounter = () => {
  const [{ remainingCellsCount, totalCellsCount }] = useGameStore();

  return (
    <>
      <span className="flex w-5 h-5 border-2 border-gray-400/80 mr-2 rounded-full" />
      {`${remainingCellsCount} / ${totalCellsCount}`}
      <span className="flex w-5 h-5 border-2 border-gray-400/80 ml-2" />
    </>
  );
};

export default React.memo(CellsCounter);
