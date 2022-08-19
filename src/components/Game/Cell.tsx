import React, { MouseEventHandler } from 'react';
import withInterctivity, { WithInteractivityProps } from './withIntercativity';
import withStyles from './withStyles';

interface PropsType extends WithInteractivityProps {
  index: number;
  isOpen: boolean;
  isHole: boolean;
  isMarked: boolean;
  holesNearCount: number;
  cellStyle?: string;
}

const Cell = ({
  index,
  handleOpen,
  handleMarkCell,
  holesNearCount,
  isHole,
  isOpen,
  cellStyle = '',
}: PropsType) => {
  const handleLeftClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleOpen(index);
  };

  const handleRightClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    handleMarkCell(index);
  };

  const canShowValue = holesNearCount !== 0 && !isHole;
  const displayValue = isOpen ? holesNearCount : '';

  return (
    <button
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      className={`text-gray-300 text-2xl font-medium w-10 h-10 opacity-90 transition ease-in-out duration-150 ${cellStyle}`}
    >
      {canShowValue && displayValue}
    </button>
  );
};

export default React.memo(withInterctivity(withStyles(Cell)));
