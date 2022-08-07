import { useMemo, useState } from 'react';
import { GameBoard, IBoardWithCells, IBoardSize } from '../game/field';

export const useGameBoard = (size: IBoardSize, holesCount: number) => {
  const board: IBoardWithCells = useMemo(
    () =>
      GameBoard.create(size, holesCount, () => {
        setOpenedIndexes(board.openedCellIndexes.length);
      }),
    [holesCount, size]
  );

  const [openedIndexesCount, setOpenedIndexes] = useState(
    board.openedCellIndexes.length
  );

  return { board, openedIndexesCount };
};
