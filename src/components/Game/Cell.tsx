import React from 'react';
import { useCallback, useState } from 'react';

type PropsType = {
  index: number;
  // onClick: (index: number) => void;
  isMine: boolean;
  minesNearCount: number;
};

const Cell = ({ index, isMine, minesNearCount }: PropsType) => {
  const [isMarkedMine, setIsMarkedMine] = useState(isMine);
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(`Cell ${index} clicked`);
      if (e.type === 'click') {
        console.log('Left click');
        setIsOpen(true);
        setIsMarkedMine(false);
      } else if (e.type === 'contextmenu') {
        console.log('Right click');
        setIsMarkedMine(true);
        setIsOpen(false);
      }
    },
    [index]
  );
  return (
    <button
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`rounded-md w-12 h-12 ${
        isMarkedMine
          ? 'bg-red-200 hover:bg-red-300'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      {isMarkedMine ? '💥' : minesNearCount}
    </button>
  );
};

export default React.memo(Cell);
