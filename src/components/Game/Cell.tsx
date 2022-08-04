import React from 'react';
import { useCallback, useState } from 'react';

type PropsType = {
  index: number;
  // onClick: (index: number) => void;
  isMine: boolean;
};

const Cell = ({ index, isMine }: PropsType) => {
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
        // isOpen ? 'bg-blue-200' : isMarkedMine ? 'bg-red-200' : 'bg-gray-200'
        isMarkedMine ? 'bg-red-200' : 'bg-gray-200'
      }`}
    ></button>
  );
};

export default React.memo(Cell);
