import { useEffect, useMemo, useState } from 'react';
import { GameBoard, IBoardWithCells, IBoardSize } from '../game/field';

export const useGameBoard = (
  size: IBoardSize,
  holesCount: number,
  onFinish: () => void,
  onOpenCell: () => void
): [IBoardWithCells, number] => {
  const board: IBoardWithCells = useMemo(
    () =>
      GameBoard.create(
        size,
        holesCount,
        () => {
          setOpenedCellCount(board.openedCellCount);
          onOpenCell();
        },
        onFinish
      ),
    [holesCount, size]
  );

  const [openedCellCount, setOpenedCellCount] = useState(0);

  useEffect(() => {
    setOpenedCellCount(board.openedCellCount);
  }, [board.openedCellCount]);

  return [board, openedCellCount];
};
