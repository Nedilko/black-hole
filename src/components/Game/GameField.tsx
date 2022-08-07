import Cell from './Cell';
import type { IBoardSize } from '../../game/field';
import { useGameBoard } from '../../hooks/useGameBoard';
import { getSize } from '../../game/helpers';
import { useEffect } from 'react';

type PropsType = {
  size: IBoardSize;
  holesCount: number;
  onFinish: () => void;
};

const GameField = ({ size, holesCount, onFinish }: PropsType) => {
  const { board, openedIndexesCount, isFinished } = useGameBoard(
    size,
    holesCount
  );
  const { width, height } = size;

  useEffect(() => {
    if (isFinished) {
      onFinish();
    }
  }, [isFinished, onFinish]);

  return (
    <div className="flex flex-col">
      <div className="flex text-white hover:underline">
        {getSize(size) - openedIndexesCount}
      </div>
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: getSize(size) }, (_, i) => {
            const { isHole, holesNearCount, isOpen, handleOpen } =
              board.cells[i];
            return (
              <Cell
                key={i}
                isOpen={isOpen}
                isHole={isHole}
                holesNearCount={holesNearCount}
                handleOpen={handleOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameField;
