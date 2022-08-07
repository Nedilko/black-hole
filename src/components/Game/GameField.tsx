import { useCallback, useState } from 'react';
import {
  getGameCellsData,
  getSurroundingIndexes,
  getPosition,
} from '../../game/field';
import Cell from './Cell';
import type { IBoardSize } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const [cells, setCells] = useState(() =>
    getGameCellsData({ width, height }, 7)
  );

  const openedCells: number[] = [];

  const handleOpenAllHoles = useCallback(() => {
    setCells((current) => {
      return current.map((cell) => {
        const newCell = cell;
        if (newCell.isHole) {
          newCell.isOpen = true;
        }
        return newCell;
      });
    });
  }, []);

  const handleOpenAllCells = useCallback(() => {
    setCells((current) => {
      return current.map((cell) => ({ ...cell, isOpen: true }));
    });
  }, []);

  const handleOpen = useCallback((index: number) => {
    if (cells[index].isHole) {
      handleOpenAllHoles();
      return;
    }

    const surrounding = getSurroundingIndexes(
      getPosition(index, { width, height }),
      { width, height }
    );

    openedCells.push(index);

    setCells((current) => {
      current[index].isOpen = true;
      return [...current];
    });

    if (cells[index].holesNearCount === 0) {
      surrounding.forEach((i) => {
        if (!openedCells.includes(i)) {
          //TODO:  setTimeout(() => handleOpen(i), 30);
          handleOpen(i);
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <button onClick={handleOpenAllCells}>open all</button>
      <button onClick={handleOpenAllHoles}>open all holes</button>
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}>
        {Array.from({ length: width * height }, (_, i) => {
          return (
            <Cell
              key={i}
              index={i}
              isHole={cells[i].isHole}
              holesNearCount={cells[i].holesNearCount}
              isOpen={cells[i].isOpen}
              onOpen={handleOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameField;
