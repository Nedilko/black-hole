import { useMemo, useState } from 'react';
import { GameBoard, getHolesIndexes } from '../../game/field';
import Cell from './Cell';
import type { IBoardSize, IGameCell } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const boardCellOpenHandler = (index: number) => {
    console.log(`Cell ${index} was opened`);
    setOpenedIndexes((old) => [...old, index]);
  };

  const boardCells: IGameCell[] = useMemo(
    () =>
      GameBoard.create(
        { width, height },
        7,
        getHolesIndexes({ width, height }, 7),
        boardCellOpenHandler
      ).cells,
    [width, height]
  );

  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]);

  // const handleOpenAllHoles = useCallback(() => {
  //   setCells((current) => {
  //     return current.map((cell) => {
  //       const newCell = cell;
  //       if (newCell.isHole) {
  //         newCell.isOpen = true;
  //       }
  //       return newCell;
  //     });
  //   });
  // }, []);

  // const handleOpenAllCells = useCallback(() => {
  //   setCells((current) => {
  //     return current.map((cell) => ({ ...cell, isOpen: true }));
  //   });
  // }, []);

  return (
    <div>
      <div className="flex">{width * height - openedIndexes.length}</div>
      <div className="flex flex-col">
        {/* <button onClick={handleOpenAllCells}>open all</button>
      <button onClick={handleOpenAllHoles}>open all holes</button> */}
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: width * height }, (_, i) => {
            const { position, isHole, holesNearCount, isOpen, handleOpen } =
              boardCells[i];
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
