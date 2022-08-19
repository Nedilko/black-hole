import React, { MouseEventHandler } from 'react';
import withInterctivity from './withIntercativity';
import withStyles from './withStyles';

export interface WithInteractivityProps {
  handleOpen: (index: number) => void;
  handleMarkCell: (index: number) => void;
}

export interface WithStylesProps {
  cellStyle?: string;
}

export interface CellPropsType extends WithInteractivityProps, WithStylesProps {
  isOpen: boolean;
  isHole: boolean;
  isMarked: boolean;
  holesNearCount: number;
  index: number;
}

const Cell = ({
  index,
  handleOpen,
  handleMarkCell,
  holesNearCount,
  isHole,
  isOpen,
  cellStyle = '',
}: CellPropsType) => {
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
