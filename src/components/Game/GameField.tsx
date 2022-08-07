import Cell from './Cell';
import type { IBoardSize } from '../../game/field';
import { useGameBoard } from '../../hooks/useGameBoard';
import { getSize } from '../../game/helpers';

type PropsType = {
  size: IBoardSize;
  holesCount: number;
};

const GameField = ({ size, holesCount }: PropsType) => {
  const { board, openedIndexesCount } = useGameBoard(size, holesCount);
  const { width, height } = size;

  return (
    <div className="flex flex-col">
      <div className="flex text-white">
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
