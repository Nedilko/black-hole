import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getSurroundingIndexes,
  getPosition,
  GameBoard,
  getHolesIndexes,
} from '../../game/field';
import Cell from './Cell';
import type { IBoardSize, IBoardWithCells, IGameCell } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const boardCellOpenHandler = (index: number) => {
    console.log(`Cell ${index} was clicked`);
    // setOpenedIndexes((old) => {
    //   const newIndexes = [...old, index];
    //   return newIndexes;
    // });

    // setOpenedIndexes(board.openedCellIndexes);
    setOpenedIndexes((old) => [...old, index]);
  };

  const boardCells: IGameCell[] = useMemo(
    () =>
      GameBoard.createBoard(
        { width, height },
        7,
        getHolesIndexes({ width, height }, 7),
        boardCellOpenHandler
      ).cells,
    [width, height]
  );
  // const [cells, setCells] = useState(board.cells);

  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]);

  const openedCells: number[] = [];

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

  // const handleOpen = useCallback((index: number) => {
  //   if (cells[index].isHole) {
  //     // handleOpenAllHoles();
  //     return;
  //   }

  //   const surrounding = getSurroundingIndexes(
  //     getPosition(index, { width, height }),
  //     { width, height }
  //   );

  //   openedCells.push(index);

  //   setCells((current) => {
  //     current[index].isOpen = true;
  //     return [...current];
  //   });

  //   if (cells[index].holesNearCount === 0) {
  //     surrounding.forEach((i) => {
  //       if (!openedCells.includes(i)) {
  //         handleOpen(i);
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div>
      <div className="flex">{openedIndexes.join(', ')}</div>
      <div className="flex flex-col">
        {/* <button onClick={handleOpenAllCells}>open all</button>
      <button onClick={handleOpenAllHoles}>open all holes</button> */}
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: width * height }, (_, i) => {
            // return (
            //   <Cell
            //     key={i}
            //     index={i}
            //     isHole={cells[i].isHole}
            //     holesNearCount={cells[i].holesNearCount}
            //     isOpen={cells[i].isOpen}
            //     onOpen={handleOpen}
            //   />
            // );
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
