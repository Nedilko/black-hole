import React from 'react';

type PropsType = {
  index: number;
  isHole: boolean;
  holesNearCount: number;
  isOpen: boolean;
  onOpen: (index: number) => void;
};

const Cell = ({ index, isHole, holesNearCount, isOpen, onOpen }: PropsType) => {
  // const handleClick = useCallback(
  //   (e: any) => {
  //     e.preventDefault();
  //     if (e.type === 'click') {
  //       onOpen(index);
  //     } else if (e.type === 'contextmenu') {
  //     }
  //   },
  //   [index]
  // );

  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.type === 'click') {
      onOpen(index);
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
