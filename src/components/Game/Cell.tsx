import React from 'react';
import type { IGameCell } from '../../game/field';

const Cell = ({ handleOpen, holesNearCount, isHole, isOpen }: IGameCell) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.type === 'click') {
      handleOpen();
    } else if (e.type === 'contextmenu') {
    }
  };

  const isZeroHolesNear = holesNearCount === 0;

  const cellValue = isHole ? '💥' : isZeroHolesNear ? '' : holesNearCount;

  let value = isOpen ? cellValue : '';

  const cellClassName = isOpen
    ? isHole
      ? 'rounded-full border border-red-500'
      : isZeroHolesNear
      ? 'border-2 rounded-md'
      : 'rounded-full border border-gray-500'
    : 'rounded-md bg-gray-200';

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`w-12 h-12 ${cellClassName}`}
    >
      {value}
    </button>
  );
};

export default React.memo(Cell);
