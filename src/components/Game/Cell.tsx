import React from 'react';
import { useCallback, useState } from 'react';

type PropsType = {
  index: number;
  // onClick: (index: number) => void;
};

const Cell = ({ index }: PropsType) => {
  const [isMarkedMine, setIsMarkedMine] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        isOpen ? 'bg-blue-200' : isMarkedMine ? 'bg-red-200' : 'bg-gray-200'
      }`}
    ></button>
  );
};

export default React.memo(Cell);
