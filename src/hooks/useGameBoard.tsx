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
          setRemainingCellsCount(board.remainingCellsCount);
          onOpenCell();
        },
        onFinish
      ),
    [holesCount, size]
  );

  const [remainingCellsCount, setRemainingCellsCount] = useState(
    board.remainingCellsCount
  );

  useEffect(() => {
    setRemainingCellsCount(board.remainingCellsCount);
  }, [board.remainingCellsCount]);

  return [board, remainingCellsCount];
};
