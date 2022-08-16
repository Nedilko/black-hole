import React, { MouseEventHandler } from 'react';

type PropsType = {
  index: number;
  isOpen: boolean;
  isHole: boolean;
  isMarked: boolean;
  holesNearCount: number;
  handleOpen: (index: number) => void;
  handleMarkCell: (index: number) => void;
};

const Cell = ({
  index,
  handleOpen,
  handleMarkCell,
  holesNearCount,
  isHole,
  isOpen,
  isMarked,
}: PropsType) => {
  const handleLeftClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleOpen(index);
  };

  const handleRightClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    handleMarkCell(index);
  };

  const isZeroHolesNear = holesNearCount === 0;

  const cellValue = isHole ? '' : isZeroHolesNear ? '' : holesNearCount;

  let value = isOpen ? cellValue : '';

  const cellClassName = isOpen
    ? isHole
      ? 'rounded-full border-2 border-red-800 bg-black cursor-default'
      : isZeroHolesNear
      ? 'border-2 rounded-md border-gray-700 bg-gray-700/10 cursor-default'
      : 'rounded-full border-2 border-gray-300 cursor-default'
    : isMarked
    ? 'rounded-md border-2 border-cyan-600/90 bg-gradient-radial hover:bg-blue-900/30 hover:from-blue-900/30 from-black/70 via-black/10 to-black/10'
    : 'rounded-md border-2 border-gray-400 bg-gradient-radial hover:bg-blue-900/30 hover:from-blue-900/30 from-black/70 via-black/10 to-black/10';

  return (
    <button
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      className={`text-gray-300 text-2xl font-medium w-10 h-10 opacity-90 transition ease-in-out duration-150 ${cellClassName}`}
    >
      {value}
    </button>
  );
};

export default React.memo(Cell);
