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

  const isZeroHolesNear = holesNearCount === 0;

  const cellValue = isOpen
    ? isHole
      ? '💥'
      : isZeroHolesNear
      ? ''
      : holesNearCount
    : '';

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
      {cellValue}
    </button>
  );
};;;;

export default React.memo(Cell);
