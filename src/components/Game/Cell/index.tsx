import React, { MouseEventHandler } from 'react';
import type { FieldCell } from '../../../store/fieldSlice';
import withInterctivity from './withIntercativity';
import withStyles from './withStyles';

export interface WithInteractivityProps {
  handleOpen: (index: number) => void;
  handleMarkCell: (index: number) => void;
}

export interface WithStylesProps {
  cellStyle?: string;
}

export interface CellPropsType
  extends Omit<FieldCell, 'position'>,
    WithInteractivityProps,
    WithStylesProps {}

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
      className={`h-10 w-10 text-2xl font-medium text-gray-300 opacity-90 ${cellStyle}`}
    >
      {canShowValue && displayValue}
    </button>
  );
};

export default React.memo(withInterctivity(withStyles(Cell)));
