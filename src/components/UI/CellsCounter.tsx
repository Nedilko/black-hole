import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectField } from '../../store/selectors';

const CellsCounter = () => {
  const { remainingCellsCount, totalCellsCount } = useAppSelector(selectField);

  return (
    <>
      <span className="flex w-5 h-5 border-2 border-gray-400/80 mr-2 rounded-full" />
      {`${remainingCellsCount} / ${totalCellsCount}`}
    </>
  );
};

export default React.memo(CellsCounter);
