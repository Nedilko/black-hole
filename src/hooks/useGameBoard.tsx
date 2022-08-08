import { useEffect, useMemo, useState } from 'react';
import { GameBoard, IBoardWithCells, IBoardSize } from '../game/board';

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
          setOpenedCellCount(board.remainingCellsCount);
          onOpenCell();
        },
        onFinish
      ),
    [holesCount, size]
  );

  const [openedCellCount, setOpenedCellCount] = useState(0);

  useEffect(() => {
    setOpenedCellCount(board.remainingCellsCount);
  }, [board.remainingCellsCount]);

  return [board, openedCellCount];
};
