import React from 'react';

type PropsType = {
  index: number;
  // onClick: (index: number) => void;
  isHole: boolean;
  holesNearCount: number;
  isOpen: boolean;
  onOpen: (index: number, isMark: boolean) => void;
};

const Cell = ({ index, isHole, holesNearCount, isOpen, onOpen }: PropsType) => {
  // const [isOpenCell, setIsOpenCell] = useState(isOpen);
  // const isRounded = isMine && isOpenCell;

  // const handleClick = useCallback(
  //   (e: any) => {
  //     e.preventDefault();
  //     console.log(`Cell ${index} clicked`);
  //     if (e.type === 'click') {
  //       setIsOpenCell(true);
  //     } else if (e.type === 'contextmenu') {
  //     }
  //   },
  //   [index]
  // );

  const handleClick = (e: any) => {
    e.preventDefault();
    onOpen(index, e.type === 'contextmenu');
  };

  const cellValue = isOpen ? (isHole ? '💥' : holesNearCount) : '';

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`w-12 h-12 ${isHole ? 'border hover:border-red-300' : ''} ${
        isOpen
          ? holesNearCount === 0
            ? 'rounded-md bg-gray-100'
            : 'rounded-full border-2'
          : 'bg-gray-200 hover:bg-gray-300 rounded-md'
      }`}
    >
      {cellValue}
    </button>
  );
};

export default React.memo(Cell);
