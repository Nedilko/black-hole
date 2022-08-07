import { useMemo, useState } from 'react';
import { GameBoard } from '../../game/field';
import Cell from './Cell';
import type { IBoardSize, IBoardWithCells } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const boardCellOpenHandler = (index: number) => {
    console.log(`Cell ${index} was opened`);
    setOpenedIndexes((old) => [...old, index]);
  };

  const board: IBoardWithCells = useMemo(
    () => GameBoard.create({ width, height }, 7, boardCellOpenHandler),
    [width, height]
  );

  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]);
  const handleOpenAllCells = () => {
    board.handleOpenAllHoles();
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleOpenAllCells}>
        open all holes
      </div>
      <div className="flex">{width * height - openedIndexes.length}</div>
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: width * height }, (_, i) => {
            const { position, isHole, holesNearCount, isOpen, handleOpen } =
              board.cells[i];
            return (
              <Cell
                key={i}
                position={position}
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
