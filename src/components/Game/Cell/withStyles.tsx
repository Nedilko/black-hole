import { FC } from 'react';
import type { CellPropsType, WithStylesProps } from './index';

export type CellType = 'regular' | 'empty' | 'hole';

const CELL_STYLES = {
  HOLE: 'rounded-full border-2 border-red-800 bg-black cursor-default',
  EMPTY: 'border-2 rounded-md border-gray-700 bg-gray-700/10 cursor-default',
  REGULAR: 'rounded-full border-2 border-gray-300 cursor-default',
};

const withStyles = <T extends CellPropsType = CellPropsType>(
  WrappedCell: FC<T>
) => {
  const StyledCell = (props: Omit<T, keyof WithStylesProps>) => {
    const { holesNearCount, isHole, isOpen, isMarked } = props;

    let cellStyle = isHole
      ? CELL_STYLES.HOLE
      : holesNearCount === 0
      ? CELL_STYLES.EMPTY
      : CELL_STYLES.REGULAR;

    const markedStyle = isMarked ? 'border-cyan-600/90' : 'border-gray-400';
    if (!isOpen) {
      cellStyle = `rounded-md border-2 ${markedStyle} bg-gradient-radial hover:bg-blue-900/30 hover:from-blue-900/30 from-black/70 via-black/10 to-black/10"`;
    }
    return <WrappedCell {...(props as T)} cellStyle={cellStyle} />;
  };

  StyledCell.displayName = `StyledCell`;
  return StyledCell;
};

export default withStyles;
