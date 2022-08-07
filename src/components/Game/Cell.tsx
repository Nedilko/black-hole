import React from 'react';

type PropsType = {
  isOpen: boolean;
  isHole: boolean;
  holesNearCount: number;
  handleOpen: () => void;
};

const Cell = ({ handleOpen, holesNearCount, isHole, isOpen }: PropsType) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.type === 'click') {
      handleOpen();
    } else if (e.type === 'contextmenu') {
    }
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
    : 'rounded-md border-2 border-gray-400 bg-gradient-radial hover:bg-blue-900/30 hover:from-blue-900/30 from-black/70 via-black/10 to-black/10';

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`text-gray-300 text-2xl font-medium w-12 h-12 opacity-90 transition ease-in-out duration-150 ${cellClassName}`}
    >
      {value}
    </button>
  );
};

export default React.memo(Cell);
